/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type LanguageCode = "cn" | "en" | "mn";

export interface TranslationSet {
  cn: string;
  en: string;
  mn: string; // Mongolian Cyrillic
}

export type PhysicalAttribute =
  | "food"
  | "beverage"
  | "clothing"
  | "transport"
  | "animal"
  | "media"
  | "furniture"
  | "music";

export interface NounItem {
  id: string;
  char: string; // Chinese word (e.g., 米饭)
  pinyin: string; // Pinyin transcription
  attribute: PhysicalAttribute;
  classifiers: string[]; // Allowed classifier IDs (e.g., ["wan", "ge"])
  translations: TranslationSet;
}

export interface VerbItem {
  id: string;
  char: string; // Chinese word (e.g., 吃)
  pinyin: string;
  allowedAttributes: PhysicalAttribute[]; // Attribute bounds: only permits food or beverage, etc.
  translations: TranslationSet;
}

export interface ClassifierItem {
  id: string;
  char: string; // Chinese word (e.g., 碗)
  pinyin: string;
  translations: TranslationSet;
  usageHelp: TranslationSet; // Explanation of what this measure word is used for
}

// Struct to represent a completed or broken Verb + Classifier + Noun combination
export interface PhraseCombination {
  verb: VerbItem;
  classifier: ClassifierItem;
  noun: NounItem;
}

export interface PipeNode {
  id: string;
  name: string;
  // Initial broken grammar values in this pipeline section
  initialVerbId: string;
  initialClassifierId: string;
  initialNounId: string;
  
  // Target correct values
  correctVerbId: string;
  correctClassifierId: string;
  correctNounId: string;

  // Selected values, updated as user edits
  currentVerbId: string;
  currentClassifierId: string;
  currentNounId: string;

  // Node status
  status: "broken" | "repaired" | "rusted";
  attempts: number; // For determining rust status after 2 errors
  lockedDuration: number; // In seconds (specifically for PK mode sabotage)
  classifierOptions?: { id: string; char: string; pinyin: string }[];
  prototype?: string;
}

export type GameLevel = "YCT2" | "YCT3" | "YCT4" | "YCT5" | "YCT6";

export type GameState =
  | "start"
  | "instructions"
  | "preparation"
  | "playing"
  | "review" // Review of rusted pipes
  | "settlement";

export interface GameScore {
  score: number;
  rustCount: number;
  repairedCount: number;
  totalPipes: number;
  grade: "A" | "B" | "C";
}

// PK Mode Player details
export interface PKPlayerState {
  id: "player1" | "player2";
  name: string;
  score: number;
  pipes: PipeNode[];
  activeNodeId: string | null;
  rustCount: number;
  completedCount: number;
  isStunned: boolean; // Stunned/Locked for 2 seconds when other player sabotages with "rust"
  stunDurationLeft: number; // countdown
}
