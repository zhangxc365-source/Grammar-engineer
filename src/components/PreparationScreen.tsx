/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LanguageCode, PipeNode, GameLevel } from "../types";
import { UI_TEXTS, VERBS, CLASSIFIERS, NOUNS, getChPinyin, getPrototypeTranslation } from "../data";
import { AlertCircle, Play, Ban, ShieldAlert, ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

interface PreparationScreenProps {
  language: LanguageCode;
  level: GameLevel;
  tasks: PipeNode[];
  onStartGame: () => void;
  onBack: () => void;
}

export const PreparationScreen: React.FC<PreparationScreenProps> = ({
  language,
  level,
  tasks,
  onStartGame,
  onBack
}) => {
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  return (
    <div className="max-w-[97vw] xl:max-w-[1650px] mx-auto py-10 px-4 sm:px-6" id="preparation-screen-main">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-[32px] border-3 border-slate-200 shadow-2xl p-8 sm:p-12 relative overflow-hidden"
      >
        {/* Level badge label */}
        <div className="inline-block bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wide uppercase mb-4 shadow-sm">
          ⚠️ YCT LEVEL {level.replace("YCT", "")}
        </div>

        <h2 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight" id="prep-title">
          {language === "cn" ? "本轮量词正确搭配准备" : "Target Chinese Classifiers for This Round"}
        </h2>
        
        <p className="text-slate-500 text-xs mt-1" id="prep-desc">
          {language === "cn" ? "请在进入本关前，仔细阅读并掌握以下量词正确搭配。" : "Review and memorize the following correct collocations before committing to the pipeline station."}
        </p>

        {/* Correct Pipeline target combinations: 3 rows (6 items) or 5 rows (10 items), 2 columns on medium screens and up */}
        <div className={`my-6 grid grid-cols-1 ${tasks.length === 10 ? "md:grid-cols-2 lg:grid-cols-2" : "md:grid-cols-2"} gap-4 lg:gap-5`} id="broken-pipelines-list">
          {tasks.map((task, index) => {
            const correctVerb = VERBS[task.correctVerbId];
            const correctClassifier = CLASSIFIERS[task.correctClassifierId];
            const correctNoun = NOUNS[task.correctNounId];

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="p-4 bg-indigo-50/40 border border-indigo-150 rounded-2xl hover:bg-slate-50/70 hover:border-indigo-300 hover:shadow-md transition-all relative overflow-hidden"
                id={`broken-pipeline-${task.id}`}
              >
                {/* Visual subtle badge background element */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-50 to-indigo-100 rotate-45 translate-x-8 -translate-y-8 select-none border-b border-indigo-200 opacity-40" />

                {/* Grid Split: Left (Character, Pinyin, English) vs Right (Collocation Block) */}
                <div className="grid grid-cols-1 xs:grid-cols-[1.1fr_1.9fr] gap-3 items-center w-full z-10 relative">
                  
                  {/* Left Column: Chinese Character, Pinyin, English stacked vertically */}
                  <div className="flex items-center gap-3 text-left border-b xs:border-b-0 xs:border-r border-indigo-150/70 pb-3 xs:pb-0 xs:pr-3 justify-center xs:justify-start">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0 text-xs font-black font-mono shadow-sm select-none">
                      {index + 1}
                    </div>
                    
                    <div className="flex flex-col items-center text-center justify-center">
                      <span className="text-base text-slate-700 font-mono leading-none mb-1 select-all font-bold">
                        {task.prototype ? getChPinyin(task.prototype) : (correctNoun ? getChPinyin(correctNoun.char) : "")}
                      </span>
                      <span className="text-2xl sm:text-3xl font-black text-slate-800 leading-none mb-1 select-none animate-fadeIn">
                        {task.prototype ? task.prototype : (correctNoun?.char || "")}
                      </span>
                      <span className="text-xs text-slate-500 leading-tight select-all font-semibold">
                        {task.prototype ? getPrototypeTranslation(task.prototype, language) : (correctNoun?.translations?.[language] || correctNoun?.translations?.en || "")}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Collocation Block - strictly Single Horizontal Line Row (flex-nowrap) to fit completely side-by-side */}
                  <div className="flex items-center justify-center flex-nowrap gap-1 bg-white p-2 rounded-2xl border border-indigo-100/70 shadow-sm shrink-0 overflow-x-auto max-w-full">
                    
                    {/* Verb part */}
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-[10px] text-slate-500 font-mono font-extrabold leading-none lowercase mb-1 select-none text-center">
                        {correctVerb?.pinyin || ""}
                      </span>
                      <div className="px-2 py-1.5 min-w-[48px] bg-slate-50 border border-slate-150 rounded-xl text-center flex items-center justify-center shadow-sm">
                        <span className="text-lg sm:text-xl font-black text-slate-800 leading-none">
                          {correctVerb?.char || "?"}
                        </span>
                      </div>
                    </div>

                    <span className="text-indigo-400 font-black text-xs select-none px-0.5 pb-1 text-center font-mono shrink-0">+</span>

                    {/* Classifier part */}
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-[10px] text-emerald-700 font-mono font-extrabold leading-none lowercase mb-1 select-none text-center">
                        {correctClassifier ? getChPinyin(correctClassifier.char) : ""}
                      </span>
                      <div className="px-2 py-1.5 min-w-[48px] bg-emerald-50 border border-emerald-150 rounded-xl text-center flex items-center justify-center shadow-sm">
                        <span className="text-lg sm:text-xl font-black text-emerald-800 leading-none">
                          {correctClassifier?.char || "?"}
                        </span>
                      </div>
                    </div>

                    <span className="text-indigo-400 font-black text-xs select-none px-0.5 pb-1 text-center font-mono shrink-0">+</span>

                    {/* Noun part */}
                    <div className="flex flex-col items-center shrink-0">
                      <span className="text-[10px] text-slate-500 font-mono font-extrabold leading-none lowercase mb-1 select-none text-center">
                        {correctNoun?.pinyin || ""}
                      </span>
                      <div className="px-2 py-1.5 min-w-[48px] bg-slate-50 border border-slate-150 rounded-xl text-center flex items-center justify-center shadow-sm">
                        <span className="text-lg sm:text-xl font-black text-slate-800 leading-none">
                          {correctNoun?.char || "?"}
                        </span>
                      </div>
                    </div>

                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Command Controls */}
        <div className="flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-slate-100 pt-5 mt-6 w-full">
          <button
            id="btn-prep-back"
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-3 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>BACK</span>
          </button>

          <button
            id="btn-commence-workshop"
            type="button"
            onClick={onStartGame}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-extrabold px-8 py-3 rounded-xl hover:shadow-lg active:translate-y-px transition cursor-pointer text-sm shrink-0"
          >
            <Play size={15} fill="white" />
            <span>ENTER WORKSHOP</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
