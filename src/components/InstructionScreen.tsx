/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LanguageCode } from "../types";
import { ArrowLeft, BookOpen } from "lucide-react";
import { motion } from "motion/react";

interface InstructionScreenProps {
  language: LanguageCode;
  onBack: () => void;
}

export const InstructionScreen: React.FC<InstructionScreenProps> = ({
  language,
  onBack
}) => {
  const INSTRUCTION_TEXTS = {
    title: {
      cn: "How to Play（玩法说明）",
      en: "How to Play (Instructions)",
      mn: "Хэрхэн тоглох вэ (Заавар)"
    },
    subtitle: {
      cn: "掌握中文量词与动词搭配进行管道维护",
      en: "Learn Chinese collocations & maintain the pipeline",
      mn: "Хятад хэлний ангилал үг ба холбоосыг тогтоон шугамаа засах"
    },
    backBtn: {
      cn: "返回主页",
      en: "HOME",
      mn: "НҮҮР"
    },
    manualTag: {
      cn: "说明指南 / Manual",
      en: "Gameplay Manual",
      mn: "Зааварчилгааны гарын авлага"
    },
    understandBtnText: {
      cn: "我明白了",
      en: "I Understand",
      mn: "Ойлголоо"
    },
    understandBtnSubtext: {
      cn: "wǒ míng bai le • I UNDERSTAND",
      en: "let's start • ready to play",
      mn: "би ойлголоо • эхлэх"
    },
    rules: {
      cn: [
        "点击红色感叹号部分进入修复页面选择正确的词语进行搭配。",
        "如果两次答题均未成功，该题将被锁定不可再答。",
        "游戏时间 180s，无生命值限制。",
        "双人模式看看谁答得更快吧！"
      ],
      en: [
        "Click the red exclamation mark to open the repair page and select the correct words to complete the collocation.",
        "If you fail two attempts, the question will be locked and cannot be answered again.",
        "The game time is 180s, and there is no limit on virtual lives.",
        "Try the Versus (PK) Mode to see who answers and repairs pipelines faster!"
      ],
      mn: [
        "Засах хуудас руу орж, зөв холбоосыг сонгохын тулд улаан анхаарлын тэмдэг дээр дарна уу.",
        "Хэрэв хоёр удаа дараалан буруу хариулбал уг даалгавар түгжигдэж, дахин хариулах боломжгүй болно.",
        "Тоглоомын хугацаа 180 секунд бөгөөд амьдралын хязгаарлалт байхгүй.",
        "Хэн илүү хурдан хариулахыг үзэхийн тулд хоёр тоглогчийн горимыг туршиж үзээрэй!"
      ]
    }
  };

  const texts = INSTRUCTION_TEXTS;
  const currentRules = texts.rules[language] || texts.rules.cn;

  return (
    <div className="max-w-[97vw] xl:max-w-[1200px] mx-auto py-8 px-6 bg-white rounded-3xl border border-slate-200 shadow-xl my-4" id="instruction-screen-main">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-150">
        <button
          id="btn-back-home"
          type="button"
          onClick={onBack}
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 transition rounded-xl cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>{texts.backBtn[language] || "HOME"}</span>
        </button>

        <div className="flex items-center gap-2 text-sky-700">
          <BookOpen size={18} />
          <span className="text-xs font-bold tracking-widest uppercase font-mono">
            {texts.manualTag[language]}
          </span>
        </div>
      </div>

      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-800" id="instruction-title">
          {texts.title[language]}
        </h2>
        <p className="text-sm text-slate-400 mt-1.5">
          {texts.subtitle[language]}
        </p>
      </div>

      {/* Instructions displayed directly on the page without a card wrapper */}
      <div className="max-w-2xl mx-auto mb-10 px-4">
        <ul className="text-lg sm:text-xl text-slate-750 space-y-5 list-decimal pl-6 leading-relaxed text-left font-semibold max-w-xl mx-auto">
          {currentRules.map((rule, idx) => (
            <li key={idx} className="tracking-wide">
              {rule}
            </li>
          ))}
        </ul>
      </div>

      {/* Play button changed to white styling displaying "我明白了" with subtexts */}
      <div className="flex justify-center border-t border-slate-100 pt-6">
        <button
          id="btn-i-understand"
          type="button"
          onClick={onBack}
          className="bg-white hover:bg-slate-50 text-slate-800 font-extrabold border-2 border-slate-300 hover:border-slate-400 px-10 py-3 rounded-xl transition shadow-sm cursor-pointer text-sm flex flex-col items-center justify-center min-w-[220px]"
        >
          <span className="text-lg sm:text-xl font-black leading-tight selection:bg-transparent">
            {texts.understandBtnText[language]}
          </span>
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase mt-0.5 select-none">
            {texts.understandBtnSubtext[language]}
          </span>
        </button>
      </div>

    </div>
  );
};
