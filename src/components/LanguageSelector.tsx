/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { LanguageCode } from "../types";

interface LanguageSelectorProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  return (
    <div className="flex items-center gap-1.5 bg-slate-900/80 p-1 rounded-lg border border-slate-700 shadow-sm" id="lang-selector-container">
      <button
        id="lang-btn-cn"
        type="button"
        onClick={() => onLanguageChange("cn")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
          currentLanguage === "cn"
            ? "bg-sky-500 text-white shadow-md"
            : "text-slate-300 hover:text-white hover:bg-slate-800"
        }`}
      >
        中文
      </button>
      <button
        id="lang-btn-en"
        type="button"
        onClick={() => onLanguageChange("en")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
          currentLanguage === "en"
            ? "bg-sky-500 text-white shadow-md"
            : "text-slate-300 hover:text-white hover:bg-slate-800"
        }`}
      >
        EN
      </button>
      <button
        id="lang-btn-mn"
        type="button"
        onClick={() => onLanguageChange("mn")}
        className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
          currentLanguage === "mn"
            ? "bg-sky-500 text-white shadow-md"
            : "text-slate-300 hover:text-white hover:bg-slate-800"
        }`}
      >
        Монгол
      </button>
    </div>
  );
};
