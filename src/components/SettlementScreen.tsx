/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LanguageCode, PipeNode, GameLevel } from "../types";
import { UI_TEXTS, VERBS, CLASSIFIERS, NOUNS, verifyCollocation, getChPinyin } from "../data";
import { Trophy, RefreshCw, Home, ClipboardList, ShieldCheck, HeartCrack, ChevronRight } from "lucide-react";
import { motion } from "motion/react";

interface SettlementScreenProps {
  language: LanguageCode;
  level: GameLevel;
  score: number;
  rustCount: number;
  pipes: PipeNode[];
  onRestart: () => void;
  onBackToHome: () => void;
}

export const SettlementScreen: React.FC<SettlementScreenProps> = ({
  language,
  level,
  score,
  rustCount,
  pipes,
  onRestart,
  onBackToHome
}) => {
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  // Determine Letter Grade (A to C) based on mistakes/rust locks
  let grade: "A" | "B" | "C" = "A";
  let gradeColor = "text-emerald-500 border-emerald-300 bg-emerald-50";
  let gradeSub = {
    cn: "黄金级工业守护者！零误差通关！",
    en: "Master Class! Perfect zero-rust operation!",
    mn: "Гайхамшигтай! Алдаагүй дуусгалаа!"
  };

  if (rustCount > 0 && rustCount <= 2) {
    grade = "B";
    gradeColor = "text-indigo-500 border-indigo-300 bg-indigo-50";
    gradeSub = {
      cn: "白银级修理工。偶有小摩擦，但管道最终安全畅通！",
      en: "Skilled technician. Minor rust, overall solid repair!",
      mn: "Сайн байна. Бага зэрэг зэвэрсэн ч амжилттай дуусгалаа!"
    };
  } else if (rustCount > 2) {
    grade = "C";
    gradeColor = "text-amber-600 border-amber-300 bg-amber-50";
    gradeSub = {
      cn: "普通工匠。漏检明显，需勤踩水带多加练习！",
      en: "Apprentice engineer. High leakage risk, suggest another run!",
      mn: "Дахин сайн давтах шаардлагатай!"
    };
  }

  return (
    <div className="max-w-[80vw] xl:max-w-[1240px] w-[80%] h-[78vh] mx-auto py-3 px-4 bg-white/95 backdrop-blur-md border border-slate-250/80 rounded-3xl shadow-xl flex flex-col gap-2.5 my-[4vh] overflow-hidden" id="settlement-container">
      
      {/* Top Banner Celebration Card - HIGHLY COMPACT & STICKY - Magnified by another 0.5x footprint (total 2x scale) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-50/60 rounded-[28px] border border-slate-200/60 shadow-md p-6 sm:p-8 text-center relative overflow-hidden shrink-0 max-h-[35vh] flex flex-col justify-center"
      >
        {/* Confetti-style decorative bubble */}
        <div className="absolute top-0 right-0 bg-emerald-500/10 w-28 h-28 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 bg-sky-500/10 w-32 h-32 rounded-full blur-2xl pointer-events-none" />

        {/* Big Visual Grade Emblem, Header and scoreboard metrics side-by-side horizontally */}
        <div className="flex flex-col sm:flex-row items-center justify-between sm:justify-around gap-6 w-full max-w-6xl mx-auto py-2">
          
          <div className="flex items-center gap-4">
            {/* Conditional decorative bounce icon (only shown on md screens or wider) */}
            <div className="hidden md:inline-block bg-emerald-100 p-3.5 rounded-full border border-emerald-300 text-emerald-600 shadow-sm animate-bounce">
              <Trophy size={40} />
            </div>

            <div className="text-left">
              <h2 className="text-3.5xl sm:text-4.5xl font-black text-slate-800 tracking-tight leading-none" id="lbl-settlement-congrat">
                {getUI("levelCleared")}
              </h2>
              <p className="text-slate-500 font-mono text-xs sm:text-[13px] uppercase tracking-wider leading-none mt-2.5">
                INSPECTION CERTIFIED • YCT {level.replace("YCT", "")}
              </p>
            </div>
          </div>

          {/* Grade Shield circle & rank text */}
          <div className="flex items-center gap-5">
            <div className={`w-[76px] h-[76px] rounded-2xl border-2 text-3xl sm:text-4xl font-black flex items-center justify-center shadow-md transform rotate-1 ${gradeColor} shrink-0 font-sans`}>
              {grade}
            </div>

            <div className="text-left select-none max-w-[285px]">
              <span className="text-xs sm:text-[13px] text-slate-500 uppercase font-mono tracking-wider font-bold block leading-none">
                {getUI("clearRank")}
              </span>
              <p className="text-xl sm:text-2xl font-black text-slate-800 leading-none mt-2.5">
                {grade === "A" ? (
                  <span>{language === "cn" ? "卓越大工学者" : "Grandmaster"}</span>
                ) : grade === "B" ? (
                  <span>{language === "cn" ? "资深中级工匠" : "Professional"}</span>
                ) : (
                  <span>{language === "cn" ? "初级见习助理" : "Junior Apprentice"}</span>
                )}
              </p>
              <p className="text-sm text-slate-500 line-clamp-1 leading-none mt-2">
                {gradeSub[language]}
              </p>
            </div>
          </div>

          {/* Scoreboard metrics - HORIZONTAL PARALLEL LAYOUT */}
          <div className="grid grid-cols-3 gap-4.5 bg-slate-50/80 p-4.5 rounded-2xl border border-slate-150 min-w-[380px] sm:min-w-[450px]">
            <div className="text-center px-1.5">
              <span className="text-xs text-slate-500 block font-bold leading-none uppercase">{getUI("totalScore")}</span>
              <span className="text-lg sm:text-2xl font-mono font-black text-slate-800 mt-2 block leading-none" id="val-rep-final-score">
                {score} XP
              </span>
            </div>
            <div className="border-x border-slate-200 text-center px-1.5">
              <span className="text-xs text-slate-500 block font-bold leading-none uppercase">
                {language === "cn" ? "接通水管" : "Cleared Nodes"}
              </span>
              <span className="text-lg sm:text-2xl font-mono font-black text-emerald-600 mt-2 block leading-none">
                {pipes.filter(p => p.status === "repaired").length}/{pipes.length}
              </span>
            </div>
            <div className="text-center px-1.5">
              <span className="text-xs text-slate-500 block font-bold leading-none uppercase">
                {language === "cn" ? "漏失生锈" : "Rusted locks"}
              </span>
              <span className="text-lg sm:text-2xl font-mono font-black text-amber-600 mt-2 block leading-none" id="val-rep-rustcount">
                {rustCount}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Visual explicit boundary divider line */}
      <div className="h-px w-full bg-slate-150 shrink-0" />

      {/* The requested review table of Grammar pairs (Collocation对照Review表) - COMPRESSED FOR COHESIVE LAYOUT */}
      <div className="bg-slate-50/30 rounded-xl border border-slate-200/50 shadow-sm p-3 flex-1 flex flex-col min-h-0" id="collocation-review-table-container">
        
        {/* Table Title and Helper */}
        <div className="flex items-center gap-2 mb-1.5 border-b border-slate-100 pb-1 shrink-0">
          <div className="bg-sky-100 text-sky-700 p-0.5 rounded-md">
            <ClipboardList size={14} />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-black text-slate-800 tracking-tight" id="lbl-review-table-title">
              {getUI("reviewTableTitle")}
            </h3>
            <p className="text-[10px] text-slate-400 leading-none">
              {language === "cn" ? "对比分析：掌握“动词-属性约束”和“量词搭配规律”" : "Analysis of semantic attribute bounds & measure classifiers"}
            </p>
          </div>
        </div>

        {/* Responsive Grid/List representation of the review collocations with scrollbar */}
        <div className="space-y-1.5 flex-1 overflow-y-auto pr-1.5 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent" id="review-table-body">
          {pipes.map((pipe, index) => {
            const correctVerb = VERBS[pipe.correctVerbId];
            const correctClassifier = CLASSIFIERS[pipe.correctClassifierId];
            const correctNoun = NOUNS[pipe.correctNounId];
            const isCorrect = pipe.attempts === 0;

            return (
              <div
                key={pipe.id}
                className={`p-1.5 px-3 rounded-lg border flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 transition-all ${
                  isCorrect
                    ? "bg-green-50/20 border-green-150 hover:bg-green-50/40"
                    : "bg-rose-50/10 border-rose-100 hover:bg-rose-50/20"
                }`}
                id={`grid-row-pair-${pipe.id}`}
              >
                {/* Visual correct collocation layout */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2.5">
                  <span className="text-[8px] font-bold px-1 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-500 uppercase tracking-wider font-mono self-start sm:self-auto shrink-0">
                    STATION {index + 1}
                  </span>

                  {/* Character formulas with LARGER Chinese font sizes (changed from text-base to text-xl sm:text-2xl) */}
                  <div className="flex items-center gap-2.5 font-sans select-none">
                    {/* Verb */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] sm:text-xs font-mono text-slate-500 font-bold leading-none mb-0.5">
                        {correctVerb ? getChPinyin(correctVerb.char) : ""}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight">
                        {correctVerb?.char || ""}
                      </span>
                    </div>

                    <span className="text-slate-400 font-bold text-xs self-end pb-0.5">+</span>

                    {/* Classifier */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] sm:text-xs font-mono text-violet-700 font-black leading-none mb-0.5">
                        {correctClassifier ? getChPinyin(correctClassifier.char) : ""}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-violet-600 bg-violet-50 px-2 py-0.5 rounded-lg border border-violet-150 shadow-sm">
                        {correctClassifier?.char || ""}
                      </span>
                    </div>

                    <span className="text-slate-400 font-bold text-xs self-end pb-0.5">+</span>

                    {/* Noun */}
                    <div className="flex flex-col items-center">
                      <span className="text-[10px] sm:text-xs font-mono text-emerald-700 font-black leading-none mb-0.5">
                        {correctNoun ? getChPinyin(correctNoun.char) : ""}
                      </span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                        {correctNoun?.char || ""}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-medium ml-1.5 self-end pb-0.5">
                      ({correctNoun?.translations?.[language] || correctNoun?.translations?.en})
                    </span>
                  </div>
                </div>

                {/* Score / Accuracy Indicator */}
                <div className="shrink-0 flex items-center">
                  {isCorrect ? (
                    <div className="flex items-center gap-1 bg-green-100 text-green-800 border border-green-200 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                      <ShieldCheck size={10} className="text-green-600" />
                      <span>{language === "cn" ? "答对 ✓" : "CORRECT ✓"}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 bg-rose-100 text-rose-800 border border-rose-200 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider font-mono">
                      <HeartCrack size={10} className="text-rose-600" />
                      <span>{language === "cn" ? "答错 ✗" : "INCORRECT ✗"}</span>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Footer controls */}
        <div className="flex flex-row justify-end items-center gap-3 mt-3 pt-3 border-t border-slate-100 shrink-0">
          <button
            id="btn-settle-home"
            type="button"
            onClick={onBackToHome}
            className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-bold transition text-xs cursor-pointer"
          >
            <Home size={14} />
            <span>HOME</span>
          </button>

          <button
            id="btn-settle-restart"
            type="button"
            onClick={onRestart}
            className="flex items-center justify-center gap-1.5 px-6 py-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-black rounded-xl hover:shadow-md active:translate-y-px transition text-xs cursor-pointer"
          >
            <RefreshCw size={12} className="animate-spin" style={{ animationDuration: "3.5s" }} />
            <span>TRY AGAIN</span>
          </button>
        </div>

      </div>

    </div>
  );
};
