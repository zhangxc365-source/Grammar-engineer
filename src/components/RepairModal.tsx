/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { LanguageCode, PipeNode } from "../types";
import { UI_TEXTS, VERBS, CLASSIFIERS, NOUNS, verifyCollocation, getChPinyin, getPrototypeTranslation } from "../data";
import { X, AlertTriangle, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RepairModalProps {
  language: LanguageCode;
  node: PipeNode;
  onClose: () => void;
  onSaveRepair: (nodeId: string, verbId: string, classifierId: string, nounId: string, isCorrect: boolean, scoreDelta: number) => void;
}

export const RepairModal: React.FC<RepairModalProps> = ({
  language,
  node,
  onClose,
  onSaveRepair
}) => {
  const getUI = (key: string) => UI_TEXTS[key]?.[language] || key;

  // Local state for selected items
  const [selectedClassifierId, setSelectedClassifierId] = useState<string>("");

  // Error feedback state
  const [localAttempts, setLocalAttempts] = useState<number>(node.attempts);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | "rust" | null;
    message: string;
    explanation: string;
  }>({ type: null, message: "", explanation: "" });

  const [isShaking, setIsShaking] = useState<boolean>(false);

  const activeVerb = VERBS[node.currentVerbId];
  const activeNoun = NOUNS[node.currentNounId];
  const activeSelectedClassifier = CLASSIFIERS[selectedClassifierId];

  // Triggers matching verification logic
  const handleVerify = () => {
    if (!selectedClassifierId) return;

    // Verb and Noun are static and correct. Only classifier is test subject
    const result = verifyCollocation(node.currentVerbId, selectedClassifierId, node.currentNounId);

    if (result.isValid) {
      setFeedback({
        type: "success",
        message: "SUCCESS / 成功",
        explanation: ""
      });
      
      // Save repair after 1.5 seconds. Yields +10 points.
      setTimeout(() => {
        onSaveRepair(node.id, node.currentVerbId, selectedClassifierId, node.currentNounId, true, 10);
      }, 1500);

    } else {
      const newAttempts = localAttempts + 1;
      setLocalAttempts(newAttempts);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      if (newAttempts >= 2) {
        // Rust Locked!
        setFeedback({
          type: "rust",
          message: "LOCKED OUT / 锁死",
          explanation: ""
        });
        
        // Lock and save failure after 2.5 seconds. Penalty is 0 points but adds to rust count.
        setTimeout(() => {
          onSaveRepair(node.id, node.currentVerbId, selectedClassifierId, node.currentNounId, false, 0);
        }, 2500);

      } else {
        // First violation warning.
        setFeedback({
          type: "error",
          message: "FAILED / 失败",
          explanation: ""
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" id="repair-modal-overlay">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`bg-slate-50 border-4 rounded-3xl w-full max-w-2xl shadow-2xl relative overflow-hidden transition-all duration-300 ${
          feedback.type === "success"
            ? "border-green-500"
            : feedback.type === "rust"
            ? "border-amber-600 animate-pulse"
            : feedback.type === "error"
            ? "border-red-500"
            : "border-slate-800"
        } ${isShaking ? "animate-[bounce_0.2s_ease-in-out_infinite]" : ""}`}
        id="repair-modal-body"
      >
        {/* Steel Pattern Stripe */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" />

        {/* Close Button */}
        <button
          id="btn-close-repair-modal"
          type="button"
          onClick={onClose}
          disabled={feedback.type === "success" || feedback.type === "rust"}
          className="absolute top-4 right-4 bg-white hover:bg-slate-100 border border-slate-200 text-slate-500 hover:text-slate-900 p-1.5 rounded-full shadow-md cursor-pointer transition disabled:opacity-50"
        >
          <X size={16} />
        </button>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          
          {/* Header */}
          <div className="mb-6 border-b border-slate-150 pb-4">
            <span className="text-xs uppercase font-mono font-bold tracking-widest text-sky-600 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-100">
              🛠️ {node.name}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-2 animate-fadeIn" id="lbl-popup-title">
              {language === "cn" ? "量词诊断与管道修复" : "Measure Word Collocation Diagnosis"}
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-1">
              CURRENT ATTEMPTS: {localAttempts} / 2 (MAX)
            </p>
            {node.prototype && (
              <div className="mt-2 text-xs font-semibold bg-indigo-50 border border-indigo-150 text-indigo-700 px-3 py-1 rounded-full inline-flex items-center gap-1 animate-fadeIn">
                <span>{language === "cn" ? "词语原型：" : "Original Word: "}</span>
                <span className="font-bold underline">{node.prototype}</span>
                <span className="text-slate-400 font-normal">({getPrototypeTranslation(node.prototype, language)})</span>
              </div>
            )}
          </div>

          {/* Interactive Question Panel: Verb _____ Noun */}
          <div className="bg-slate-950 border border-slate-800 p-6 sm:p-8 rounded-2xl shadow-inner mb-6 text-slate-100 relative overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute top-2 right-4 text-[9px] text-slate-500 font-mono tracking-widest select-none">
              VERB_GAP_NOUN_INSPECTION
            </div>

            {/* Display Equation Sentence format requested by the user: Verb _____ Noun */}
            <div className="flex flex-wrap items-center justify-center gap-5 py-6" id="equation-display-slots">
              {/* Verb (Static) */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-sm sm:text-base font-mono text-slate-100 font-extrabold mb-1.5">
                  {getChPinyin(activeVerb?.char || "")}
                </span>
                <span className="text-3xl sm:text-5xl font-black text-white font-sans leading-none tracking-wide select-none">
                  {activeVerb ? activeVerb.char : node.currentVerbId}
                </span>
              </div>

              {/* Blank Gap (_____ / selected option) */}
              <div 
                className={`min-w-[120px] sm:min-w-[160px] h-16 sm:h-20 px-4 rounded-2xl border-2 flex flex-col items-center justify-center transition-all ${
                  activeSelectedClassifier 
                    ? "bg-violet-950 border-violet-400 text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.15)] scale-105" 
                    : "bg-slate-900 border-dashed border-slate-700 text-slate-500 animate-pulse"
                }`}
              >
                {activeSelectedClassifier ? (
                  <>
                    <span className="text-sm sm:text-base font-mono text-violet-200 font-black mb-1">
                      {getChPinyin(activeSelectedClassifier.char)}
                    </span>
                    <span className="text-xl sm:text-3xl font-black font-mono tracking-tight leading-none">
                      {activeSelectedClassifier.char}
                    </span>
                  </>
                ) : (
                  <span className="text-slate-500 tracking-widest font-mono font-black text-lg sm:text-xl select-none">
                    _____
                  </span>
                )}
              </div>

              {/* Noun (Static) with pinyin */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-sm sm:text-base font-mono text-slate-100 font-extrabold mb-1.5">
                  {getChPinyin(activeNoun?.char || "")}
                </span>
                <span className="text-3xl sm:text-5xl font-black text-emerald-300 font-sans leading-none tracking-wide select-none">
                  {activeNoun ? activeNoun.char : node.currentNounId}
                </span>
              </div>
            </div>
          </div>

          {/* Options Bay underneath the question as requested */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-5" id="classifiers-options-pool">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest block mb-3 font-bold select-none text-center sm:text-left">
              💡 {language === "cn" ? "请从下方选择正确的拼音搭配项：" : "Select correct option below:"}
            </span>

            {/* Render 3 options from task node */}
            <div className="grid grid-cols-3 gap-3" id="yct-classifier-options-grid">
              {node.classifierOptions && node.classifierOptions.map((opt) => {
                const isSelected = selectedClassifierId === opt.id;
                
                return (
                  <button
                    id={`btn-opt-${opt.id}`}
                    key={opt.id}
                    type="button"
                    disabled={feedback.type === "success" || feedback.type === "rust"}
                    onClick={() => {
                      if (!feedback.type || feedback.type === "error") {
                        setSelectedClassifierId(opt.id);
                      }
                    }}
                    className={`p-2.5 sm:p-3.5 rounded-2xl border-2 border-b-4 flex flex-col items-center justify-center min-h-[75px] transition-all cursor-pointer select-none active:translate-y-0.5 ${
                      isSelected
                        ? "bg-violet-100 border-violet-500 text-violet-950 font-black ring-2 ring-violet-500/20 scale-102"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 hover:border-slate-300"
                    } ${feedback.type === "success" || feedback.type === "rust" ? "opacity-60 cursor-not-allowed" : ""}`}
                  >
                    <span className={`text-sm sm:text-base font-mono mb-1.5 ${isSelected ? "text-violet-950 font-black" : "text-slate-900 font-extrabold"}`}>
                      {getChPinyin(opt.char)}
                    </span>
                    <span className="text-xl sm:text-3xl font-black font-mono leading-none tracking-tight">{opt.char}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Feedback section (Alert boxes) */}
          <AnimatePresence>
            {feedback.type && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                className={`p-4 rounded-2xl text-xs sm:text-sm mb-6 ${
                  feedback.type === "success"
                    ? "bg-green-100 border border-green-300 text-green-900"
                    : feedback.type === "rust"
                    ? "bg-amber-100 border border-amber-300 text-amber-900 animate-pulse"
                    : "bg-red-100 border border-red-300 text-red-900"
                }`}
                id="welder-feedback-box"
              >
                <div className="flex items-start gap-3">
                  <div className="shrink-0 mt-0.5">
                    {feedback.type === "success" ? (
                      <span className="text-lg block">🎉</span>
                    ) : (
                      <AlertTriangle className={feedback.type === "rust" ? "text-amber-700" : "text-red-700"} size={18} />
                    )}
                  </div>
                  <div>
                    <span className="font-extrabold block text-sm sm:text-base mb-1">
                      {feedback.message}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action buttons confirm bottom */}
          <div className="flex justify-end gap-3" id="repair-popup-footer animate-fadeIn">
            <button
              id="btn-dismiss-popup"
              type="button"
              onClick={onClose}
              disabled={feedback.type === "success" || feedback.type === "rust"}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-600 hover:bg-slate-100 font-bold text-xs sm:text-sm cursor-pointer transition disabled:opacity-40"
            >
              CANCEL
            </button>

            <button
              id="btn-deploy-matching-spares"
              type="button"
              onClick={handleVerify}
              disabled={feedback.type === "success" || feedback.type === "rust" || !selectedClassifierId}
              className={`px-7 py-2.5 rounded-xl text-white font-extrabold text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5 ${
                feedback.type === "success"
                  ? "bg-green-500 opacity-60"
                  : "bg-indigo-600 hover:bg-indigo-700 active:translate-y-px"
              }`}
            >
              <ShieldCheck size={16} />
              <span>DEPLOY</span>
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
};
