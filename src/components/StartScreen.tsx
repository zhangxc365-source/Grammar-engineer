/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { LanguageCode, GameLevel } from "../types";
import { UI_TEXTS } from "../data";
import { Wrench, Trophy, HelpCircle, ArrowRight, Cog, ArrowLeft, Shield } from "lucide-react";
import { motion } from "motion/react";

interface StartScreenProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  onSelectLevel: (level: GameLevel) => void;
  onSelectPKMode: (level: GameLevel) => void;
  onShowInstructions: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  language,
  onLanguageChange,
  onSelectLevel,
  onSelectPKMode,
  onShowInstructions
}) => {
  // Navigation internal state: null (mode select), "solo" (selecting YCT level for solo), "pk" (selecting YCT level for PK)
  const [activeModeSelection, setActiveModeSelection] = useState<"solo" | "pk" | null>(null);
  
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  // Render level selector screen
  if (activeModeSelection !== null) {
    const isSolo = activeModeSelection === "solo";
    
    const levelsInfo: { id: GameLevel; label: string; desc: string; colorClass: string }[] = [
      { id: "YCT2", label: "YCT 2", desc: language === "cn" ? "6道题 • 入门" : "6 Tasks • Basic", colorClass: "bg-emerald-50 hover:bg-emerald-100/75 text-emerald-800 hover:text-emerald-950 border-emerald-250 hover:border-emerald-400" },
      { id: "YCT3", label: "YCT 3", desc: language === "cn" ? "6道题 • 基础" : "6 Tasks • Elementary", colorClass: "bg-sky-50 hover:bg-sky-100/75 text-sky-800 hover:text-sky-950 border-sky-250 hover:border-sky-400" },
      { id: "YCT4", label: "YCT 4", desc: language === "cn" ? "6道题 • 进阶" : "6 Tasks • Intermediate", colorClass: "bg-indigo-50 hover:bg-indigo-100/75 text-indigo-800 hover:text-indigo-950 border-indigo-250 hover:border-indigo-400" },
      { id: "YCT5", label: "YCT 5", desc: language === "cn" ? "🔥 10道题 • 高级" : "🔥 10 Tasks • Advanced", colorClass: "bg-violet-50 hover:bg-violet-100/80 text-violet-800 hover:text-violet-950 border-violet-300 hover:border-violet-500 ring-2 ring-violet-500/10" },
      { id: "YCT6", label: "YCT 6", desc: language === "cn" ? "🔥 10道题 • 精通" : "🔥 10 Tasks • Mastery", colorClass: "bg-rose-50 hover:bg-rose-100/80 text-rose-800 hover:text-rose-950 border-rose-300 hover:border-rose-500 ring-2 ring-rose-500/10" }
    ];

    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh] py-12 px-6 relative overflow-hidden" id="yct-level-selection-view">
        {/* Subtle decorative background detail */}
        <div className="absolute inset-0 pointer-events-none select-none opacity-5 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />
        
        {/* Decorative Rotating Mechanical Gears Background */}
        <div className="absolute top-10 left-10 text-slate-300 opacity-10 pointer-events-none animate-spin" style={{ animationDuration: "25s" }}>
          <Cog size={160} />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white border-3 border-slate-250 rounded-[40px] p-10 sm:p-16 md:p-20 shadow-2xl max-w-[97vw] xl:max-w-[1550px] w-full relative z-10 overflow-hidden"
          id="yct-level-selection-card"
        >
          {/* Top Back Action */}
          <div className="flex items-center justify-between mb-12 border-b border-slate-100 pb-6">
            <button
              id="btn-level-back-to-modes"
              type="button"
              onClick={() => setActiveModeSelection(null)}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>BACK</span>
            </button>
            <div className="text-[10px] text-slate-400 font-mono tracking-widest uppercase font-bold">
              LEVEL_SELECTOR_BAY
            </div>
          </div>

          {/* Heading */}
          <div className="mb-12 text-center sm:text-left">
            <span className="text-xs uppercase font-bold tracking-widest text-sky-600 bg-sky-50 px-4 py-2 rounded-full border border-sky-100 inline-block mb-4 shadow-sm">
              🎯 {isSolo ? (language === "cn" ? "单人模式" : "Single Player Mode") : (language === "cn" ? "双人对决" : "Versus PK Mode")}
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight" id="lbl-yct-select-title">
              {language === "cn" ? "选择 YCT 等级开始" : "Select Your YCT Level"}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-2">
              {language === "cn" ? "请点击以下任意一个关卡等级，进入管道修复车间。" : "Please click any of the levels below to enter the pipeline correction workshop."}
            </p>
          </div>

          {/* YCT 2-6 Buttons Grid - with beautiful extra padding, larger labels and subtitles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6 my-8" id="yct-level-grid">
            {levelsInfo.map((l, index) => (
              <motion.button
                id={`btn-yct-level-${l.id}`}
                key={l.id}
                type="button"
                whileHover={{ scale: 1.05, y: -6, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                onClick={() => {
                  if (isSolo) {
                    onSelectLevel(l.id);
                  } else {
                    onSelectPKMode(l.id);
                  }
                }}
                className={`p-10 border-2 rounded-3xl shadow-sm flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[160px] h-full font-sans tracking-tight ${l.colorClass}`}
              >
                <span className="text-4xl font-black mb-2 selection:bg-transparent tracking-tighter">
                  {l.label}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  const modeTexts = {
    solo: { cn: "单人模式", en: "SOLO", mn: "ГАНЦААРЧИЛСАН" },
    pk: { cn: "PK模式", en: "VERSUS PK", mn: "ХОЁР ТОГЛОГЧ" },
    instructions: { cn: "游戏说明", en: "INSTRUCTIONS", mn: "ТОГЛОХ ЗААВАР" }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] py-10 px-4 relative overflow-hidden" id="start-screen-container">
      
      {/* 🔮 START SCREEN RICH METALLIC & BLUEPRINT DECORATIONS 🔮 */}
      {/* 1. Base Slate Blueprint Grid */}
      <div className="absolute inset-0 pointer-events-none select-none opacity-[0.06] bg-[radial-gradient(#1e293b_1.5px,transparent_1.5px)] [background-size:24px_24px] z-0" />
      
      {/* 2. Soft Glowing Color Orbs blending smoothly */}
      <div className="absolute top-[10%] left-[15%] w-80 h-80 rounded-full bg-cyan-300/10 blur-[80px] pointer-events-none select-none z-0" />
      <div className="absolute bottom-[10%] right-[15%] w-96 h-96 rounded-full bg-indigo-300/10 blur-[100px] pointer-events-none select-none z-0" />

      {/* 3. Tech Accent Border Frame */}
      <div className="absolute top-6 left-6 right-6 bottom-6 border border-slate-200/40 rounded-[32px] pointer-events-none select-none z-0 hidden lg:block" />

      {/* 4. Little mechanical structural details & hardware brackets */}
      <div className="absolute top-8 left-8 text-slate-300/60 font-mono text-[9px] uppercase tracking-widest pointer-events-none select-none z-0 hidden lg:block">
        [ SYSTEM_BOOT_OK // PORT_3000 ]
      </div>
      <div className="absolute bottom-8 right-8 text-slate-300/60 font-mono text-[9px] uppercase tracking-widest pointer-events-none select-none z-0 hidden lg:block">
        [ SYNTAX_ENGINE_v2.0 ]
      </div>

      {/* 5. Gilded circuitry linkage illustration left/right */}
      <div className="absolute left-10 top-1/3 w-32 h-44 border-l border-b border-dashed border-slate-300/50 rounded-bl-3xl pointer-events-none select-none hidden xl:block">
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 rounded-full bg-cyan-500/40 translate-x-[-5px] translate-y-[5px]" />
      </div>
      <div className="absolute right-10 bottom-1/3 w-32 h-44 border-r border-t border-dashed border-slate-300/50 rounded-tr-3xl pointer-events-none select-none hidden xl:block">
        <div className="absolute top-0 right-0 w-2.5 h-2.5 rounded-full bg-indigo-500/40 translate-x-[5px] translate-y-[-5px]" />
      </div>

      {/* 6. Engineer Theme Floating Decorations (Wrenches & Gears for workshop atmosphere) */}
      {/* Top Left Wrench & Cog Duo - High visibility with subtle color branding */}
      <div className="absolute top-[8%] left-[4%] text-sky-500/25 pointer-events-none select-none z-0 hidden sm:block animate-pulse" style={{ animationDuration: "3.5s" }}>
        <Wrench size={60} className="transform rotate-[15deg] filter drop-shadow-sm" />
      </div>
      <div className="absolute top-[14%] left-[9%] text-indigo-500/20 pointer-events-none select-none z-0 hidden md:block animate-spin" style={{ animationDuration: "16s" }}>
        <Cog size={48} />
      </div>

      {/* Top Right Interlocking Gear Group - Vivid and larger */}
      <div className="absolute top-[10%] right-[4%] text-indigo-600/25 pointer-events-none select-none z-0 hidden sm:block animate-spin" style={{ animationDuration: "22s" }}>
        <Cog size={80} className="filter drop-shadow-md" />
      </div>
      <div className="absolute top-[16%] right-[10%] text-sky-400/30 pointer-events-none select-none z-0 hidden md:block animate-spin" style={{ animationDuration: "14s", animationDirection: "reverse" }}>
        <Cog size={52} />
      </div>
      <div className="absolute top-[23%] right-[5%] text-slate-400/25 pointer-events-none select-none z-0 hidden lg:block animate-pulse" style={{ animationDuration: "4s" }}>
        <Wrench size={44} className="transform rotate-[-60deg]" />
      </div>

      {/* Mid Left Area Floating Gears */}
      <div className="absolute top-[42%] left-[2%] text-emerald-500/20 pointer-events-none select-none z-0 hidden lg:block animate-spin" style={{ animationDuration: "28s" }}>
        <Cog size={56} />
      </div>
      <div className="absolute top-[48%] left-[7%] text-teal-600/20 pointer-events-none select-none z-0 hidden xl:block animate-pulse" style={{ animationDuration: "5s" }}>
        <Wrench size={38} className="transform rotate-[75deg]" />
      </div>

      {/* Mid Right Area Floating Gears */}
      <div className="absolute top-[45%] right-[2%] text-amber-500/20 pointer-events-none select-none z-0 hidden lg:block animate-pulse" style={{ animationDuration: "6s" }}>
        <Wrench size={42} className="transform rotate-[-15deg]" />
      </div>
      <div className="absolute top-[52%] right-[7%] text-indigo-500/25 pointer-events-none select-none z-0 hidden xl:block animate-spin" style={{ animationDuration: "18s" }}>
        <Cog size={46} />
      </div>

      {/* Bottom Left Big Rotating Mechanical Gear Set */}
      <div className="absolute bottom-[10%] left-[4%] text-slate-400/30 pointer-events-none select-none z-0 hidden sm:block animate-spin" style={{ animationDuration: "40s" }}>
        <Cog size={74} className="filter drop-shadow-sm" />
      </div>
      <div className="absolute bottom-[16%] left-[9%] text-sky-500/25 pointer-events-none select-none z-0 hidden md:block animate-pulse" style={{ animationDuration: "4.5s" }}>
        <Wrench size={46} className="transform rotate-[110deg]" />
      </div>

      {/* Bottom Right Floating Wrench and Gear Trio */}
      <div className="absolute bottom-[8%] right-[4%] text-indigo-600/30 pointer-events-none select-none z-0 hidden sm:block">
        <Wrench size={56} className="transform -rotate-[45deg] filter drop-shadow-sm animate-pulse" style={{ animationDuration: "5.5s" }} />
      </div>
      <div className="absolute bottom-[14%] right-[10%] text-emerald-500/25 pointer-events-none select-none z-0 hidden md:block animate-spin" style={{ animationDuration: "24s" }}>
        <Cog size={40} />
      </div>
      <div className="absolute bottom-[6%] right-[14%] text-slate-405/20 pointer-events-none select-none z-0 hidden lg:block animate-spin" style={{ animationDuration: "10s", animationDirection: "reverse" }}>
        <Cog size={30} />
      </div>

      {/* Subtle Mobile Corners Mechanical Touches - More obvious on top and bottom sides */}
      <div className="absolute top-4 right-4 text-sky-500/35 pointer-events-none select-none z-0 sm:hidden animate-spin" style={{ animationDuration: "12s" }}>
        <Cog size={32} />
      </div>
      <div className="absolute top-[18%] right-2 text-indigo-500/25 pointer-events-none select-none z-0 sm:hidden">
        <Wrench size={26} className="transform rotate-[35deg]" />
      </div>
      <div className="absolute bottom-4 left-4 text-amber-500/30 pointer-events-none select-none z-0 sm:hidden">
        <Wrench size={28} className="transform rotate-[15deg] animate-pulse" style={{ animationDuration: "3s" }} />
      </div>
      <div className="absolute bottom-[18%] left-2 text-sky-500/25 pointer-events-none select-none z-0 sm:hidden animate-spin" style={{ animationDuration: "10s", animationDirection: "reverse" }}>
        <Cog size={28} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mb-12 relative z-10"
        id="title-block"
      >
        {/* Modern styled tag */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200/80 rounded-full text-[10px] font-black font-mono text-indigo-600 uppercase tracking-wider shadow-sm mb-4">
          <Wrench size={10} className="text-indigo-500 animate-pulse" />
          YCT汉语金牌量词系统
        </div>

        {/* Massive Styled Core Header representing logical pipelines */}
        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-slate-900 mb-1 animate-pulse" id="main-title" style={{ animationDuration: "5s" }}>
          <span className="bg-gradient-to-r from-cyan-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
            语法工程师
          </span>
        </h1>
        <p className="text-4xl sm:text-5xl font-black text-slate-500 tracking-widest uppercase font-sans select-none mb-6">
          Grammar Engineer
        </p>

        {/* English, Mongolian, Chinese buttons to switch language mode */}
        <div className="flex justify-center items-center gap-1.5 bg-white/80 p-1.5 rounded-2xl border border-slate-200 shadow-sm max-w-[280px] mx-auto select-none">
          <button
            type="button"
            onClick={() => onLanguageChange("en")}
            className={`flex-1 px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              language === "en"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            English
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("mn")}
            className={`flex-1 px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              language === "mn"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            Монгол
          </button>
          <button
            type="button"
            onClick={() => onLanguageChange("cn")}
            className={`flex-1 px-3 py-1.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
              language === "cn"
                ? "bg-slate-900 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            中文
          </button>
        </div>
      </motion.div>

      {/* Main Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[97vw] xl:max-w-[1200px] w-full relative z-10 px-4" id="options-grid">
        
        {/* 1. SINGLE PLAYER MODE CARD */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => setActiveModeSelection("solo")}
          className="bg-white border-2 border-slate-200 hover:border-sky-500 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all relative overflow-hidden cursor-pointer group flex flex-col items-center justify-center min-h-[180px] gap-4"
          id="btn-single-player-mode"
        >
          <div className="bg-sky-100 text-sky-600 p-5 rounded-2xl group-hover:bg-sky-500 group-hover:text-white transition-all shadow-inner shrink-0">
            <Wrench size={40} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-sky-700 transition" id="lbl-single-player">
            {modeTexts.solo[language]}
          </h3>
        </motion.div>

        {/* 2. TWO PLAYER VS MODE CARD */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={() => setActiveModeSelection("pk")}
          className="bg-white border-2 border-slate-200 hover:border-orange-500 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all relative overflow-hidden cursor-pointer group flex flex-col items-center justify-center min-h-[180px] gap-4"
          id="btn-pk-mode"
        >
          <div className="bg-orange-100 text-orange-600 p-5 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-all shadow-inner shrink-0">
            <Trophy size={40} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-orange-700 transition" id="lbl-pk">
            {modeTexts.pk[language]}
          </h3>
        </motion.div>

        {/* 3. GAME INSTRUCTIONS CARD */}
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={onShowInstructions}
          className="bg-white border-2 border-slate-200 hover:border-slate-500 rounded-3xl p-8 shadow-md hover:shadow-lg transition-all relative overflow-hidden cursor-pointer group flex flex-col items-center justify-center min-h-[180px] gap-4"
          id="btn-show-game-rules"
        >
          <div className="bg-slate-100 text-slate-600 p-5 rounded-2xl group-hover:bg-slate-700 group-hover:text-white transition-all shadow-inner shrink-0">
            <HelpCircle size={40} />
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 group-hover:text-slate-700 transition" id="lbl-instructions">
            {modeTexts.instructions[language]}
          </h3>
        </motion.div>

      </div>
    </div>
  );
};
