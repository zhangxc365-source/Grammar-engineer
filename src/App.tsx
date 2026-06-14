/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { LanguageCode, GameLevel, GameState, PipeNode } from "./types";
import { generatePipeTasks, UI_TEXTS } from "./data";

// Component imports
import { LanguageSelector } from "./components/LanguageSelector";
import { StartScreen } from "./components/StartScreen";
import { InstructionScreen } from "./components/InstructionScreen";
import { PreparationScreen } from "./components/PreparationScreen";
import { GameHeader } from "./components/GameHeader";
import { PipelineCanvas } from "./components/PipelineCanvas";
import { RepairModal } from "./components/RepairModal";
import { ReviewModal } from "./components/ReviewModal";
import { PKMode } from "./components/PKMode";
import { SettlementScreen } from "./components/SettlementScreen";
import { PauseModal } from "./components/PauseModal";

import { Wrench, Gauge, Flame, Sparkles, HelpCircle, Home } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  // Global Language selection
  const [language, setLanguage] = useState<LanguageCode>("en");

  // State Machine control
  const [gameState, setGameState] = useState<GameState>("start");
  const [level, setLevel] = useState<GameLevel>("YCT2");
  const [pkLevel, setPkLevel] = useState<GameLevel>("YCT2");
  const [pkModeActive, setPkModeActive] = useState<boolean>(false);
  const [showPauseModal, setShowPauseModal] = useState<boolean>(false);

  // Active game play data
  const [pipes, setPipes] = useState<PipeNode[]>([]);
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null);

  // Scores
  const [score, setScore] = useState<number>(0);
  const [rustCount, setRustCount] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(180);

  // Countdown timer for Single Player mode
  useEffect(() => {
    if (gameState !== "playing" || showPauseModal) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          // When time runs out, send user to settlement directly
          setGameState("settlement");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [gameState, showPauseModal]);

  // Helpers to resolve UI matches
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  // Level Selection triggers
  const handleSelectLevel = (selectedLevel: GameLevel) => {
    setLevel(selectedLevel);
    const generatedTasks = generatePipeTasks(selectedLevel);
    setPipes(generatedTasks);
    setScore(0);
    setRustCount(0);
    setTimeLeft(180);
    setActiveNodeId(null);
    setGameState("preparation");
  };

  // Launch PK Mode
  const handleSelectPKMode = (selectedLevel: GameLevel) => {
    setPkLevel(selectedLevel);
    setPkModeActive(true);
  };

  // Back to start screen resets
  const handleBackToHome = () => {
    setPkModeActive(false);
    setGameState("start");
  };

  // Standard repair completion handler inside welding popup
  const handleSaveRepair = (
    nodeId: string,
    verbId: string,
    classifierId: string,
    nounId: string,
    isCorrect: boolean,
    scoreDelta: number
  ) => {
    // 1. Update the pipeline properties
    const updatedPipes = pipes.map((p) => {
      if (p.id === nodeId) {
        return {
          ...p,
          currentVerbId: verbId,
          currentClassifierId: classifierId,
          status: isCorrect ? ("repaired" as const) : ("rusted" as const),
          attempts: p.attempts + (isCorrect ? 0 : 1)
        };
      }
      return p;
    });

    setPipes(updatedPipes);
    setScore((prev) => prev + scoreDelta);
    
    if (!isCorrect) {
      setRustCount((prev) => prev + 1);
    }

    // 2. Clear focus zoom
    setActiveNodeId(null);

    // 3. Evaluate if standard phase is completed
    const hasBrokenLeft = updatedPipes.some((p) => p.status === "broken");

    if (!hasBrokenLeft) {
      // Transition directly to settlement as requested (no separate review popup modes/states)
      setTimeout(() => {
        setGameState("settlement");
      }, 800);
    }
  };

  // Review mode completions handler
  const handleFinishReview = (
    repairedNodes: Record<string, { verb: string; classifier: string }>
  ) => {
    // Update all previous rusted nodes to corrected/repaired state with 100% correct values
    const finalRectifiedPipes = pipes.map((p) => {
      if (p.status === "rusted" && repairedNodes[p.id]) {
        return {
          ...p,
          currentVerbId: repairedNodes[p.id].verb,
          currentClassifierId: repairedNodes[p.id].classifier,
          status: "repaired" as const // unlocked!
        };
      }
      return p;
    });

    setPipes(finalRectifiedPipes);
    // Grant tiny educational score correction (+5 for each review fix!)
    const correctedCount = Object.keys(repairedNodes).length;
    setScore((prev) => prev + correctedCount * 5);

    // Shifting to scoreboard report
    setGameState("settlement");
  };

  // Completed standard pipes count
  const completedTasksCount = pipes.filter((p) => p.status === "repaired" || p.status === "rusted").length;

  return (
    <div
      className="min-h-screen bg-[#E3F2FD] text-slate-800 font-sans relative pb-4 antialiased"
      id="root-app-layout"
    >
      {/* Standalone Return to Home Button at the absolute top of the page (when not on start screen & not in active game playing state & not in instructions state) */}
      {gameState !== "start" && gameState !== "playing" && gameState !== "instructions" && (
        <div className="max-w-[97vw] mx-auto px-2 sm:px-4 md:px-5 pt-3 flex justify-between items-center" id="global-top-action-bar">
          <button
            id="btn-global-back-to-home"
            onClick={handleBackToHome}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 hover:text-white text-white font-extrabold px-4 py-2 rounded-xl transition-all shadow-md text-xs cursor-pointer select-none"
          >
            <Home size={14} className="text-yellow-400" />
            <span>HOME</span>
          </button>
        </div>
      )}

      {/* Main interactive viewport container */}
      <main className="max-w-[97vw] mx-auto px-2 sm:px-4 md:px-5 py-4" id="main-content-bay">
        <AnimatePresence mode="wait">
          
          {/* 1. PK Mode Active Overlay Screen */}
          {pkModeActive && (
            <motion.div
              key="pk-versus-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <PKMode language={language} level={pkLevel} onExit={handleBackToHome} />
            </motion.div>
          )}

          {/* 2. Normal Game States */}
          {!pkModeActive && (
            <>
              {/* STATE: Start Screening Pages */}
              {gameState === "start" && (
                <motion.div
                  key="start-screen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <StartScreen
                    language={language}
                    onLanguageChange={setLanguage}
                    onSelectLevel={handleSelectLevel}
                    onSelectPKMode={handleSelectPKMode}
                    onShowInstructions={() => setGameState("instructions")}
                  />
                </motion.div>
              )}

              {/* STATE: Interactive Pedagogical Instructions Manual */}
              {gameState === "instructions" && (
                <motion.div
                  key="instructions-screen"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                >
                  <InstructionScreen
                    language={language}
                    onBack={() => setGameState("start")}
                  />
                </motion.div>
              )}

              {/* STATE: Process Flow Preparation */}
              {gameState === "preparation" && (
                <motion.div
                  key="preparation-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <PreparationScreen
                    language={language}
                    level={level}
                    tasks={pipes}
                    onStartGame={() => setGameState("playing")}
                    onBack={() => setGameState("start")}
                  />
                </motion.div>
              )}

              {/* STATE: In-Workshop Main Matching game */}
              {gameState === "playing" && (
                <motion.div
                  key="playing-screen"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  {/* Operations dashboard stats top panel */}
                  <GameHeader
                    language={language}
                    onLanguageChange={setLanguage}
                    levelLabel={level}
                    score={score}
                    rustIndex={rustCount}
                    completedTasksCount={completedTasksCount}
                    totalTasksCount={pipes.length}
                    timeLeft={timeLeft}
                    onExit={() => setShowPauseModal(true)}
                  />

                  {/* Active SVG dynamic tubes Map */}
                  <PipelineCanvas
                    language={language}
                    pipes={pipes}
                    onSelectNode={(nodeId) => setActiveNodeId(nodeId)}
                    activeNodeId={activeNodeId}
                  />

                  {/* Pause menu overlay */}
                  <AnimatePresence>
                    {showPauseModal && (
                      <PauseModal
                        language={language}
                        onClose={() => setShowPauseModal(false)}
                        onRestart={() => {
                          setShowPauseModal(false);
                          handleSelectLevel(level);
                        }}
                        onExit={() => {
                          setShowPauseModal(false);
                          handleBackToHome();
                        }}
                      />
                    )}
                  </AnimatePresence>

                  {/* Welding dialog popped-up */}
                  <AnimatePresence>
                    {activeNodeId && (
                      (() => {
                        const targetNode = pipes.find((p) => p.id === activeNodeId);
                        if (!targetNode) return null;
                        return (
                          <RepairModal
                            key={targetNode.id}
                            language={language}
                            node={targetNode}
                            onClose={() => setActiveNodeId(null)}
                            onSaveRepair={handleSaveRepair}
                          />
                        );
                      })()
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* STATE: The Rusted review mode loop */}
              {gameState === "review" && (
                <motion.div
                  key="review-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ReviewModal
                    language={language}
                    rustedNodes={pipes.filter((p) => p.status === "rusted")}
                    onFinishReview={handleFinishReview}
                  />
                </motion.div>
              )}

              {/* STATE: Final Scoreboard and review grid */}
              {gameState === "settlement" && (
                <motion.div
                  key="settlement-screen"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <SettlementScreen
                    language={language}
                    level={level}
                    score={score}
                    rustCount={rustCount}
                    pipes={pipes}
                    onRestart={() => handleSelectLevel(level)}
                    onBackToHome={handleBackToHome}
                  />
                </motion.div>
              )}
            </>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
