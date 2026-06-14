/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LanguageCode } from "../types";
import { UI_TEXTS } from "../data";
import { ArrowLeft, Home, Trophy, Trash2, ShieldAlert, Sparkles, AlertTriangle, Clock } from "lucide-react";
import { LanguageSelector } from "./LanguageSelector";

interface GameHeaderProps {
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  levelLabel: string; // e.g. Novice, Expert, PK mode
  score: number;
  rustIndex: number;
  completedTasksCount: number;
  totalTasksCount: number;
  timeLeft?: number;
  onExit: () => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
  language,
  onLanguageChange,
  levelLabel,
  score,
  rustIndex,
  completedTasksCount,
  totalTasksCount,
  timeLeft = 180,
  onExit
}) => {
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  // Calculate percentage
  const progressPercent = Math.min(
    100,
    Math.round((completedTasksCount / (totalTasksCount || 1)) * 100)
  );

  return (
    <div
      className="bg-slate-800 text-white rounded-2xl border-4 border-slate-600 shadow-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 select-none relative overflow-hidden"
      id="game-header-dashboard"
    >
      {/* Decorative Brand Accent Line */}
      <div className="absolute inset-x-0 top-0 h-1 bg-yellow-400" />
 
      {/* Left Column: Actions & Level badge and Return to Home */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full md:w-auto">
        <div className="flex flex-col items-center bg-slate-900 px-4 py-1.5 rounded-lg border border-slate-700 justify-center">
          <span className="text-base sm:text-lg md:text-xl font-black tracking-wider text-white select-none whitespace-nowrap">
            语法工程师
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-400 select-none tracking-wide">
            Grammar Engineer
          </span>
        </div>
        
        {/* Level Banner */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-mono font-black uppercase text-yellow-400 shadow-inner">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
          <span>{levelLabel}</span>
        </div>

        {/* Back to Home action directly to the right of YCT Level badge */}
        <button
          id="btn-header-home"
          type="button"
          onClick={onExit}
          className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 hover:text-white text-slate-150 font-extrabold px-3 py-1.5 rounded-lg border border-slate-600 transition-all cursor-pointer text-xs select-none"
        >
          <Home size={12} className="text-yellow-400" />
          <span>HOME</span>
        </button>
      </div>
 
      {/* Mid Column: Progress Indicators (without the Home button anymore) */}
      <div className="flex-1 flex flex-col gap-1 max-w-sm w-full mx-auto md:mx-0">
        <div className="flex justify-between items-center text-xs font-bold text-slate-300">
          <span>{getUI("progress")}</span>
          <span className="font-mono text-yellow-400">
            {completedTasksCount} / {totalTasksCount} ({progressPercent}%)
          </span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-2.5 border border-slate-705 relative overflow-hidden p-0.5">
          <div
            id="header-progress-indicator-bar"
            style={{ width: `${progressPercent}%` }}
            className="h-full bg-gradient-to-r from-yellow-500 to-green-500 rounded-full transition-all duration-500 relative"
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 bg-white/20 h-0.5" />
          </div>
        </div>
      </div>
 
      {/* Right Column: Key Stats & Languages */}
      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 w-full md:w-auto">
        
        {/* Timer Card */}
        <div className="bg-slate-900 border border-slate-700 py-1.5 px-3.5 rounded-xl flex items-center gap-2 shadow-inner">
          <Clock size={16} className="text-yellow-400 animate-pulse" />
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold leading-none font-mono">
              TIME LEFT
            </span>
            <span className="font-mono font-black text-rose-400 text-sm leading-none" id="val-header-timer">
              {timeLeft}s
            </span>
          </div>
        </div>

        {/* Score Card */}
        <div className="bg-slate-900 border border-slate-700 py-1.5 px-3.5 rounded-xl flex items-center gap-2 shadow-inner">
          <Trophy size={16} className="text-yellow-400" />
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold leading-none font-mono">
              {getUI("score") || "REPAIR SCORE"}
            </span>
            <span className="font-mono font-black text-green-400 text-sm leading-none" id="val-header-score">
              {score} XP
            </span>
          </div>
        </div>
 
        {/* Rust index counter */}
        <div className="bg-slate-900 border border-slate-700 py-1.5 px-3.5 rounded-xl flex items-center gap-2 shadow-inner">
          <AlertTriangle size={16} className={rustIndex > 0 ? "text-orange-400 animate-bounce" : "text-slate-400"} />
          <div>
            <span className="text-[9px] text-slate-400 uppercase block font-bold leading-none font-mono">
              {getUI("rustMeter") || "RUST INDEX"}
            </span>
            <span className="font-mono font-black text-orange-400 text-sm leading-none" id="val-header-rust">
              {rustIndex}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
