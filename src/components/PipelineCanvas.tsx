/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LanguageCode, PipeNode } from "../types";
import { VERBS, CLASSIFIERS, NOUNS } from "../data";
import { Cpu, Droplets, ShowerHead } from "lucide-react";
import { motion } from "motion/react";

// Import backgrounds statically to guarantee perfect resolution on GitHub Pages / production builds
import pipeMazeBg from "../assets/images/pipe_maze_bg_1781308872176.jpg";
import pipeMazeBlueIsometric from "../assets/images/pipe_maze_blue_isometric_1781446800327.jpg";
import pipeMazeNeonCyan from "../assets/images/pipe_maze_neon_cyan_1781398249174.jpg";
import mazeEmerald from "../assets/images/maze_emerald_1781398494530.jpg";
import pipeMazeAmberGlow from "../assets/images/pipe_maze_amber_glow_1781398268160.jpg";

const backgroundOptions = [
  // --- BLUE GROUP ---
  {
    id: "blue_base",
    group: "blue",
    nameCn: "经典探索蓝",
    nameEn: "Classic Explore Blue",
    src: pipeMazeBg,
    color: "#02040a"
  },
  {
    id: "blue_isometric",
    group: "blue",
    nameCn: "等轴空间蓝",
    nameEn: "Isometric Spatial Blue",
    src: pipeMazeBlueIsometric,
    color: "#01020a"
  },

  // --- GREEN GROUP ---
  {
    id: "cyan_base",
    group: "green",
    nameCn: "霓虹极光绿",
    nameEn: "Neon Aurora Green",
    src: pipeMazeNeonCyan,
    color: "#010309"
  },
  {
    id: "emerald_base",
    group: "green",
    nameCn: "翡翠地平线",
    nameEn: "Emerald Mint Green",
    src: mazeEmerald,
    color: "#010403"
  },

  // --- YELLOW GROUP ---
  {
    id: "amber_base",
    group: "yellow",
    nameCn: "熔岩能量黄",
    nameEn: "Lava Amber Gold",
    src: pipeMazeAmberGlow,
    color: "#030208"
  }
];

interface PipelineCanvasProps {
  language: LanguageCode;
  pipes: PipeNode[];
  onSelectNode: (nodeId: string) => void;
  activeNodeId: string | null;
}

