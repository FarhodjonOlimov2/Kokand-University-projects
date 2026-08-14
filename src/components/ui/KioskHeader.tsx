'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useKiosk } from '@/context/KioskContext';
import { getTranslation } from '@/lib/translations';
import { ArrowLeft, Home, HelpCircle, LogOut, UserCheck, PhoneCall } from 'lucide-react';

export const KioskHeader: React.FC<{ title?: string }> = ({ title }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, clearSession, language, setLanguage } = useKiosk();
  const t = getTranslation(language);
  const [showHelp, setShowHelp] = useState(false);
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  const handleEndSession = () => {
    clearSession();
    router.push('/session-end');
  };

  const isStartPage = pathname === '/' || pathname === '/start';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[#FAF8F5]/90 backdrop-blur-xl border-b border-[#EAE6DF] min-h-[62px]">
        <div className="flex items-center gap-3">
          {!isStartPage && pathname !== '/welcome' && (
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F5F2EC] text-[#292524] font-semibold text-sm border border-[#E5E0D6] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              aria-label={t.back}
            >
              <ArrowLeft className="w-4 h-4 text-[#57534E]" />
              <span>{t.back}</span>
            </button>
          )}

          {!isStartPage && pathname !== '/dashboard' && (
            <button
              onClick={() => router.push('/dashboard')}
              className="flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#F5F2EC] text-[#292524] font-semibold text-sm border border-[#E5E0D6] rounded-xl shadow-xs transition-all active:scale-95 cursor-pointer"
              aria-label={t.home}
            >
              <Home className="w-4 h-4 text-[#57534E]" />
              <span>{t.home}</span>
            </button>
          )}

          <div className="hidden md:flex flex-col ml-1">
            <span className="font-extrabold text-base text-[#1C1917] tracking-tight">{t.headerBrand}</span>
            {title && <span className="text-[11px] font-bold text-[#78716C] uppercase tracking-wider">{title}</span>}
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* User profile pill */}
          {user && (
            <button
              onClick={() => router.push('/profile')}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white rounded-xl border border-[#E5E0D6] shadow-xs hover:bg-[#F5F2EC] transition-all cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#0F766E]" />
              <span className="font-bold text-[#292524] text-xs">{user.name}</span>
            </button>
          )}

          {/* Language Selector */}
          <div className="flex items-center bg-[#F0ECE4] rounded-xl p-1 border border-[#E5E0D6]">
            {(['UZ', 'RU', 'EN'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                  language === lang
                    ? 'bg-[#1C1917] text-white shadow-xs'
                    : 'text-[#78716C] hover:text-[#1C1917]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          {/* Help Button */}
          <button
            onClick={() => setShowHelp(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-[#F5F2EC] text-[#292524] font-bold text-xs rounded-xl border border-[#E5E0D6] shadow-xs transition-all active:scale-95 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-[#78716C]" />
            <span className="hidden sm:inline">{t.help}</span>
          </button>

          {/* End Session Button */}
          {user && (
            <button
              onClick={() => setShowConfirmExit(true)}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#B91C1C] font-bold text-xs rounded-xl border border-[#FECACA] transition-all active:scale-95 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.endSession}</span>
            </button>
          )}
        </div>
      </header>

      {/* HELP MODAL */}
      {showHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/50 backdrop-blur-md p-6 animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 sm:p-10 max-w-md w-full shadow-2xl border border-[#EAE6DF] text-center animate-fade-in-scale">
            <div className="w-16 h-16 bg-[#FAF8F5] border border-[#EAE6DF] text-[#1C1917] rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xs">
              <HelpCircle className="w-8 h-8 text-[#0F766E]" />
            </div>
            <h2 className="text-2xl font-black text-[#1C1917] mb-2 tracking-tight">{t.helpModalTitle}</h2>
            <p className="text-[#78716C] text-sm mb-6 leading-relaxed">
              {t.helpModalDesc}
            </p>

            <div className="space-y-3 mb-8 text-left">
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF] flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#78716C] font-bold uppercase tracking-wider">{t.operator}</div>
                  <div className="text-[#1C1917] font-black text-xl tracking-tight mt-0.5">+998 73 555-00-11</div>
                </div>
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EAE6DF] flex items-center justify-center text-[#0F766E]">
                  <PhoneCall className="w-5 h-5" />
                </div>
              </div>
              <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF]">
                <div className="text-xs text-[#78716C] font-bold uppercase tracking-wider">Navbatchi xodim</div>
                <div className="text-[#292524] font-bold text-sm mt-0.5">{t.dutyStaff}</div>
              </div>
            </div>

            <button
              onClick={() => setShowHelp(false)}
              className="w-full py-4 px-6 rounded-2xl bg-[#1C1917] hover:bg-[#292524] active:scale-95 text-white font-bold text-sm transition-all cursor-pointer shadow-xs"
            >
              {t.understandClose}
            </button>
          </div>
        </div>
      )}

      {/* CONFIRM EXIT MODAL */}
      {showConfirmExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/50 backdrop-blur-md p-6 animate-fade-in">
          <div className="bg-white rounded-[32px] p-8 sm:p-10 max-w-md w-full shadow-2xl border border-[#EAE6DF] text-center animate-fade-in-scale">
            {/* Top Red Icon */}
            <div className="w-16 h-16 bg-[#FEF2F2] border border-[#FEE2E2] text-[#DC2626] rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xs">
              <LogOut className="w-7 h-7" />
            </div>

            <h2 className="text-2xl font-black text-[#1C1917] mb-2 tracking-tight">
              {t.exitConfirmTitle}
            </h2>

            <p className="text-sm text-[#78716C] leading-relaxed max-w-xs mx-auto mb-8 font-medium">
              {t.exitConfirmDesc}
            </p>

            {/* Action Buttons Side-by-Side */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmExit(false)}
                className="flex-1 min-h-[52px] py-3.5 px-6 rounded-2xl bg-[#F5F2EC] hover:bg-[#EAE6DF] text-[#292524] font-bold text-sm transition-all active:scale-95 cursor-pointer border border-[#E5E0D6] whitespace-nowrap shadow-2xs"
              >
                {t.cancel}
              </button>
              <button
                onClick={handleEndSession}
                className="flex-1 min-h-[52px] py-3.5 px-6 rounded-2xl bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold text-sm transition-all active:scale-95 cursor-pointer shadow-sm whitespace-nowrap"
              >
                {t.confirmExit}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
