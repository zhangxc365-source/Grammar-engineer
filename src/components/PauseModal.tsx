/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Play, RotateCcw, Home, X } from "lucide-react";
import { motion } from "motion/react";
import { LanguageCode } from "../types";

interface PauseModalProps {
  language: LanguageCode;
  onClose: () => void;
  onRestart: () => void;
  onExit: () => void;
}

export const PauseModal: React.FC<PauseModalProps> = ({
  language,
  onClose,
  onRestart,
  onExit,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="bg-white rounded-3xl border-4 border-slate-700 shadow-2xl p-6 sm:p-8 max-w-sm w-full relative"
      >
        {/* Header decoration */}
        <div className="absolute inset-x-0 top-0 h-1.5 bg-sky-500 rounded-t-2xl" />

        {/* Close icon top-right */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg transition hover:bg-slate-100 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Content Title */}
        <div className="text-center mb-6 mt-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight flex items-center justify-center gap-2">
            <span className="flex flex-col items-center">
              <span className="text-sm text-slate-400 font-bold select-none font-mono">
                PAUSED • 暂停
              </span>
              <span className="text-slate-500 text-[10px] select-none">
                (zàn tíng)
              </span>
            </span>
          </h3>
        </div>

        {/* Buttons List */}
        <div className="space-y-3">
          {/* 1. Continue game (继续游戏 - jì xù yóu xì) */}
          <button
            type="button"
            onClick={onClose}
            className="w-full flex items-center justify-between p-4 bg-emerald-50 hover:bg-emerald-100 border-2 border-emerald-200 hover:border-emerald-400 rounded-xl transition cursor-pointer text-slate-800 font-bold group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-emerald-500 text-white rounded-lg group-hover:scale-105 transition-all">
                <Play size={18} fill="white" />
              </div>
              <div className="text-left">
                <div className="text-base font-black text-emerald-850">RESUME</div>
                <div className="text-xs text-emerald-600 font-mono font-bold leading-none mt-0.5">jì xù yóu xì • 继续游戏</div>
              </div>
            </div>
          </button>
 
          {/* 2. Restart game (重新开始 - chóng xīn kāi shǐ) */}
          <button
            type="button"
            onClick={onRestart}
            className="w-full flex items-center justify-between p-4 bg-sky-50 hover:bg-sky-100 border-2 border-sky-200 hover:border-sky-400 rounded-xl transition cursor-pointer text-slate-800 font-bold group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-sky-500 text-white rounded-lg group-hover:rotate-45 transition-all">
                <RotateCcw size={18} />
              </div>
              <div className="text-left">
                <div className="text-base font-black text-sky-850">RESTART</div>
                <div className="text-xs text-sky-605 font-mono font-bold leading-none mt-0.5">chóng xīn kāi shǐ • 重新开始</div>
              </div>
            </div>
          </button>
 
          {/* 3. Return to home (返回主页 - fǎn huí zhǔ yè) */}
          <button
            type="button"
            onClick={onExit}
            className="w-full flex items-center justify-between p-4 bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 hover:border-slate-400 rounded-xl transition cursor-pointer text-slate-850 font-bold group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 bg-slate-600 text-white rounded-lg">
                <Home size={18} />
              </div>
              <div className="text-left">
                <div className="text-base font-black text-slate-800">QUIT TO HOME</div>
                <div className="text-xs text-slate-550 font-mono font-bold leading-none mt-0.5">fǎn huí zhǔ yè • 返回主页</div>
              </div>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
