import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Initialize the Google Gemini AI client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // REST API to generate matched word pairs via Gemini AI
  app.post('/api/generate-words', async (req, res: any) => {
    const { category, customTopic, difficulty } = req.body;

    if (!ai) {
      return res.status(500).json({ 
        error: "Gemini API client is not initialized. Please configure your GEMINI_API_KEY inside the Settings > Secrets panel." 
      });
    }

    const topicName = customTopic || category || "Daily Life";
    const diffWord = difficulty || "Medium";

    const systemInstruction = `You are an educational English vocabulary expert. 
Generate a list of exactly 8 core vocabulary words related to the theme/topic provided by the user.
The difficulty of vocabulary words should target: ${diffWord} level.
Each item must contain:
1. "word": The English word (clear, correct capitalization, e.g. "Ethereal", "Pristine", "Catastrophe").
2. "definition": The concise and clear Chinese translation/meaning of the word.
3. "sentence": A highly contextual, simple example sentence in English showing how to use the word.
4. "sentence_cn": An accurate, natural Chinese translation of the example sentence.

Ensure you provide exactly 8 unique, high-quality, and spelling-accurate pairs.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Generate 8 vocabulary words of ${diffWord} difficulty for the topic: "${topicName}"`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            description: "List of exactly 8 vocabulary items",
            items: {
              type: Type.OBJECT,
              properties: {
                word: { type: Type.STRING, description: "The English word." },
                definition: { type: Type.STRING, description: "The Chinese translation." },
                sentence: { type: Type.STRING, description: "The context-rich simple English sentence." },
                sentence_cn: { type: Type.STRING, description: "The Chinese translation of the example sentence." }
              },
              required: ["word", "definition", "sentence", "sentence_cn"]
            }
          }
        }
      });

      const text = response.text?.trim() || "[]";
      const words = JSON.parse(text);

      if (!Array.isArray(words) || words.length === 0) {
        throw new Error("Invalid format returned by the AI. Please try again.");
      }

      return res.json({ success: true, words });
    } catch (error: any) {
      console.error("Gemini Words Generation Error:", error);
      return res.status(500).json({ 
        error: error.message || "Failed to generate words. Let's try again." 
      });
    }
  });

  // Dev vs Prod file serving configuration
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = 3000;
  const projectRootDir = process.cwd(); // Standard CJS/ESM safe path resolver

  if (!isProd) {
    // In development dynamically import Vite dev server as middleware helper
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve the built assets from "dist"
    app.use(express.static(path.join(projectRootDir, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(projectRootDir, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Word Match] Server running in ${isProd ? 'production' : 'development'} mode on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