export const PipelineCanvas: React.FC<PipelineCanvasProps> = ({
  language,
  pipes,
  onSelectNode,
  activeNodeId
}) => {
  // Select active background theme, randomizing default on mount for a super fresh student experience!
  const [bgIndex] = React.useState(() => {
    return Math.floor(Math.random() * backgroundOptions.length);
  });

  const currentBg = backgroundOptions[bgIndex] || backgroundOptions[0];
  // Calculates water flow segments dynamically for any number of pipes!
  const segmentFlow: boolean[] = [true];
  let accumulatedOk = true;
  for (let i = 0; i < pipes.length; i++) {
    accumulatedOk = accumulatedOk && (pipes[i]?.status === "repaired");
    segmentFlow.push(accumulatedOk);
  }

  // Symmetric coordinates covering the entire frame with cards, leaving the middle wide corridor visible
  const cardPositions = pipes.length === 10 ? [
    "left-[2%] top-[4.5%] w-[18%] h-[42%]",   // Station 1: Row 1 Col 1
    "left-[21.5%] top-[4.5%] w-[18%] h-[42%]", // Station 2: Row 1 Col 2
    "left-[41%] top-[4.5%] w-[18%] h-[42%]",   // Station 3: Row 1 Col 3
    "left-[60.5%] top-[4.5%] w-[18%] h-[42%]", // Station 4: Row 1 Col 4
    "left-[80%] top-[4.5%] w-[18%] h-[42%]",   // Station 5: Row 1 Col 5
    
    "left-[80%] top-[53.5%] w-[18%] h-[42%]",  // Station 6: Row 2 Col 5
    "left-[60.5%] top-[53.5%] w-[18%] h-[42%]", // Station 7: Row 2 Col 4
    "left-[41%] top-[53.5%] w-[18%] h-[42%]",   // Station 8: Row 2 Col 3
    "left-[21.5%] top-[53.5%] w-[18%] h-[42%]", // Station 9: Row 2 Col 2
    "left-[2%] top-[53.5%] w-[18%] h-[42%]"    // Station 10: Row 2 Col 1
  ] : [
    "left-[3%] top-[4%] w-[29%] h-[27%]",   // Station 1: Top Left
    "left-[35.5%] top-[4%] w-[29%] h-[27%]", // Station 2: Top Center
    "left-[68%] top-[4%] w-[29%] h-[27%]",   // Station 3: Top Right
    "left-[68%] top-[55%] w-[29%] h-[27%]",  // Station 4: Bottom Right
    "left-[35.5%] top-[55%] w-[29%] h-[27%]", // Station 5: Bottom Center
    "left-[3%] top-[55%] w-[29%] h-[27%]"    // Station 6: Bottom Left
  ];

  return (
    <div
      className="bg-slate-950 shadow-2xl rounded-[32px] border-4 border-slate-800 p-4 sm:p-6 relative flex flex-col gap-4 overflow-hidden select-none"
      id="pipeline-blueprint-canvas"
    >
      {/* 1. STYLES: Custom animations for realistic cartoon fluid and red blinking alerts */}
      <style>{`
        @keyframes flowSegmentLine {
          to {
            stroke-dashoffset: -120;
          }
        }
        .animated-fluid-stream {
          stroke-dasharray: 14, 16;
          animation: flowSegmentLine 2s linear infinite;
        }
        @keyframes pulseAlertRingGlow {
          0% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            transform: scale(1);
          }
          50% {
            box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
            transform: scale(1.1);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            transform: scale(1);
          }
        }
        .pulsing-leak-red-ring {
          animation: pulseAlertRingGlow 1.8s infinite ease-in-out;
        }
        @keyframes gaugeNeedlePulse {
          0% { transform: rotate(-5deg); }
          50% { transform: rotate(15deg); }
          100% { transform: rotate(-3deg); }
        }
        .gauge-needle-animated {
          transform-origin: 40px 300px;
          animation: gaugeNeedlePulse 6s ease-in-out infinite alternate;
        }
        @keyframes slowSpinValve {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spinning-valve {
          transform-origin: center;
          animation: slowSpinValve 20s linear infinite;
        }
        .spinning-valve-reverse {
          transform-origin: center;
          animation: slowSpinValve 25s linear infinite reverse;
        }
      `}</style>

      {/* 2. BACKGROUND & MAZE VECTOR GRAPHICS (1000 x 600 Grid ViewBox for Desktop) */}
      <div 
        className="relative hidden md:block w-full h-[720px] rounded-[24px] overflow-hidden border-2 border-slate-900 bg-cover bg-no-repeat bg-center transition-all duration-300"
        style={{ backgroundImage: `url(${currentBg.src})`, backgroundColor: currentBg.color }}
        id="desktop-blueprint-vector-layout"
      >
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1000 600" preserveAspectRatio="none">
        </svg>

        {/* 9. CENTRAL TRANSPARENT CONTAINER HOLDING FLOATING STATION CARDS - REWROTE TO ELIMINATE BLACK STATION CARDS */}
        {/* We absolutely position interactive, compact nodes atop the positions to show only leaks/red dots and solved text tags */}
        <div 
          className="absolute inset-[3%] bg-transparent z-10 p-0 flex flex-col justify-between overflow-hidden pointer-events-none"
          id="main-puzzle-task-black-void"
        >
          {/* Unified clean elements layer, click items are pointable */}
          <div className="relative w-full h-full pointer-events-none" id="inner-void-interactive-cards-grid">
            
            {pipes.map((node, index) => {
              const isBroken = node.status === "broken";
              const isRepaired = node.status === "repaired";
              const isRusted = node.status === "rusted";
              const isActive = activeNodeId === node.id;

              const verb = VERBS[node.currentVerbId];
              const classifier = CLASSIFIERS[node.currentClassifierId];
              const noun = NOUNS[node.currentNounId];

              // Active coordinates centered on pipeline features (dispersed to look more organic and less flat/tidy)
              const positions = pipes.length === 10 ? [
                { left: "10.5%", top: "21.5%" },  // Station 1
                { left: "28.5%", top: "34.5%" },  // Station 2
                { left: "52.0%", top: "19.0%" },  // Station 3
                { left: "71.0%", top: "33.0%" },  // Station 4
                { left: "89.5%", top: "22.5%" },  // Station 5
                
                { left: "91.0%", top: "71.5%" },  // Station 6
                { left: "72.5%", top: "82.0%" },  // Station 7
                { left: "48.5%", top: "69.0%" },  // Station 8
                { left: "30.0%", top: "83.5%" },  // Station 9
                { left: "12.0%", top: "73.0%" }   // Station 10
              ] : [
                { left: "14%", top: "41%" }, // Station 1: Top Left Connection
                { left: "48%", top: "54%" }, // Station 2: Middle Coil Area
                { left: "81%", top: "40%" }, // Station 3: Top Right Bend
                { left: "63%", top: "75%" }, // Station 4: Bottom Right Section
                { left: "38%", top: "72%" }, // Station 5: Bottom Left Return
                { left: "15%", top: "53%" }  // Station 6: Feed Loop Sector
              ];

              const pos = positions[index] || { left: "50%", top: "50%" };

              // Rusted/Locked Status
              if (isRusted) {
                return (
                  <div
                    key={`station-rust-${node.id}`}
                    style={{ left: pos.left, top: pos.top }}
                    className="absolute -ml-12 -mt-6 w-24 h-12 flex flex-col items-center justify-center pointer-events-none select-none z-15"
                    id={`station-rust-${node.id}`}
                  >
                    <div className="bg-amber-950/75 border border-amber-600/50 text-amber-500 font-mono text-[9px] font-black px-2 py-1 rounded shadow-lg flex items-center gap-1">
                      <span>🔒</span>
                      <span>RUSTED</span>
                    </div>
                  </div>
                );
              }

              // Repaired Status: Once repaired, the red part and the question words both disappear, leaving the background clean as requested!
              if (isRepaired) {
                return null;
              }

              // Active selected node pulsing
              if (isActive) {
                return (
                  <motion.div
                    key={`station-active-${node.id}`}
                    style={{ left: pos.left, top: pos.top }}
                    onClick={() => onSelectNode(node.id)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 p-2.5 px-3.5 rounded-xl bg-slate-950/90 border-yellow-400 shadow-[0_0_20px_rgba(234,179,8,0.4)] ring-2 ring-yellow-400/50 text-center text-white cursor-pointer pointer-events-auto z-20 select-none animate-pulse"
                    id={`station-active-${node.id}`}
                  >
                    <span className="text-[9px] text-yellow-400 font-mono font-black border border-yellow-400/40 rounded px-1.5 py-0.5 uppercase tracking-wider bg-yellow-950/40">
                      WELDING...
                    </span>
                  </motion.div>
                );
              }

              // Default state: Broken (leak) rendering ONLY the glowing warning exclamation red dots with tag ("只出现断裂和红点")
              return (
                <motion.div
                  key={`station-leak-${node.id}`}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute -ml-6 -mt-6 w-12 h-12 flex flex-col items-center justify-center cursor-pointer pointer-events-auto z-20"
                  onClick={() => onSelectNode(node.id)}
                  whileHover={{ scale: 1.25, zIndex: 30 }}
                  whileTap={{ scale: 0.9 }}
                  id={`floating-exclamation-${node.id}`}
                >
                  {/* Outer breathing ring */}
                  <div className="absolute w-12 h-12 rounded-full bg-red-600/30 border border-red-500/50 pulsing-leak-red-ring" />
                  
                  {/* Warning Exclamation Circle */}
                  <div className="w-8 h-8 rounded-full bg-red-600 border border-white/95 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,1)] z-10">
                    <span className="text-white font-mono font-black text-xl leading-none">!</span>
                  </div>

                  {/* High contrast micro tag to identify sector */}
                  <div className="absolute -bottom-4.5 bg-black border border-red-500/50 text-red-400 font-mono text-[8px] font-black px-1.5 py-0.5 rounded shadow-lg whitespace-nowrap leading-none">
                    ST-{index + 1}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>

      {/* 10. MOBILE FLOW LIST: Beautiful vertical vector-designed mapping for mobile compatibility - REDESIGNED FOR WHITE/GLASS THEME */}
      <div className="block md:hidden space-y-3" id="mobile-pipeline-map">
        
        {/* Inlet Valve source */}
        <div className="bg-sky-50 border border-sky-200 text-sky-800 rounded-xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-sky-550 bg-sky-500 rounded-full animate-ping shrink-0" />
            <span className="text-xs font-mono font-black text-sky-700">MAIN INLET PUMP</span>
          </div>
          <span className="text-[9px] font-mono border border-sky-100 px-2 py-0.5 rounded text-sky-650 font-bold bg-white">
            NOMINAL FLOW
          </span>
        </div>

        {/* Mobile tasks stack */}
        <div className="space-y-3 relative bg-slate-50/50 p-2.5 rounded-2xl border border-slate-200">
          {pipes.map((node, index) => {
            const isBroken = node.status === "broken";
            const isRepaired = node.status === "repaired";
            const isRusted = node.status === "rusted";
            const isActive = activeNodeId === node.id;

            const verb = VERBS[node.currentVerbId];
            const classifier = CLASSIFIERS[node.currentClassifierId];
            const noun = NOUNS[node.currentNounId];

            const isSegmentFlowing = segmentFlow[index + 1];

            return (
              <React.Fragment key={node.id}>
                {/* Visual interactive card */}
                <motion.div
                  whileTap={isRusted ? {} : { scale: 0.98 }}
                  onClick={() => {
                    if (!isRusted) {
                      onSelectNode(node.id);
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all relative overflow-hidden select-none cursor-pointer flex flex-col justify-between h-[115px] ${
                    isRusted
                      ? "bg-slate-100/75 border-slate-200 text-slate-400"
                      : isRepaired
                      ? "bg-white border-green-400 text-slate-800 shadow-[0_2px_8px_rgba(34,197,94,0.06)]"
                      : isActive
                      ? "bg-white border-yellow-400 text-slate-850 ring-2 ring-yellow-400/25 bg-yellow-50/20"
                      : "bg-white border-slate-200 text-slate-700 hover:border-sky-400 hover:shadow-sm shadow-sm"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] font-mono font-black tracking-widest px-2 py-0.5 rounded ${
                      isRusted
                        ? "bg-rose-50 text-rose-700 border border-rose-100"
                        : isRepaired
                        ? "bg-green-50 text-green-700 border border-green-100"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}>
                      STATION {index + 1}
                    </span>
                    <span className="text-[9px] font-mono text-slate-450 text-slate-400 font-bold uppercase">{node.name}</span>
                  </div>

                  {/* Core Match display or cracked pipe graphic with ONLY the red dot */}
                  <div className="my-1.5 text-center flex flex-col justify-center items-center h-[40px]">
                    {isRusted ? (
                      <span className="text-[9px] text-amber-700 bg-amber-50 border border-amber-250 px-2 py-0.5 rounded font-black font-mono">
                        RUST LOCKED
                      </span>
                    ) : isRepaired ? (
                      <div className="flex items-center gap-1.5 text-green-600 font-mono text-xs font-bold bg-green-50/50 px-3 py-1 rounded-full border border-green-250">
                        <span>✔️</span>
                        <span>{language === "cn" ? "修复正常" : "REPAIRED"}</span>
                      </div>
                    ) : (
                      /* Glowing Pulsing Red Warning Exclamation Mark "!" on mobile! */
                      <div className="w-full h-[40px] flex items-center justify-center relative">
                        <div className="absolute w-10 h-10 rounded-full bg-red-600/10 border border-red-500/20 pulsing-leak-red-ring" />
                        <motion.div 
                          animate={{ scale: [1, 1.12, 1] }}
                          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                          className="w-8 h-8 rounded-full bg-red-600 border border-white/80 flex items-center justify-center shadow-[0_0_12px_rgba(239,68,68,0.5)] z-10"
                        >
                          <span className="text-white font-mono font-black text-lg leading-none">!</span>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  <div className="border-t border-slate-100 pt-1 flex justify-between items-center text-[9px] text-slate-400">
                    <span>
                      {isRusted
                        ? "LOCKED"
                        : isRepaired
                        ? (language === "cn" ? "通道连通正常" : "PIPELINE FLOW SECURED")
                        : "BROKEN SECTOR"}
                    </span>
                    <span className="font-mono text-[8px] opacity-75">
                      {isRepaired ? (language === "cn" ? "运行中" : "NOMINAL") : "CLICK TO WELD"}
                    </span>
                  </div>
                </motion.div>

                {/* Vertical neon flow links */}
                {index < pipes.length - 1 && (
                  <div className="flex flex-col items-center justify-center -my-1.5 select-none pointer-events-none">
                    <div className="w-3.5 h-5 bg-slate-50 border-x border-slate-200 relative flex items-center justify-center">
                      <div className={`w-1 h-full rounded ${
                        isSegmentFlowing 
                          ? "bg-cyan-500 animate-pulse shadow-[0_0_6px_rgba(6,182,212,0.8)]" 
                          : "bg-slate-200"
                      }`} />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* outlet sump feedback */}
        <div className={`rounded-xl p-3 flex items-center justify-between border transition-all ${
          segmentFlow[pipes.length] 
            ? "bg-green-50 border-green-300 text-green-900 shadow-xs" 
            : "bg-slate-50 border-slate-200 text-slate-500"
        }`}>
          <div className="flex items-center gap-2">
            <ShowerHead size={14} className={segmentFlow[pipes.length] ? "text-green-600" : "text-slate-400"} />
            <span className="text-xs font-bold leading-none">{language === "cn" ? "净化池连通状态" : "OUTLET STATUS"}</span>
          </div>
          <span className={`text-[9px] font-mono font-extrabold px-2 py-0.5 rounded ${
            segmentFlow[pipes.length] ? "text-green-700 bg-white border border-green-200" : "text-slate-500 bg-white border border-slate-100"
          }`}>
            {segmentFlow[pipes.length] ? "STABLE" : "BLOCKED"}
          </span>
        </div>
      </div>

      {/* 11. DYNAMIC SYSTEM PRESSURE STATUS FOOTER BAR */}
      <div className="flex flex-row justify-between items-center bg-slate-900 text-slate-300 py-1.5 px-3 rounded-lg border border-slate-800 text-[9.5px] font-mono gap-2 relative z-10">
        <span className="flex items-center gap-2 font-bold select-none">
          <span className={`w-1.5 h-1.5 rounded-full ${segmentFlow[pipes.length] ? 'bg-green-400 animate-pulse' : 'bg-red-500 animate-pulse'}`} />
          <span className="flex items-center gap-1.5 text-slate-400">
            <span>{language === "cn" ? "系统压强状态：" : "Pressure:"}</span>
            <span className={segmentFlow[pipes.length] ? "text-green-400 font-extrabold" : "text-red-400 font-extrabold"}>
              {segmentFlow[pipes.length] ? "220 Pa (正常)" : "120 Pa (有遗漏)"}
            </span>
          </span>
        </span>

        <span className="text-slate-500 text-[9px] font-bold select-none">
          V2.5
        </span>
      </div>
    </div>
  );
};
