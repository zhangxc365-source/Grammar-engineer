/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { LanguageCode, PipeNode } from "../types";
import { UI_TEXTS, VERBS, CLASSIFIERS, NOUNS, verifyCollocation, getChPinyin } from "../data";
import { HelpCircle, Sparkles, ArrowRight, Check, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ReviewModalProps {
  language: LanguageCode;
  rustedNodes: PipeNode[];
  onFinishReview: (repairedNodes: Record<string, { verb: string; classifier: string }>) => void;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  language,
  rustedNodes,
  onFinishReview
}) => {
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  // We loop over the rusted nodes one-by-one to fix them
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const activeNode = rustedNodes[currentIndex];

  // Local state for matching cards
  const [selectedVerbId, setSelectedVerbId] = useState<string>("");
  const [selectedClassifierId, setSelectedClassifierId] = useState<string>("");

  // Keep track of resolved modifications
  const [resolvedAccumulator, setResolvedAccumulator] = useState<Record<string, { verb: string; classifier: string }>>({});

  // Visual success feedback
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  if (!activeNode) {
    return null;
  }

  const noun = NOUNS[activeNode.initialNounId];

  // Helper check
  const handleAnswerSubmit = () => {
    if (!selectedVerbId || !selectedClassifierId) return;

    const testResult = verifyCollocation(selectedVerbId, selectedClassifierId, activeNode.initialNounId);

    if (testResult.isValid) {
      setErrorMessage("");
      setShowSuccess(true);

      // Save to accumulator
      const updatedAccumulator = {
        ...resolvedAccumulator,
        [activeNode.id]: { verb: selectedVerbId, classifier: selectedClassifierId }
      };
      setResolvedAccumulator(updatedAccumulator);

      // Advance or finish after 1.5s delay
      setTimeout(() => {
        setShowSuccess(false);
        setSelectedVerbId("");
        setSelectedClassifierId("");

        if (currentIndex < rustedNodes.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          onFinishReview(updatedAccumulator);
        }
      }, 1500);

    } else {
      // Review mode is kind & educational. We give them hints instead of rust locking again.
      setErrorMessage(testResult.explanation[language]);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/90 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto" id="review-screen-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-4 border-amber-500 rounded-3xl w-full max-w-xl shadow-2xl relative overflow-hidden my-4"
        id="review-screen-card"
      >
        {/* Pattern Border */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 animate-pulse" />

        <div className="p-6 sm:p-8">
          
          {/* Header */}
          <div className="text-center mb-6">
            <span className="bg-amber-100/90 text-amber-800 border border-amber-300 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider block w-fit mx-auto shadow-sm">
              ⚙️ {getUI("reviewTitle")}
            </span>
            <h3 className="text-2xl font-black text-slate-800 tracking-tight mt-2" id="lbl-review-title">
              {getUI("reviewTitle")}
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1 mx-auto max-w-md">
              {getUI("reviewDesc")}
            </p>
          </div>

          {/* Stepper Progress dots */}
          <div className="flex justify-center items-center gap-1.5 mb-6" id="review-stepper">
            {rustedNodes.map((node, index) => (
              <div
                key={node.id}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-amber-500"
                    : index < currentIndex
                    ? "w-2.5 bg-emerald-500"
                    : "w-2.5 bg-slate-200"
                }`}
              />
            ))}
          </div>

          {/* Locked pipe details container */}
          <div className="bg-slate-900 text-slate-100 rounded-2xl p-5 border border-slate-800 mb-6 text-center shadow-inner relative">
            <span className="text-[9px] uppercase font-mono bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded border border-amber-500/30 absolute top-2 right-4">
              {activeNode.name}
            </span>

            <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-3">
              {language === "cn" ? "当前断裂点：" : "Active Broken Station"}
            </p>

            <div className="flex flex-col items-center justify-center gap-1.5 py-1">
              <div className="flex justify-center items-center gap-2 text-2xl sm:text-3xl font-black font-mono">
                <span className="text-red-400 line-through">
                  {VERBS[activeNode.initialVerbId]?.char || "?"}
                </span>
                <span className="text-slate-600 text-sm">•</span>
                <span className="text-red-400 line-through">
                  {CLASSIFIERS[activeNode.initialClassifierId]?.char || "?"}
                </span>
                <span className="text-slate-600 text-sm">•</span>
                <span className="text-emerald-400">
                  {noun?.char || "?"}
                </span>
              </div>
              <p className="text-sm sm:text-base font-mono text-slate-600 font-extrabold">
                ({getChPinyin(VERBS[activeNode.initialVerbId]?.char || "")} • {getChPinyin(CLASSIFIERS[activeNode.initialClassifierId]?.char || "")} • {getChPinyin(noun?.char || "")})
              </p>
            </div>

            <p className="text-[11px] text-slate-400 italic mt-2">
              {language === "cn" ? "（名词属性：) " : "(Noun category:) "}
              <span className="text-emerald-300 font-bold uppercase">{noun?.attribute}</span>
              {` • (${noun?.translations[language]})`}
            </p>
          </div>

          {/* Hint Card Box - highly educational */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 mb-6 text-xs text-amber-900 relative">
            <div className="absolute -top-2.5 left-4 bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <Sparkles size={11} className="animate-spin text-amber-600" />
              <span>{language === "cn" ? "大工匠提示" : "Master Tip"}</span>
            </div>
            
            <p className="font-semibold text-slate-800 block mt-1.5">
              {getUI("reviewTip")}
            </p>
            <p className="mt-1 opacity-90">
              {language === "cn"
                ? `「${noun?.char}」属于「${noun?.attribute}」类物理属性。`
                : `"${noun?.char}" is categorized under the "${noun?.attribute}" attribute. `}
              {language === "cn"
                ? `量词：可以用「${noun?.classifiers.map(id => CLASSIFIERS[id]?.char).join(" or ")}」。`
                : `Allowed Classifiers: "${noun?.classifiers.map(id => CLASSIFIERS[id]?.char).join(" or ")}". `}
            </p>
          </div>

          {/* Simple Selector rows (Grid layout for speedy choice) */}
          <div className="space-y-4 mb-6">
            
            {/* Verb Row */}
            <div>
              <span className="text-xs uppercase font-extrabold text-slate-500 block mb-2 tracking-wider">
                1. 选择动作零件 (Select Action Verb)
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.values(VERBS).map((v) => {
                  const isSelected = selectedVerbId === v.id;
                  return (
                    <button
                      id={`rev-verb-btn-${v.id}`}
                      key={v.id}
                      type="button"
                      disabled={showSuccess}
                      onClick={() => setSelectedVerbId(v.id)}
                      className={`px-3 py-1.5 flex flex-col items-center justify-center rounded-xl border text-sm sm:text-base font-extrabold transition cursor-pointer min-w-[62px] ${
                        isSelected
                          ? "bg-amber-500 border-amber-600 text-white shadow"
                          : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100"
                      }`}
                    >
                      <span className={`text-sm font-mono font-black leading-none mb-1 ${isSelected ? "text-amber-100" : "text-amber-900 font-black"}`}>
                        {getChPinyin(v.char)}
                      </span>
                      <span className="leading-tight text-base sm:text-lg">{v.char}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Classifier Row */}
            <div>
              <span className="text-xs uppercase font-extrabold text-slate-500 block mb-2 tracking-wider">
                2. 选择配套量词零件 (Select Classifier)
              </span>
              <div className="flex flex-wrap gap-2">
                {Object.values(CLASSIFIERS).map((c) => {
                  const isSelected = selectedClassifierId === c.id;
                  const isPref = noun?.classifiers.includes(c.id);
                  return (
                    <button
                      id={`rev-class-btn-${c.id}`}
                      key={c.id}
                      type="button"
                      disabled={showSuccess}
                      onClick={() => setSelectedClassifierId(c.id)}
                      className={`px-3 py-1.5 flex flex-col items-center justify-center rounded-xl border text-sm sm:text-base font-extrabold transition cursor-pointer min-w-[62px] ${
                        isSelected
                          ? "bg-amber-500 border-amber-600 text-white shadow"
                          : "bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:text-black"
                      }`}
                    >
                      <span className={`text-sm font-mono font-black leading-none mb-1 ${isSelected ? "text-amber-100" : "text-amber-900 font-black"}`}>
                        {getChPinyin(c.char)}
                      </span>
                      <span className="leading-tight text-base sm:text-lg">{c.char}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Visual Alert feedbacks */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-300 text-green-900 rounded-xl p-3.5 text-xs sm:text-sm mb-6 flex items-center gap-2"
                id="rev-success-alert"
              >
                <div className="bg-green-500 text-white p-1 rounded-full">
                  <Check size={14} />
                </div>
                <div>
                  <span className="font-extrabold block">
                    {language === "cn" ? "🔧 修理成功！管道恢复连通。" : "🔧 Clean fix! Flow restored."}
                  </span>
                </div>
              </motion.div>
            )}

            {errorMessage && !showSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-100 border border-red-300 text-red-900 rounded-xl p-3.5 text-xs sm:text-sm mb-6 flex items-start gap-2"
                id="rev-error-alert"
              >
                <AlertCircle className="text-red-700 mt-0.5 shrink-0" size={16} />
                <div>
                  <span className="font-extrabold block">
                    {language === "cn" ? "搭配失败，请检查逻辑！" : "Collocation fail! Check attributes:"}
                  </span>
                  <p className="opacity-90">{errorMessage}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Save repair click check */}
          <div className="flex justify-between items-center border-t border-slate-100 pt-5 mt-4">
            <span className="text-xs font-semibold text-slate-400">
              {currentIndex + 1} / {rustedNodes.length} {language === "cn" ? "个待复盘水管" : "rusted pipes remaining"}
            </span>
            <button
              id="btn-submit-review-repair"
              type="button"
              disabled={!selectedVerbId || !selectedClassifierId || showSuccess}
              onClick={handleAnswerSubmit}
              className={`px-6 py-2 rounded-xl text-white font-extrabold text-xs sm:text-sm shadow flex items-center gap-1.5 transition cursor-pointer ${
                selectedVerbId && selectedClassifierId && !showSuccess
                  ? "bg-amber-500 hover:bg-amber-600 active:translate-y-px"
                  : "bg-slate-300 text-slate-400 cursor-not-allowed shadow-none"
              }`}
            >
              <span>WELD SPARES</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
