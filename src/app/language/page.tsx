'use client';

import React, { useState } from 'react';
import { useKiosk } from '@/context/KioskContext';
import { KioskHeader } from '@/components/ui/KioskHeader';
import { MOCK_LANGUAGES } from '@/lib/mockData';
import { LanguageCourse } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Globe, ExternalLink, CheckCircle, BookOpen, Layers } from 'lucide-react';

export default function LanguageHubScreen() {
  const { language } = useKiosk();
  const t = getTranslation(language);
  const [selectedLang, setSelectedLang] = useState<LanguageCourse>(MOCK_LANGUAGES[0]);

  const handleExternalRedirect = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="gradient-page relative overflow-y-auto flex flex-col min-h-screen pt-24 pb-8 select-none">
      <KioskHeader title={t.langModuleTitle} />

      <main className="max-w-[1240px] mx-auto w-full my-auto flex flex-col justify-center px-4 sm:px-6 py-4">
        {/* Title */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#EAE6DF] text-[#0F766E] rounded-full font-black text-xs sm:text-sm mb-2.5 shadow-2xs">
            <Globe className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>{t.langSectionBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1C1917] mb-1.5 tracking-tight">
            {t.langMainHeading}
          </h1>
          <p className="text-[#64748B] text-xs sm:text-base font-semibold max-w-xl mx-auto">
            {t.langSubHeading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* LEFT 6 LANGUAGE TILES */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
            {MOCK_LANGUAGES.map((lang) => (
              <div
                key={lang.id}
                onClick={() => setSelectedLang(lang)}
                className={`p-4 sm:p-4.5 rounded-[22px] cursor-pointer transition-all duration-200 border flex flex-col items-center justify-center text-center shadow-2xs active:scale-[0.98] min-h-[125px] ${
                  selectedLang.id === lang.id
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-[1.01]'
                    : 'bg-white text-[#1C1917] border-[#E2E8F0] hover:border-[#0F766E] hover:bg-[#F8FAFC]'
                }`}
              >
                <span className="text-3xl sm:text-4xl mb-1.5">{lang.flag}</span>
                <h3 className="text-base sm:text-lg font-black mb-1">{lang.name}</h3>
                <span
                  className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${
                    selectedLang.id === lang.id
                      ? 'bg-white/20 text-white'
                      : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'
                  }`}
                >
                  {lang.levels.length} {t.levelsCount}
                </span>
              </div>
            ))}
          </div>

          {/* RIGHT LANGUAGE DETAIL & ACTION */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[30px] shadow-sm border border-[#E2E8F0] flex flex-col justify-between animate-fade-in-scale">
            <div>
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4 mb-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl sm:text-5xl p-2.5 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] shadow-2xs">
                    {selectedLang.flag}
                  </span>
                  <div>
                    <h2 className="text-xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                      {selectedLang.name}
                    </h2>
                    <p className="text-[#64748B] font-semibold text-xs sm:text-sm mt-0.5">
                      {selectedLang.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Levels */}
              <div className="mb-4">
                <h4 className="text-xs font-black text-[#475569] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <Layers className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{t.availableLevels}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedLang.levels.map((lvl) => (
                    <span
                      key={lvl}
                      className="px-3 py-1 bg-[#F8FAFC] text-[#0F172A] rounded-lg font-bold text-xs sm:text-sm border border-[#E2E8F0] shadow-2xs"
                    >
                      {lvl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-4">
                <h4 className="text-xs font-black text-[#475569] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <BookOpen className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{t.coveredAreas}</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedLang.features.map((feat) => (
                    <div
                      key={feat}
                      className="flex items-center gap-2 p-2.5 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] text-[#0F172A] font-bold text-xs sm:text-sm shadow-2xs"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* MAIN ACTION: IBRAT FARZANDLARI */}
            <div className="p-4 sm:p-5 bg-[#F0FDFA] rounded-2xl border border-[#99F6E4] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-center sm:text-left">
                <div className="font-black text-[#0F766E] text-sm sm:text-base">
                  {t.ibratProject}
                </div>
                <div className="text-[#134E4A] text-xs font-semibold mt-0.5">
                  {t.ibratDesc}
                </div>
              </div>

              <button
                onClick={() => handleExternalRedirect(selectedLang.externalUrl)}
                className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.ibratBtn}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
