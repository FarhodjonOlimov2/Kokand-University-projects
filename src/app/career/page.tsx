'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useKiosk } from '@/context/KioskContext';
import { KioskHeader } from '@/components/ui/KioskHeader';
import { MOCK_CAREERS } from '@/lib/mockData';
import { CareerDirection } from '@/types';
import { getTranslation } from '@/lib/translations';
import { Briefcase, ExternalLink, Bot, CheckCircle, Star } from 'lucide-react';

export default function CareerHubScreen() {
  const router = useRouter();
  const { user, language } = useKiosk();
  const t = getTranslation(language);
  const [selectedCareer, setSelectedCareer] = useState<CareerDirection>(MOCK_CAREERS[0]);

  const handleExternalRedirect = (url?: string) => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  return (
    <div className="gradient-page relative overflow-y-auto flex flex-col min-h-screen pt-24 pb-8 select-none">
      <KioskHeader title={t.careerModuleTitle} />

      <main className="max-w-[1240px] mx-auto w-full my-auto flex flex-col justify-center px-4 sm:px-6 py-4">
        {/* Title */}
        <div className="text-center mb-6 animate-fade-in-down">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-white border border-[#EAE6DF] text-[#0F766E] rounded-full font-black text-xs sm:text-sm mb-2.5 shadow-2xs">
            <Briefcase className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>{t.careerSectionBadge}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-[#1C1917] mb-1.5 tracking-tight">
            {t.careerHeading}
          </h1>
          <p className="text-[#64748B] text-xs sm:text-base font-semibold max-w-xl mx-auto">
            {t.careerSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* LEFT CAREERS LIST */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
            {MOCK_CAREERS.map((career) => (
              <div
                key={career.id}
                onClick={() => setSelectedCareer(career)}
                className={`p-4 sm:p-4.5 rounded-[22px] cursor-pointer transition-all duration-200 border flex items-center justify-between shadow-2xs active:scale-[0.98] ${
                  selectedCareer.id === career.id
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md scale-[1.01]'
                    : 'bg-white text-[#1C1917] border-[#E2E8F0] hover:border-[#0F766E] hover:bg-[#F8FAFC]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl sm:text-3xl p-2 rounded-xl bg-white/10 shrink-0">
                    {career.icon}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-black leading-tight">
                      {career.title}
                    </h3>
                    <p
                      className={`text-xs font-semibold mt-0.5 ${
                        selectedCareer.id === career.id ? 'text-[#CBD5E1]' : 'text-[#64748B]'
                      }`}
                    >
                      {career.skills.join(' • ')}
                    </p>
                  </div>
                </div>

                {career.popular && (
                  <span className={`flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full shrink-0 border ${
                    selectedCareer.id === career.id 
                      ? 'bg-white/15 text-amber-300 border-white/20' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    <Star className="w-3 h-3 text-amber-500 fill-current" />
                    <span>TOP</span>
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* RIGHT CAREER DETAIL */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-[30px] shadow-sm border border-[#E2E8F0] flex flex-col justify-between animate-fade-in-scale">
            <div>
              <div className="flex items-center gap-4 border-b border-[#E2E8F0] pb-4 mb-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center text-4xl sm:text-5xl shrink-0 shadow-2xs">
                  {selectedCareer.icon}
                </div>
                <div>
                  <h2 className="text-xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
                    {selectedCareer.title}
                  </h2>
                  <p className="text-[#64748B] font-semibold text-xs sm:text-sm mt-0.5 leading-relaxed">
                    {selectedCareer.description}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-xs font-black text-[#475569] mb-2 flex items-center gap-1.5 uppercase tracking-wider">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{t.requiredSkills}</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCareer.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-[#F8FAFC] text-[#0F172A] rounded-lg font-bold text-xs sm:text-sm border border-[#E2E8F0] shadow-2xs"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Advisor Prompt Box */}
              <div className="p-4 sm:p-4.5 bg-[#F0FDFA] rounded-2xl border border-[#99F6E4] mb-4">
                <div className="flex items-center gap-1.5 mb-1">
                  <Bot className="w-4 h-4 text-[#0F766E]" />
                  <span className="font-black text-[#0F766E] text-xs sm:text-sm">
                    AI Maslahatchi tavsiyasi:
                  </span>
                </div>
                <p className="text-[#134E4A] text-xs sm:text-sm leading-relaxed font-semibold">
                  "{user?.name || 'Foydalanuvchi'} ({user?.ageGroup || '18-24'} {t.yearsOld}): {selectedCareer.title} kasbini o'rganish 3-6 oy ichida ilk amaliy daromadga chiqish imkonini beradi."
                </p>
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-3 border-t border-[#E2E8F0]">
              <button
                onClick={() => handleExternalRedirect(selectedCareer.externalUrl)}
                className="w-full sm:flex-1 min-h-[50px] py-3 px-5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <ExternalLink className="w-4 h-4" />
                <span>{t.startLearning}</span>
              </button>

              <button
                onClick={() => router.push('/ai')}
                className="w-full sm:w-auto min-h-[50px] px-5 py-3 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] font-black text-xs sm:text-sm rounded-xl border border-[#CBD5E1] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Bot className="w-4 h-4 text-[#0F766E]" />
                <span>AI Kasb Suhbati</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
