'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useKiosk } from '@/context/KioskContext';
import { KioskHeader } from '@/components/ui/KioskHeader';
import { VoiceAssistant } from '@/components/ui/VoiceAssistant';
import { getTranslation } from '@/lib/translations';
import { Bot, ArrowRight } from 'lucide-react';

export default function PersonalizedGreetingScreen() {
  const router = useRouter();
  const { user, language } = useKiosk();
  const t = getTranslation(language);

  useEffect(() => {
    if (!user) {
      router.push('/welcome');
    }
  }, [user, router]);

  if (!user) return null;

  const greetingText = t.greetingVoice.replace('{name}', user.name);

  return (
    <div className="gradient-page relative overflow-hidden flex flex-col min-h-screen pt-20 select-none">
      <KioskHeader title={t.greetingTitle} />

      <main className="flex flex-col items-center justify-center max-w-md mx-auto w-full my-auto text-center px-4 py-6 relative z-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#EAE6DF] w-full animate-fade-in-scale">
          {/* AI Avatar */}
          <div className="relative inline-block mb-4">
            <div className="w-16 h-16 bg-[#1C1917] rounded-2xl flex items-center justify-center text-white shadow-xs mx-auto animate-float">
              <Bot className="w-8 h-8" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-[#1C1917] mb-2 leading-snug tracking-tight">
            {t.greetingHello}, <span className="text-[#0F766E]">{user.name}</span>!
          </h1>

          <p className="text-xs sm:text-sm text-[#78716C] font-medium mb-6 max-w-sm mx-auto leading-relaxed">
            {t.greetingSubtitle}
          </p>

          {/* Voice Greeting Option */}
          <div className="flex justify-center mb-6">
            <VoiceAssistant textToSpeak={greetingText} autoSpeak={true} />
          </div>

          {/* Action Button */}
          <div className="w-full">
            <button
              type="button"
              onClick={() => router.push('/dashboard')}
              className="w-full py-3.5 px-6 bg-[#1C1917] hover:bg-[#292524] active:scale-[0.98] text-white font-bold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.goToDashboard}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
