'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useKiosk } from '@/context/KioskContext';
import { KioskHeader } from '@/components/ui/KioskHeader';
import { TouchCard } from '@/components/ui/TouchCard';
import { getTranslation } from '@/lib/translations';
import { UserCheck, Sparkles, Compass, ShieldCheck } from 'lucide-react';

export default function MainDashboardScreen() {
  const router = useRouter();
  const { user, language } = useKiosk();
  const t = getTranslation(language);

  const userAgeGroup = user?.ageGroup || '18-24';
  const userName = user?.name || 'Foydalanuvchi';

  const getRecommendation = () => {
    switch (userAgeGroup) {
      case '7-12':
        return t.rec_7_12;
      case '13-17':
        return t.rec_13_17;
      case '18-24':
      case '25-35':
        return t.rec_18_24;
      default:
        return t.rec_default;
    }
  };

  return (
    <div className="gradient-page relative overflow-y-auto flex flex-col min-h-screen pt-20 pb-8 select-none">
      <KioskHeader title={t.dashboardTitle} />

      <main className="max-w-[1780px] mx-auto w-full my-auto flex flex-col justify-center px-4 sm:px-8 lg:px-10 py-4 sm:py-6">
        {/* Welcome Banner */}
        <div className="mb-6 p-6 sm:p-8 bg-white/95 backdrop-blur-xl rounded-[32px] border border-[#EAE6DF] shadow-md flex flex-col md:flex-row items-center justify-between gap-4 animate-fade-in-down">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white flex items-center justify-center font-black text-2xl shadow-md">
              {userName[0]?.toUpperCase() || 'U'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1C1917] tracking-tight">
                  {t.dashWelcome.replace('{name}', userName)}
                </h1>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{user?.age || 20} {t.yearsOld}</span>
                </span>
              </div>
              <p className="text-[#57534E] text-sm sm:text-base lg:text-lg font-semibold mt-1">
                {getRecommendation()}
              </p>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#FAF8F5] rounded-xl border border-[#EAE6DF] text-xs font-bold text-[#78716C]">
            <Compass className="w-4 h-4 text-[#0F766E]" />
            <span>Qo'qon Shahri • Muqimiy Smart Kiosk</span>
          </div>
        </div>

        {/* 5 MAIN DIRECTION CARDS (EXPANDED WIDTH & HEIGHT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6 mb-6">
          {/* 1. TIL O'RGANISH */}
          <TouchCard
            title={t.dir1_title}
            description={t.dir1_desc}
            imageSrc="/images/ibrat.jpg"
            badge={t.dir1_badge}
            colorScheme="blue"
            onClick={() => router.push('/language')}
          />

          {/* 2. KASB O'RGANISH */}
          <TouchCard
            title={t.dir2_title}
            description={t.dir2_desc}
            imageSrc="/images/ustoz.png"
            badge={t.dir2_badge}
            colorScheme="green"
            onClick={() => router.push('/career')}
          />

          {/* 3. MIGRATSIYAGA KETISH */}
          <TouchCard
            title={t.dir3_title}
            description={t.dir3_desc}
            imageSrc="/images/card_migration.jpg"
            badge={t.dir3_badge}
            colorScheme="amber"
            onClick={() => router.push('/migration')}
          />

          {/* 4. PSIXOLOGIK KO'MAK */}
          <TouchCard
            title={t.dir4_title}
            description={t.dir4_desc}
            imageSrc="/images/card_psychology.jpg"
            badge={t.dir4_badge}
            colorScheme="rose"
            onClick={() => router.push('/psychology')}
          />

          {/* 5. AI BILAN OCHIQ MULOQOT */}
          <TouchCard
            title={t.dir5_title}
            description={t.dir5_desc}
            imageSrc="/images/card_ai.jpg"
            badge={t.dir5_badge}
            colorScheme="purple"
            onClick={() => router.push('/ai')}
          />
        </div>

        {/* Quick Kiosk Instructions Footer */}
        <div className="p-4 bg-white/95 backdrop-blur-xl rounded-2xl text-[#78716C] text-center text-xs sm:text-sm md:text-base font-bold flex items-center justify-center gap-2.5 border border-[#EAE6DF] shadow-xs">
          <UserCheck className="w-5 h-5 text-[#0F766E] shrink-0" />
          <span>{t.dashInstruction}</span>
        </div>
      </main>
    </div>
  );
}
