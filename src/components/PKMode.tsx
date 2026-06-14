/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { LanguageCode, PipeNode, PKPlayerState, GameLevel } from "../types";
import { UI_TEXTS, VERBS, CLASSIFIERS, NOUNS, generatePipeTasks, verifyCollocation, getChPinyin } from "../data";
import { PipelineCanvas } from "./PipelineCanvas";
import { Trophy, Zap, Users, ArrowRight, ShieldCheck, Undo, AlertTriangle, Shield, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface PKModeProps {
  language: LanguageCode;
  level: GameLevel;
  onExit: () => void;
}

export const PKMode: React.FC<PKModeProps> = ({
  language,
  level,
  onExit
}) => {
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  // Pre-generated set of 6 tasks for balance in PK mode
  const [pkPrepTasks, setPkPrepTasks] = useState<PipeNode[]>(() => {
    return generatePipeTasks(level);
  });
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(185); // 180s timer + initial offset

  // Ready states for the interactive Preparation Page
  const [p1Ready, setP1Ready] = useState<boolean>(false);
  const [p2Ready, setP2Ready] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Score Accumulators
  const [p1State, setP1State] = useState<PKPlayerState>({
    id: "player1",
    name: language === "cn" ? "玩家一 (P1)" : "Player 1",
    score: 0,
    pipes: [],
    activeNodeId: null,
    rustCount: 0,
    completedCount: 0,
    isStunned: false,
    stunDurationLeft: 0
  });

  const [p2State, setP2State] = useState<PKPlayerState>({
    id: "player2",
    name: language === "cn" ? "玩家二 (P2)" : "Player 2",
    score: 0,
    pipes: [],
    activeNodeId: null,
    rustCount: 0,
    completedCount: 0,
    isStunned: false,
    stunDurationLeft: 0
  });

  // 180s Countdown Timer for PK Mode
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          // Evaluate winner based on scores
          if (p1State.score > p2State.score) {
            setWinner(language === "cn" ? "玩家一 (P1)" : "Player 1");
          } else if (p2State.score > p1State.score) {
            setWinner(language === "cn" ? "玩家二 (P2)" : "Player 2");
          } else {
            setWinner(language === "cn" ? "双方平手！" : "Both Players Tie!");
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver, p1State.score, p2State.score, language]);

  // Selected classifier IDs in active node (so they can confirm before committing)
  const [p1SelectedOptionId, setP1SelectedOptionId] = useState<string>("");
  const [p2SelectedOptionId, setP2SelectedOptionId] = useState<string>("");

  // Rust inventory charges (Sabotage tool)
  const [p1RustCharges, setP1RustCharges] = useState<number>(0);
  const [p2RustCharges, setP2RustCharges] = useState<number>(0);

  // Initialize PK Game task arrays
  const handleStartVersus = () => {
    // Deep clone task structures
    const tasks1 = JSON.parse(JSON.stringify(pkPrepTasks));
    // Deep clone task structures with distinct node IDs for player 2
    const tasks2 = JSON.parse(JSON.stringify(pkPrepTasks)).map((t: any) => ({ 
      ...t, 
      id: t.id.replace("n_", "p2_n_").replace("e_", "p2_e_") 
    }));

    setP1State({
      id: "player1",
      name: language === "cn" ? "玩家一 (P1)" : "Player 1",
      score: 0,
      pipes: tasks1,
      activeNodeId: null,
      rustCount: 0,
      completedCount: 0,
      isStunned: false,
      stunDurationLeft: 0
    });

    setP2State({
      id: "player2",
      name: language === "cn" ? "玩家二 (P2)" : "Player 2",
      score: 0,
      pipes: tasks2,
      activeNodeId: null,
      rustCount: 0,
      completedCount: 0,
      isStunned: false,
      stunDurationLeft: 0
    });

    setP1SelectedOptionId("");
    setP2SelectedOptionId("");
    setP1RustCharges(0);
    setP2RustCharges(0);
    setTimeLeft(180);
    setGameOver(false);
    setWinner(null);
    setGameStarted(true);
  };

  const handleRestartLobby = () => {
    setPkPrepTasks(generatePipeTasks(level));
    setP1Ready(false);
    setP2Ready(false);
    setCountdown(null);
    setGameOver(false);
    setWinner(null);
    setGameStarted(false);
  };

  // Stun tick down timer
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setP1State(prev => {
        if (prev.isStunned) {
          const nextDur = prev.stunDurationLeft - 0.5;
          return {
            ...prev,
            stunDurationLeft: nextDur,
            isStunned: nextDur > 0
          };
        }
        return prev;
      });

      setP2State(prev => {
        if (prev.isStunned) {
          const nextDur = prev.stunDurationLeft - 0.5;
          return {
            ...prev,
            stunDurationLeft: nextDur,
            isStunned: nextDur > 0
          };
        }
        return prev;
      });
    }, 500);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  // Dual Ready & Countdown State-Reaction Controller
  useEffect(() => {
    if (p1Ready && p2Ready) {
      setCountdown(3);
    } else {
      setCountdown(null);
    }
  }, [p1Ready, p2Ready]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      handleStartVersus();
      setP1Ready(false);
      setP2Ready(false);
      setCountdown(null);
      return;
    }
    const timer = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  // Verify and submit repair for Player 1
  const handleP1Verify = () => {
    if (p1State.isStunned || !p1SelectedOptionId) return;
    const activeIdx = p1State.pipes.findIndex(p => p.id === p1State.activeNodeId);
    if (activeIdx === -1) return;

    const pipe = p1State.pipes[activeIdx];
    if (pipe.status !== "broken") return;

    // Verb and Noun are correct, verify input classifier
    const check = verifyCollocation(pipe.currentVerbId, p1SelectedOptionId, pipe.currentNounId);

    if (check.isValid) {
      // Repaired! Reward player with score and sabotage charges
      setP1RustCharges(c => c + 1);
      setP1State(prev => {
        const updated = [...prev.pipes];
        updated[activeIdx] = { 
          ...pipe, 
          status: "repaired", 
          currentClassifierId: p1SelectedOptionId 
        };
        const newScore = prev.score + 15;
        const newCompleted = prev.completedCount + 1;

        return {
          ...prev,
          pipes: updated,
          score: newScore,
          completedCount: newCompleted,
          activeNodeId: null
        };
      });
      setP1SelectedOptionId("");
    } else {
      const attempts = pipe.attempts + 1;
      setP1State(prev => {
        const updated = [...prev.pipes];
        if (attempts >= 2) {
          // Lock node with rust after 2 attempts
          updated[activeIdx] = { 
            ...pipe, 
            status: "rusted", 
            attempts,
            currentClassifierId: p1SelectedOptionId
          };
          return {
            ...prev,
            pipes: updated,
            rustCount: prev.rustCount + 1,
            activeNodeId: null
          };
        } else {
          updated[activeIdx] = { 
            ...pipe, 
            attempts,
            currentClassifierId: p1SelectedOptionId 
          };
          return { ...prev, pipes: updated };
        }
      });
    }
  };

  // Verify and submit repair for Player 2
  const handleP2Verify = () => {
    if (p2State.isStunned || !p2SelectedOptionId) return;
    const activeIdx = p2State.pipes.findIndex(p => p.id === p2State.activeNodeId);
    if (activeIdx === -1) return;

    const pipe = p2State.pipes[activeIdx];
    if (pipe.status !== "broken") return;

    const check = verifyCollocation(pipe.currentVerbId, p2SelectedOptionId, pipe.currentNounId);

    if (check.isValid) {
      // Repaired! Reward player with score and sabotage charges
      setP2RustCharges(c => c + 1);
      setP2State(prev => {
        const updated = [...prev.pipes];
        updated[activeIdx] = { 
          ...pipe, 
          status: "repaired", 
          currentClassifierId: p2SelectedOptionId 
        };
        const newScore = prev.score + 15;
        const newCompleted = prev.completedCount + 1;

        return {
          ...prev,
          pipes: updated,
          score: newScore,
          completedCount: newCompleted,
          activeNodeId: null
        };
      });
      setP2SelectedOptionId("");
    } else {
      const attempts = pipe.attempts + 1;
      setP2State(prev => {
        const updated = [...prev.pipes];
        if (attempts >= 2) {
          // Lock node with rust after 2 attempts
          updated[activeIdx] = { 
            ...pipe, 
            status: "rusted", 
            attempts,
            currentClassifierId: p2SelectedOptionId
          };
          return {
            ...prev,
            pipes: updated,
            rustCount: prev.rustCount + 1,
            activeNodeId: null
          };
        } else {
          updated[activeIdx] = { 
            ...pipe, 
            attempts,
            currentClassifierId: p2SelectedOptionId 
          };
          return { ...prev, pipes: updated };
        }
      });
    }
  };

  // Toss Rust on Opponent to stun them
  const handleTossRust = (fromPlayer: "p1" | "p2") => {
    if (fromPlayer === "p1") {
      if (p1RustCharges <= 0) return;
      setP1RustCharges(c => c - 1);
      setP2State(prev => ({
        ...prev,
        isStunned: true,
        stunDurationLeft: 2.5
      }));
    } else {
      if (p2RustCharges <= 0) return;
      setP2RustCharges(c => c - 1);
      setP1State(prev => ({
        ...prev,
        isStunned: true,
        stunDurationLeft: 2.5
      }));
    }
  };

  // Check game completion targets
  useEffect(() => {
    if (!gameStarted || gameOver) return;

    // Both players must have dealt with all 6 of their pipeline nodes
    const p1Done = p1State.pipes.length > 0 && p1State.pipes.every(p => p.status !== "broken");
    const p2Done = p2State.pipes.length > 0 && p2State.pipes.every(p => p.status !== "broken");

    if (p1Done || p2Done) {
      setGameOver(true);
      if (p1State.score > p2State.score) {
        setWinner(language === "cn" ? "玩家一 (P1)" : "Player 1");
      } else if (p2State.score > p1State.score) {
        setWinner(language === "cn" ? "玩家二 (P2)" : "Player 2");
      } else {
        setWinner(language === "cn" ? "双方平手！" : "Both Players Tie!");
      }
    }
  }, [p1State.pipes, p2State.pipes, gameStarted, gameOver]);

  return (
    <div className="w-full max-w-[97vw] xl:max-w-[1680px] mx-auto py-4 px-1 sm:px-2 select-none" id="pk-versus-panel">
      
      {/* Upper Cover Configuration Row */}
      {!gameStarted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-slate-900 border-2 border-slate-700/60 rounded-3xl p-6 sm:p-10 shadow-2xl max-w-[97vw] xl:max-w-[1550px] mx-auto text-center text-slate-100 relative overflow-hidden"
          id="pk-setup-box"
        >
          {/* Subtle background tech glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10 flex flex-col items-center mb-5">
            <div className="bg-orange-500/20 text-orange-400 p-4 rounded-2xl border border-orange-500/30 mb-4 animate-pulse">
              <Users size={36} />
            </div>
            <h3 className="text-2xl sm:text-3.5xl font-black tracking-tight text-white mb-2 animate-fadeIn">
              {language === "cn" ? `🏆 双人同屏对决 (${level})` : `🏆 Split-Screen Hydraulic Arena (${level})`}
            </h3>
          </div>

          {/* Upcoming Collocations list (Grammar points preview) - EXPANDED */}
          <div className="relative z-10 bg-slate-950/60 border border-slate-800 p-6 sm:p-8 rounded-2xl mb-8 text-left max-w-5xl mx-auto w-full">
            <div className="flex items-center gap-2 mb-6 justify-center">
              <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm font-mono font-bold tracking-widest text-emerald-400 uppercase">
                {language === "cn" ? `📖 YCT ${level.replace("YCT", "")} 级管道即将考核题目 (备查正确搭配)` : `📖 NOMINAL TARGET PREVIEW FOR YCT ${level.replace("YCT", "")}`}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pkPrepTasks.map((task, index) => {
                const correctVerb = VERBS[task.correctVerbId];
                const correctClassifier = CLASSIFIERS[task.correctClassifierId];
                const correctNoun = NOUNS[task.correctNounId];

                return (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                    className="flex items-center justify-between p-4 bg-slate-900 border border-slate-800/80 rounded-xl hover:border-emerald-500/30 hover:bg-slate-900 transition-all gap-4 text-slate-100"
                  >
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-6 h-6 rounded bg-emerald-500/15 text-emerald-400 font-extrabold font-mono flex items-center justify-center shrink-0 border border-emerald-500/25 text-xs">
                        {index + 1}
                      </div>
                      
                      {/* Left container: flex flex-col items-center */}
                      <div className="flex flex-col items-center text-center justify-center shrink-0 min-w-[90px]">
                        {/* First line: Pinyin scaled accordingly */}
                        <span className="text-xs sm:text-sm text-slate-300 font-mono font-bold leading-tight mb-1">
                          {correctNoun ? getChPinyin(correctNoun.char) : ""}
                        </span>
                        {/* Second line: Hanzi scaled exactly like the collocation box content */}
                        <span className="text-xl sm:text-2xl font-black text-white leading-none mb-1.5 select-none">
                          {correctNoun?.char || ""}
                        </span>
                        {/* Third line: English translation scaled accordingly */}
                        <span className="text-xs sm:text-sm text-slate-400 font-medium leading-tight">
                          {correctNoun?.translations?.en || ""}
                        </span>
                      </div>
                    </div>

                    {/* Displays correct answers visually with vertical box alignment */}
                    <div className="flex items-center gap-3 font-mono py-2.5 px-4 bg-slate-950 rounded-xl border border-slate-850 text-base sm:text-lg shrink-0 select-none">
                      
                      {/* Verb column: flex flex-col items-center */}
                      <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-xs text-slate-305 text-slate-300 font-bold font-mono leading-none mb-1.5">
                          {correctVerb ? getChPinyin(correctVerb.char) : ""}
                        </span>
                        <span className="text-white bg-slate-900 px-3 py-1.5 rounded font-black text-xl sm:text-2xl border border-slate-800">
                          {correctVerb?.char || "?"}
                        </span>
                      </div>

                      <span className="text-slate-600 text-sm select-none font-bold self-end pb-2.5">+</span>

                      {/* Classifier column: flex flex-col items-center */}
                      <div className="flex flex-col items-center min-w-[55px]">
                        <span className="text-xs text-emerald-300 font-black font-mono leading-none mb-1.5">
                          {correctClassifier ? getChPinyin(correctClassifier.char) : ""}
                        </span>
                        <span className="text-emerald-400 font-black bg-emerald-950 px-3.5 py-1.5 rounded border border-emerald-900/60 text-xl sm:text-2xl">
                          {correctClassifier?.char || "?"}
                        </span>
                      </div>

                      <span className="text-slate-600 text-sm select-none font-bold self-end pb-2.5">+</span>

                      {/* Noun column: flex flex-col items-center */}
                      <div className="flex flex-col items-center min-w-[50px]">
                        <span className="text-xs text-slate-305 text-slate-300 font-bold font-mono leading-none mb-1.5">
                          {correctNoun ? getChPinyin(correctNoun.char) : ""}
                        </span>
                        <span className="text-emerald-300 bg-slate-900 px-3 py-1.5 rounded font-black text-xl sm:text-2xl border border-slate-800">
                          {correctNoun?.char || "?"}
                        </span>
                      </div>

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Splitscreen Ready Cards - COMPACT */}
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 max-w-3xl mx-auto" id="prep-lobby-grid">
            
            {/* PLAYER 1 PREP ZONE */}
            <div 
              className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between h-[105px] ${
                p1Ready 
                  ? "bg-sky-950/40 border-sky-500 shadow-[0_0_10px_rgba(14,165,233,0.15)]" 
                  : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-sky-400">
                  {language === "cn" ? "玩家一 (P1) · 蓝色" : "Player 1 (P1)"}
                </span>
                <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded ${
                  p1Ready ? "bg-sky-900 text-sky-305 text-sky-300 animate-pulse" : "bg-slate-900 text-slate-500"
                }`}>
                  {p1Ready ? "READY" : "WAITING"}
                </span>
              </div>

              <button
                id="btn-p1-ready-toggle"
                type="button"
                onClick={() => {
                  if (countdown === null) setP1Ready(!p1Ready);
                }}
                disabled={countdown !== null}
                className={`w-full py-1.5 rounded-lg font-bold text-xs transition-all uppercase select-none cursor-pointer ${
                  p1Ready
                    ? "bg-sky-500 text-slate-950 font-black shadow-md border border-sky-400"
                    : "bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400 border border-slate-800"
                } ${countdown !== null ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {p1Ready ? "✓ READY" : "READY UP P1"}
              </button>
            </div>

            {/* PLAYER 2 PREP ZONE */}
            <div 
              className={`p-3.5 rounded-xl border-2 transition-all flex flex-col justify-between h-[105px] ${
                p2Ready 
                  ? "bg-amber-950/30 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.15)]" 
                  : "bg-slate-950/40 border-slate-800 hover:border-slate-700"
              }`}
            >
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-amber-500">
                  {language === "cn" ? "玩家二 (P2) · 金色" : "Player 2 (P2)"}
                </span>
                <span className={`text-[9px] font-mono font-black px-1.5 py-0.5 rounded ${
                  p2Ready ? "bg-amber-900/60 text-amber-300 animate-pulse" : "bg-slate-900 text-slate-500"
                }`}>
                  {p2Ready ? "READY" : "WAITING"}
                </span>
              </div>

              <button
                id="btn-p2-ready-toggle"
                type="button"
                onClick={() => {
                  if (countdown === null) setP2Ready(!p2Ready);
                }}
                disabled={countdown !== null}
                className={`w-full py-1.5 rounded-lg font-bold text-xs transition-all uppercase select-none cursor-pointer ${
                  p2Ready
                    ? "bg-amber-500 text-slate-950 font-black shadow-md border border-amber-400"
                    : "bg-slate-900 hover:bg-slate-850 hover:text-white text-slate-400 border border-slate-800"
                } ${countdown !== null ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {p2Ready ? "✓ READY" : "READY UP P2"}
              </button>
            </div>

          </div>

          {/* Bottom Control Actions (Cancel or countdown indicator) */}
          <div className="relative z-10 flex flex-col items-center justify-center border-t border-slate-800/80 pt-6">
            <AnimatePresence mode="wait">
              {countdown !== null ? (
                <motion.div
                  key="countdown-status"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex flex-col items-center mb-4"
                >
                  <span className="text-xs text-orange-400 font-mono font-bold animate-pulse tracking-widest uppercase">
                    ⚡ HIGH VOLTAGE SYNCHRONIZATION DETECTED! ⚡
                  </span>
                  <div className="text-4xl sm:text-6xl font-black font-mono text-white mt-1 select-none animate-ping">
                    {countdown}
                  </div>
                </motion.div>
              ) : (
                <div className="text-xs text-slate-500 font-mono mb-4 text-center">
                  💡 {language === "cn" ? "双人全部点击准备后，开始 3 秒进入战场的倒计时" : "A 3-second countdown activates when both click Ready."}
                </div>
              )}
            </AnimatePresence>

            <button
              id="btn-pk-exit"
              type="button"
              onClick={onExit}
              className="px-8 py-2.5 rounded-xl border border-slate-700 text-slate-400 font-bold hover:bg-slate-800 hover:text-white transition cursor-pointer text-xs sm:text-sm"
            >
              🚪 BACK TO HOME
            </button>
          </div>
        </motion.div>
      ) : (
        /* The splitscreen arena layout */
        <div className="animate-fadeIn w-full" id="activesplitscreen-container">
          
          <div className="flex justify-between items-center bg-slate-900 text-slate-100 p-4 rounded-2xl mb-6 shadow-md gap-3 border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-red-400 rounded-full animate-ping" />
              <h3 className="text-sm font-black uppercase font-mono tracking-widest text-orange-400">
                🔴 LIVE HYDRAULIC DUEL // 双人量词比拼 ({level})
              </h3>
            </div>
            
            <button
              id="btn-quit-active-pk"
              type="button"
              onClick={onExit}
              className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 hover:text-white border border-slate-700 text-slate-300 text-xs rounded-lg transition font-mono"
            >
              <Undo size={12} />
              <span>TERMINATE</span>
            </button>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full" id="splitscreen-box">
            
            {/* 🔴 PLAYER 1 SIDE (LEFT PANEL) */}
            <div
              className={`p-4 sm:p-5 rounded-3xl border-2 shadow-xl bg-slate-950 text-slate-100 relative overflow-hidden transition-all duration-300 ${
                p1State.isStunned ? "border-red-600 saturate-50" : "border-sky-500/80"
              }`}
              id="p1-side-deck"
            >
              {p1State.isStunned && (
                <div className="absolute inset-x-0 top-0 bg-red-500 text-white py-1.5 px-3 text-center text-xs font-mono font-black z-30 animate-pulse flex items-center justify-center gap-2">
                  <Zap size={14} className="animate-bounce" />
                  <span>{getUI("pkStunMsg") || "SYSTEM STUNNED!"} ({p1State.stunDurationLeft.toFixed(1)}s)</span>
                </div>
              )}

              <div className="flex justify-between items-center mb-3 border-b border-slate-850 pb-2.5">
                <div>
                  <span className="text-sky-400 text-xs font-mono font-bold uppercase tracking-widest">
                    SYSTEM: BLUE #P1
                  </span>
                  <h4 className="text-lg font-black text-white">{p1State.name}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 border border-slate-800 py-1 px-2.5 rounded-xl flex items-center gap-1.5 shadow-inner">
                    <Clock size={12} className="text-yellow-400 animate-pulse" />
                    <div className="text-right">
                      <span className="text-[7px] text-slate-500 uppercase block font-bold leading-none font-mono">TIME</span>
                      <span className="font-mono font-black text-rose-450 text-xs text-rose-400 leading-none">{timeLeft}s</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] block font-mono">REPAIR SCORE</span>
                    <span className="text-xl font-mono text-cyan-400 font-black">{p1State.score} XP</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-900 border border-slate-850 p-2.5 rounded-xl mb-4">
                <span className="text-xs text-slate-400">{language === "cn" ? "固定进度：" : "Cleared Nodes:"} {p1State.completedCount}/6</span>
                <span className="bg-sky-950/60 text-sky-400 border border-sky-900/40 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                  {p1State.rustCount > 0 ? `RUSTED: ${p1State.rustCount}` : "NOMINAL"}
                </span>
              </div>

              {/* Map */}
              <div className="bg-slate-900/60 p-2 rounded-2xl border border-slate-850 mb-4 overflow-hidden relative mt-3" id="p1-map-container">
                <PipelineCanvas
                  language={language}
                  pipes={p1State.pipes}
                  onSelectNode={(nodeId) => {
                    if (!p1State.isStunned) {
                      setP1State(prev => ({ ...prev, activeNodeId: nodeId }));
                      setP1SelectedOptionId("");
                    }
                  }}
                  activeNodeId={p1State.activeNodeId}
                />

                {/* Local floating overlay answering page for Player 1 */}
                <AnimatePresence>
                  {p1State.activeNodeId && (
                    (() => {
                      const activePipe = p1State.pipes.find(p => p.id === p1State.activeNodeId);
                      if (!activePipe) return null;
                      
                      const verb = VERBS[activePipe.currentVerbId];
                      const noun = NOUNS[activePipe.currentNounId];
                      const selectedClassItem = CLASSIFIERS[p1SelectedOptionId];

                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[96%] sm:w-[88%] md:w-[60%] h-[90%] sm:h-[78%] md:h-[62%] bg-slate-50 text-slate-800 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto z-20 rounded-2xl border-4 border-slate-800 shadow-2xl"
                        >
                          {/* Header */}
                          <div className="border-b border-slate-200 pb-2 mb-2 flex justify-between items-center shrink-0">
                            <div>
                              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100">
                                🛠️ STATION #{p1State.pipes.indexOf(activePipe) + 1}
                              </span>
                              <h4 className="text-base font-black text-slate-800 tracking-tight mt-1">
                                {language === "cn" ? "量词诊断与管道修复" : "Collocation Diagnosis"}
                              </h4>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono font-bold">
                              ATTEMPTS: {activePipe.attempts}/2
                            </span>
                          </div>

                          {/* Interactive Display Area */}
                          <div className="bg-slate-950 border border-slate-800 py-4 px-4 rounded-xl flex items-center justify-center gap-6 my-2 relative overflow-hidden shrink-0">
                            {/* Verb */}
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-sm sm:text-base font-mono text-slate-100 font-extrabold mb-1">{verb ? getChPinyin(verb.char) : ""}</span>
                              <span className="text-xl sm:text-3xl font-black text-white font-sans tracking-wide leading-none">{verb?.char || activePipe.currentVerbId}</span>
                            </div>
                            
                            {/* Blank Gap */}
                            <div className={`min-w-[110px] sm:min-w-[130px] h-15 sm:h-17 px-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                              selectedClassItem 
                                ? "bg-violet-950 border-violet-400 text-violet-200" 
                                : "bg-slate-900 border-dashed border-slate-750 text-slate-500"
                            }`}>
                              {selectedClassItem ? (
                                <div className="flex flex-col items-center justify-center">
                                  <span className="text-xs sm:text-sm font-mono text-violet-205 text-violet-200 font-black mb-0.5">{getChPinyin(selectedClassItem.char)}</span>
                                  <span className="text-lg sm:text-2xl font-black font-mono leading-none">{selectedClassItem.char}</span>
                                </div>
                              ) : (
                                <span className="text-slate-500 font-black text-base sm:text-lg select-none">_____</span>
                              )}
                            </div>

                            {/* Noun */}
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-sm sm:text-base font-mono text-slate-100 font-extrabold mb-1">{noun ? getChPinyin(noun.char) : ""}</span>
                              <span className="text-xl sm:text-3xl font-black text-emerald-300 font-sans tracking-wide leading-none">{noun?.char || activePipe.currentNounId}</span>
                            </div>
                          </div>

                          {/* Options Bay */}
                          <div className="bg-white border border-slate-150 rounded-xl p-2.5 my-1.5 flex-grow flex flex-col justify-center min-h-[105px]">
                            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1.5 font-bold text-center">
                              {language === "cn" ? "👇 请选择正确的量词：" : "👇 Click correct classifier:"}
                            </span>
                            
                            <div className="grid grid-cols-3 gap-2">
                              {activePipe.classifierOptions && activePipe.classifierOptions.map(opt => {
                                const isChosen = p1SelectedOptionId === opt.id;
                                return (
                                  <button
                                    id={`p1-opt-${opt.id}`}
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setP1SelectedOptionId(opt.id)}
                                    className={`p-2 rounded-xl border-2 border-b-4 flex flex-col items-center justify-center min-h-[60px] sm:min-h-[66px] transition-all cursor-pointer select-none active:translate-y-0.5 ${
                                      isChosen
                                        ? "bg-violet-100 border-violet-500 text-violet-950 font-black ring-2 ring-violet-500/15"
                                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                                    }`}
                                  >
                                    <span className={`text-xs text-sm sm:text-base font-mono mb-1 ${isChosen ? "text-violet-955 font-black" : "text-slate-900 font-extrabold"}`}>
                                      {getChPinyin(opt.char)}
                                    </span>
                                    <span className="text-lg sm:text-2xl font-black font-mono leading-none tracking-tight">{opt.char}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 shrink-0">
                            <button
                               type="button"
                               onClick={() => {
                                 p1State.activeNodeId && setP1State(prev => ({ ...prev, activeNodeId: null }));
                                 setP1SelectedOptionId("");
                               }}
                               className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition"
                            >
                              CANCEL
                            </button>
                            <button
                              id="p1-btn-deploy"
                              type="button"
                              disabled={!p1SelectedOptionId}
                              onClick={handleP1Verify}
                              className={`px-5 py-1.5 text-xs font-black rounded-lg transition border-2 cursor-pointer flex items-center gap-1 shadow-sm active:translate-y-px ${
                                p1SelectedOptionId 
                                  ? "bg-indigo-600 hover:bg-indigo-700 border-indigo-700 text-white" 
                                  : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                              }`}
                            >
                              <ShieldCheck size={12} />
                              <span>DEPLOY</span>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })()
                  )}
                </AnimatePresence>
              </div>

              {/* Sabotage items */}
              <div className="mt-4 border-t border-slate-850 pt-4 flex justify-between items-center">
                <span className="text-xs text-slate-400">
                  {language === "cn" ? "侵蚀弹存量 (Sabotage Charges)：" : "Charges:"} <span className="font-mono text-orange-400 font-extrabold">{p1RustCharges}</span>
                </span>
                <button
                  id="p1-btn-sabores"
                  type="button"
                  disabled={p1RustCharges <= 0}
                  onClick={() => handleTossRust("p1")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    p1RustCharges > 0
                      ? "bg-orange-500 hover:bg-orange-600 text-slate-950 shadow-lg"
                      : "bg-slate-850 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  💥 SABOTAGE!
                </button>
              </div>

            </div>

            {/* 🟡 PLAYER 2 SIDE (RIGHT PANEL) */}
            <div
              className={`p-4 sm:p-5 rounded-3xl border-2 shadow-xl bg-slate-950 text-slate-100 relative overflow-hidden transition-all duration-300 ${
                p2State.isStunned ? "border-red-600 saturate-50" : "border-yellow-500/80"
              }`}
              id="p2-side-deck"
            >
              {p2State.isStunned && (
                <div className="absolute inset-x-0 top-0 bg-red-500 text-white py-1.5 px-3 text-center text-xs font-mono font-black z-30 animate-pulse flex items-center justify-center gap-2">
                  <Zap size={14} className="animate-bounce" />
                  <span>{getUI("pkStunMsg") || "SYSTEM STUNNED!"} ({p2State.stunDurationLeft.toFixed(1)}s)</span>
                </div>
              )}

              <div className="flex justify-between items-center mb-3 border-b border-slate-850 pb-2.5">
                <div>
                  <span className="text-yellow-400 text-xs font-mono font-bold uppercase tracking-widest">
                    SYSTEM: GOLD #P2
                  </span>
                  <h4 className="text-lg font-black text-white">{p2State.name}</h4>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-slate-900 border border-slate-800 py-1 px-2.5 rounded-xl flex items-center gap-1.5 shadow-inner">
                    <Clock size={12} className="text-yellow-400 animate-pulse" />
                    <div className="text-right">
                      <span className="text-[7px] text-slate-500 uppercase block font-bold leading-none font-mono">TIME</span>
                      <span className="font-mono font-black text-rose-450 text-xs text-rose-400 leading-none">{timeLeft}s</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-500 text-[10px] block font-mono">REPAIR SCORE</span>
                    <span className="text-xl font-mono text-amber-450 font-black text-yellow-400">{p2State.score} XP</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between bg-slate-900 border border-slate-850 p-2.5 rounded-xl mb-4">
                <span className="text-xs text-slate-400">{language === "cn" ? "固定进度：" : "Cleared Nodes:"} {p2State.completedCount}/6</span>
                <span className="bg-amber-955/60 text-amber-400 border border-amber-905/40 text-[9px] px-2 py-0.5 rounded font-mono font-bold">
                  {p2State.rustCount > 0 ? `RUSTED: ${p2State.rustCount}` : "NOMINAL"}
                </span>
              </div>

              {/* Map */}
              <div className="bg-slate-900/60 p-2 rounded-2xl border border-slate-850 mb-4 overflow-hidden relative mt-3" id="p2-map-container">
                <PipelineCanvas
                  language={language}
                  pipes={p2State.pipes}
                  onSelectNode={(nodeId) => {
                    if (!p2State.isStunned) {
                      setP2State(prev => ({ ...prev, activeNodeId: nodeId }));
                      setP2SelectedOptionId("");
                    }
                  }}
                  activeNodeId={p2State.activeNodeId}
                />

                {/* Local floating overlay answering page for Player 2 */}
                <AnimatePresence>
                  {p2State.activeNodeId && (
                    (() => {
                      const activePipe = p2State.pipes.find(p => p.id === p2State.activeNodeId);
                      if (!activePipe) return null;

                      const verb = VERBS[activePipe.currentVerbId];
                      const noun = NOUNS[activePipe.currentNounId];
                      const selectedClassItem = CLASSIFIERS[p2SelectedOptionId];

                      return (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[96%] sm:w-[88%] md:w-[60%] h-[90%] sm:h-[78%] md:h-[62%] bg-slate-50 text-slate-800 p-5 sm:p-6 flex flex-col justify-between overflow-y-auto z-20 rounded-2xl border-4 border-slate-800 shadow-2xl"
                        >
                          {/* Header */}
                          <div className="border-b border-slate-200 pb-2 mb-2 flex justify-between items-center shrink-0">
                            <div>
                              <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-full border border-yellow-100">
                                🛠️ STATION #{p2State.pipes.indexOf(activePipe) + 1}
                              </span>
                              <h4 className="text-base font-black text-slate-800 tracking-tight mt-1">
                                {language === "cn" ? "量词诊断与管道修复" : "Collocation Diagnosis"}
                              </h4>
                            </div>
                            <span className="text-[10px] text-slate-500 font-mono font-bold">
                              ATTEMPTS: {activePipe.attempts}/2
                            </span>
                          </div>

                          {/* Interactive Display Area */}
                          <div className="bg-slate-950 border border-slate-800 py-4 px-4 rounded-xl flex items-center justify-center gap-6 my-2 relative overflow-hidden shrink-0">
                            {/* Verb */}
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-sm sm:text-base font-mono text-slate-100 font-extrabold mb-1">{verb ? getChPinyin(verb.char) : ""}</span>
                              <span className="text-xl sm:text-3xl font-black text-white font-sans tracking-wide leading-none">{verb?.char || activePipe.currentVerbId}</span>
                            </div>
                            
                            {/* Blank Gap */}
                            <div className={`min-w-[110px] sm:min-w-[130px] h-15 sm:h-17 px-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
                              selectedClassItem 
                                ? "bg-violet-950 border-violet-400 text-violet-200" 
                                : "bg-slate-900 border-dashed border-slate-750 text-slate-500"
                            }`}>
                              {selectedClassItem ? (
                                <div className="flex flex-col items-center justify-center">
                                  <span className="text-xs sm:text-sm font-mono text-violet-200 font-black mb-0.5">{getChPinyin(selectedClassItem.char)}</span>
                                  <span className="text-lg sm:text-2xl font-black font-mono leading-none">{selectedClassItem.char}</span>
                                </div>
                              ) : (
                                <span className="text-slate-500 font-black text-base sm:text-lg select-none">_____</span>
                              )}
                            </div>

                            {/* Noun */}
                            <div className="flex flex-col items-center justify-center">
                              <span className="text-sm sm:text-base font-mono text-slate-100 font-extrabold mb-1">{noun ? getChPinyin(noun.char) : ""}</span>
                              <span className="text-xl sm:text-3xl font-black text-emerald-300 font-sans tracking-wide leading-none">{noun?.char || activePipe.currentNounId}</span>
                            </div>
                          </div>

                          {/* Options Bay */}
                          <div className="bg-white border border-slate-150 rounded-xl p-2.5 my-1.5 flex-grow flex flex-col justify-center min-h-[105px]">
                            <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1.5 font-bold text-center">
                              {language === "cn" ? "👇 请选择正确的量词：" : "👇 Click correct classifier:"}
                            </span>
                            
                            <div className="grid grid-cols-3 gap-2">
                              {activePipe.classifierOptions && activePipe.classifierOptions.map(opt => {
                                const isChosen = p2SelectedOptionId === opt.id;
                                return (
                                  <button
                                    id={`p2-opt-${opt.id}`}
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setP2SelectedOptionId(opt.id)}
                                    className={`p-2 rounded-xl border-2 border-b-4 flex flex-col items-center justify-center min-h-[60px] sm:min-h-[66px] transition-all cursor-pointer select-none active:translate-y-0.5 ${
                                      isChosen
                                        ? "bg-violet-100 border-violet-500 text-violet-955 font-black ring-2 ring-violet-500/15"
                                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                                    }`}
                                  >
                                    <span className={`text-sm sm:text-base font-mono mb-1 ${isChosen ? "text-violet-955 font-black" : "text-slate-900 font-extrabold"}`}>
                                      {getChPinyin(opt.char)}
                                    </span>
                                    <span className="text-lg sm:text-2xl font-black font-mono leading-none tracking-tight">{opt.char}</span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                p2State.activeNodeId && setP2State(prev => ({ ...prev, activeNodeId: null }));
                                setP2SelectedOptionId("");
                              }}
                              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 text-xs font-bold rounded-lg border border-slate-200 transition"
                            >
                              CANCEL
                            </button>
                            <button
                              id="p2-btn-deploy"
                              type="button"
                              disabled={!p2SelectedOptionId}
                              onClick={handleP2Verify}
                              className={`px-5 py-1.5 text-xs font-black rounded-lg transition border-2 cursor-pointer flex items-center gap-1 shadow-sm active:translate-y-px ${
                                p2SelectedOptionId 
                                  ? "bg-amber-500 hover:bg-amber-600 border-amber-600 text-slate-955 font-extrabold" 
                                  : "bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed"
                              }`}
                            >
                              <ShieldCheck size={12} />
                              <span>DEPLOY</span>
                            </button>
                          </div>
                        </motion.div>
                      );
                    })()
                  )}
                </AnimatePresence>
              </div>

              {/* Sabotage items */}
              <div className="mt-4 border-t border-slate-850 pt-4 flex justify-between items-center">
                <span className="text-xs text-slate-400">
                  {language === "cn" ? "侵蚀弹存量 (Sabotage Charges)：" : "Charges:"} <span className="font-mono text-orange-400 font-extrabold">{p2RustCharges}</span>
                </span>
                <button
                  id="p2-btn-sabores"
                  type="button"
                  disabled={p2RustCharges <= 0}
                  onClick={() => handleTossRust("p2")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-extrabold transition cursor-pointer ${
                    p2RustCharges > 0
                      ? "bg-orange-500 hover:bg-orange-600 text-slate-950 shadow-lg"
                      : "bg-slate-850 text-slate-600 cursor-not-allowed"
                  }`}
                >
                  💥 SABOTAGE!
                </button>
              </div>

            </div>

          </div>
          
        </div>
      )}

      {/* GAME OVER WINNER OVERLAY POPUP */}
      <AnimatePresence>
        {gameOver && (
          <div className="fixed inset-0 bg-slate-950/90 flex items-center justify-center p-4 z-50 backdrop-blur-md" id="pk-gameover-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full border-4 border-orange-500 text-center shadow-2xl relative flex flex-col max-h-[95vh] sm:max-h-[90vh] overflow-hidden"
            >
              <div className="shrink-0">
                <div className="inline-block bg-orange-100 p-3 rounded-full border border-orange-300 text-orange-500 mb-2 animate-bounce">
                  <Trophy size={36} />
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {language === "cn" ? "对决大考核完成！" : "Duel Concluded!"}
                </h3>
                
                <div className="my-4 bg-slate-50 p-3 sm:p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-500 text-[10px] sm:text-xs uppercase font-mono tracking-wider font-bold">
                    {getUI("pkWinnerIs") || "WINNING REPAIR ENGINEER"}
                  </p>
                  <p className="text-xl sm:text-2xl font-black text-slate-800 mt-0.5">
                    {winner}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 font-sans">
                  <div className="bg-sky-50 p-2 sm:p-2.5 rounded-lg border border-sky-100">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase font-bold">P1 - {p1State.name}</span>
                    <span className="text-base sm:text-lg font-mono font-black text-slate-850 text-slate-800">{p1State.score} XP</span>
                  </div>
                  <div className="bg-yellow-50 p-2 sm:p-2.5 rounded-lg border border-yellow-200">
                    <span className="text-[9px] sm:text-[10px] text-slate-500 block uppercase font-bold">P2 - {p2State.name}</span>
                    <span className="text-base sm:text-lg font-mono font-black text-slate-850 text-slate-800">{p2State.score} XP</span>
                  </div>
                </div>
              </div>

              {/* Detailed Collocation Diagnosis Report */}
              <div className="mt-2 border-t border-slate-150 pt-4 text-left flex-grow overflow-hidden flex flex-col">
                <h4 className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-wider mb-2.5 flex items-center justify-center gap-1.5 font-mono shrink-0">
                  📊 {language === "cn" ? "量词对决诊断报告" : "Collocation Performance Report"}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto px-1 py-1 flex-grow mb-4">
                  {/* Player 1 Diagnosis List */}
                  <div className="bg-sky-50/40 rounded-2xl p-3 border border-sky-100/65 flex flex-col">
                    <div className="flex justify-between items-center mb-2 shrink-0">
                      <span className="font-black text-sky-800 text-xs uppercase tracking-wider flex items-center gap-1">
                        🔵 {p1State.name}
                      </span>
                      <span className="text-[9px] bg-sky-100/90 text-sky-700 font-mono font-bold px-1.5 py-0.5 rounded leading-none">
                        {p1State.score} XP
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                       {p1State.pipes.map((pipe, idx) => {
                        const verb = VERBS[pipe.correctVerbId];
                        const corrClassifier = CLASSIFIERS[pipe.correctClassifierId];
                        const noun = NOUNS[pipe.correctNounId];
                        const selClassifier = CLASSIFIERS[pipe.currentClassifierId];
                        const isCorrect = pipe.status === "repaired";
                        const displayClassifier = isCorrect ? corrClassifier : selClassifier;
                        
                        const textVerb = verb?.char || "";
                        const textClassifier = displayClassifier?.char || "___";
                        const textNoun = noun?.char || "";

                        const pinyinVerb = verb ? getChPinyin(verb.char) : "";
                        const pinyinClassifier = displayClassifier ? getChPinyin(displayClassifier.char) : "___";
                        const pinyinNoun = noun ? getChPinyin(noun.char) : "";

                        const fullPinyin = `${pinyinVerb} ${pinyinClassifier} ${pinyinNoun}`.trim();
                        const fullSentence = `${textVerb}${textClassifier}${textNoun}`;

                        return (
                          <div key={pipe.id} className={`p-4 rounded-2xl border ${
                            isCorrect 
                              ? "bg-green-50/80 border-green-200/60 text-green-950" 
                              : pipe.status === "rusted"
                              ? "bg-amber-50/60 border-amber-200/50 text-amber-900"
                              : "bg-slate-50 border-slate-200 text-slate-800"
                          }`}>
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <span className="font-extrabold text-sm sm:text-base text-slate-400 font-mono mt-1 shrink-0">{idx + 1}.</span>
                                <div className="flex flex-col items-start text-left">
                                  {/* Upper line: Pinyin */}
                                  <span className="text-[11px] sm:text-[13px] font-mono text-slate-500 font-medium tracking-wide">
                                    {fullPinyin}
                                  </span>
                                  {/* Lower line: Large Combined Chinese Sentence */}
                                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-wide mt-0.5">
                                    {fullSentence}
                                  </span>
                                </div>
                              </div>

                              <span className={`text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                                isCorrect 
                                  ? "bg-green-100 text-green-755" 
                                  : pipe.status === "rusted"
                                  ? "bg-orange-100 text-orange-750"
                                  : "bg-slate-200 text-slate-650"
                              }`}>
                                {isCorrect ? (language === "cn" ? "修好 ✓" : "OK ✓") : pipe.status === "rusted" ? (language === "cn" ? "锁死 ✗" : "LOCKED") : (language === "cn" ? "待修" : "BROKEN")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Player 2 Diagnosis List */}
                  <div className="bg-amber-50/20 rounded-2xl p-3 border border-amber-100/65 flex flex-col">
                    <div className="flex justify-between items-center mb-2 shrink-0">
                      <span className="font-black text-amber-800 text-xs uppercase tracking-wider flex items-center gap-1">
                        🟡 {p2State.name}
                      </span>
                      <span className="text-[9px] bg-amber-100/90 text-amber-700 font-mono font-bold px-1.5 py-0.5 rounded leading-none">
                        {p2State.score} XP
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                       {p2State.pipes.map((pipe, idx) => {
                        const verb = VERBS[pipe.correctVerbId];
                        const corrClassifier = CLASSIFIERS[pipe.correctClassifierId];
                        const noun = NOUNS[pipe.correctNounId];
                        const selClassifier = CLASSIFIERS[pipe.currentClassifierId];
                        const isCorrect = pipe.status === "repaired";
                        const displayClassifier = isCorrect ? corrClassifier : selClassifier;
                        
                        const textVerb = verb?.char || "";
                        const textClassifier = displayClassifier?.char || "___";
                        const textNoun = noun?.char || "";

                        const pinyinVerb = verb ? getChPinyin(verb.char) : "";
                        const pinyinClassifier = displayClassifier ? getChPinyin(displayClassifier.char) : "___";
                        const pinyinNoun = noun ? getChPinyin(noun.char) : "";

                        const fullPinyin = `${pinyinVerb} ${pinyinClassifier} ${pinyinNoun}`.trim();
                        const fullSentence = `${textVerb}${textClassifier}${textNoun}`;

                        return (
                          <div key={pipe.id} className={`p-4 rounded-2xl border ${
                            isCorrect 
                              ? "bg-green-50/80 border-green-200/60 text-green-950" 
                              : pipe.status === "rusted"
                              ? "bg-amber-50/60 border-amber-200/50 text-amber-900"
                              : "bg-slate-50 border-slate-200 text-slate-800"
                          }`}>
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-start gap-3">
                                <span className="font-extrabold text-sm sm:text-base text-slate-400 font-mono mt-1 shrink-0">{idx + 1}.</span>
                                <div className="flex flex-col items-start text-left">
                                  {/* Upper line: Pinyin */}
                                  <span className="text-[11px] sm:text-[13px] font-mono text-slate-500 font-medium tracking-wide">
                                    {fullPinyin}
                                  </span>
                                  {/* Lower line: Large Combined Chinese Sentence */}
                                  <span className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-wide mt-0.5">
                                    {fullSentence}
                                  </span>
                                </div>
                              </div>

                              <span className={`text-[10px] sm:text-xs font-mono font-bold px-2 py-0.5 rounded-lg shrink-0 ${
                                isCorrect 
                                  ? "bg-green-100 text-green-755" 
                                  : pipe.status === "rusted"
                                  ? "bg-orange-100 text-orange-750"
                                  : "bg-slate-200 text-slate-650"
                              }`}>
                                {isCorrect ? (language === "cn" ? "修好 ✓" : "OK ✓") : pipe.status === "rusted" ? (language === "cn" ? "锁死 ✗" : "LOCKED") : (language === "cn" ? "待修" : "BROKEN")}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center shrink-0">
                <button
                  id="btn-pk-over-quit"
                  type="button"
                  onClick={onExit}
                  className="px-5 py-2 rounded-xl border border-slate-300 text-slate-600 text-xs sm:text-sm font-bold hover:bg-slate-100 transition cursor-pointer"
                >
                  QUIT
                </button>
                <button
                  id="btn-pk-restart"
                  type="button"
                  onClick={handleRestartLobby}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs sm:text-sm font-extrabold rounded-xl hover:shadow-md active:translate-y-px transition cursor-pointer"
                >
                  REMATCH
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
