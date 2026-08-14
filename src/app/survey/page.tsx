'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useKiosk } from '@/context/KioskContext';
import { Bot, CheckCircle2, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────── */
interface SurveyOption { id: string; label: string; }
interface SurveyStep {
  id: string;
  question: (name: string) => string;
  options: SurveyOption[];
}
interface ChatMessage { role: 'ai' | 'user'; text: string; }

/* ─── Survey Steps ───────────────────────────────────────── */
const SURVEY_STEPS: SurveyStep[] = [
  {
    id: 'goal',
    question: (name) => `Salom, ${name}! Men sizning shaxsiy AI yordamchingizman.\nBugun sizga nima kerak?`,
    options: [
      { id: 'language',   label: "Til o'rganmoqchiman" },
      { id: 'career',     label: "Kasb o'rganmoqchiman" },
      { id: 'migration',  label: "Xorijga chiqish haqida ma'lumot" },
      { id: 'psychology', label: "Psixologik ko'mak kerak" },
      { id: 'ai',         label: "AI imkoniyatlarini bilmoqchiman" },
    ],
  },
  {
    id: 'experience',
    question: () => "Yaxshi! Bu sohada tajribangiz qanday?",
    options: [
      { id: 'beginner',     label: "Yangi boshlovchiman" },
      { id: 'intermediate', label: "Biroz bilaman" },
      { id: 'advanced',     label: "Yaxshi bilaman, chuqurroq kerak" },
    ],
  },
  {
    id: 'time',
    question: () => "Ajoyib! Bugun qancha vaqtingiz bor?",
    options: [
      { id: '5',  label: "5 – 15 daqiqa" },
      { id: '15', label: "15 – 30 daqiqa" },
      { id: '30', label: "30 daqiqadan ko'p" },
    ],
  },
];

/* ─── Component ─────────────────────────────────────────── */
export default function SurveyPage() {
  const router   = useRouter();
  const { user } = useKiosk();

  const [stepIndex,    setStepIndex]    = useState(0);
  const [messages,     setMessages]     = useState<ChatMessage[]>([]);
  const [showOptions,  setShowOptions]  = useState(false);
  const [answers,      setAnswers]      = useState<Record<string, string>>({});
  const [finished,     setFinished]     = useState(false);
  const [redirecting,  setRedirecting]  = useState(false);
  const [hoveredOpt,   setHoveredOpt]   = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const userName  = user?.name ? user.name.replace(/[0-9]/g, '').trim() : "Do'stim";

  useEffect(() => { if (!user) router.push('/welcome'); }, [user, router]);

  /* First AI message */
  useEffect(() => {
    if (!user) return;
    const firstQ = SURVEY_STEPS[0].question(userName);
    setTimeout(() => {
      setMessages([{ role: 'ai', text: firstQ }]);
      setTimeout(() => setShowOptions(true), 400);
    }, 400);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  /* Auto-scroll to bottom */
  useEffect(() => {
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 80);
  }, [messages, showOptions, finished]);

  const handleSelect = (option: SurveyOption) => {
    const currentStep = SURVEY_STEPS[stepIndex];
    setAnswers(prev => ({ ...prev, [currentStep.id]: option.id }));
    setShowOptions(false);
    setHoveredOpt(null);

    setMessages(prev => [...prev, { role: 'user', text: option.label }]);

    const next = stepIndex + 1;
    if (next < SURVEY_STEPS.length) {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'ai', text: SURVEY_STEPS[next].question(userName) }]);
        setTimeout(() => { setStepIndex(next); setShowOptions(true); }, 300);
      }, 550);
    } else {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: 'ai',
          text: `Rahmat, ${userName}! Sizga mos yo'nalish va tavsiyalar tayyorlandi. Endi asosiy boshqaruv paneliga o'tamiz!`,
        }]);
        setFinished(true);
      }, 550);
    }
  };

  const handleGoToDashboard = () => {
    setRedirecting(true);
    setTimeout(() => router.push('/dashboard'), 600);
  };

  if (!user) return null;

  const progress = Math.round(((stepIndex + (finished ? 1 : 0)) / SURVEY_STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-[#F2ECE1] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#E8F3EE] rounded-full blur-3xl pointer-events-none" />

      {/* Main card */}
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-sm border border-[#EAE6DF] flex flex-col overflow-hidden"
           style={{ height: 'calc(100vh - 48px)', maxHeight: '680px' }}>

        {/* Header */}
        <div className="bg-[#FAF8F5] border-b border-[#EAE6DF] px-6 py-4 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-[#1C1917] rounded-xl flex items-center justify-center text-white shadow-xs">
            <Bot size={20} />
          </div>

          <div className="flex-1">
            <div className="text-[#1C1917] font-bold text-sm">Muqimiy AI Yordamchi</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
              <span className="text-[#0F766E] text-xs font-semibold">Faol tahlil</span>
            </div>
          </div>

          <div className="bg-white border border-[#E5E0D6] rounded-full px-3 py-1 text-xs font-bold text-[#78716C]">
            {Math.min(stepIndex + 1, SURVEY_STEPS.length)} / {SURVEY_STEPS.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-[#F0ECE4]">
          <div
            className="h-full bg-[#0F766E] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3.5 bg-white">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2.5 items-end ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              style={{ animation: 'fadeInUp 0.3s ease both' }}
            >
              {msg.role === 'ai' ? (
                <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] border border-[#EAE6DF] flex items-center justify-center text-[#1C1917] shrink-0">
                  <Bot size={16} />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-[#1C1917] flex items-center justify-center text-white font-bold text-xs shrink-0">
                  {userName[0]?.toUpperCase()}
                </div>
              )}

              <div
                className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'ai'
                    ? 'bg-[#FAF8F5] border border-[#EAE6DF] text-[#1C1917] rounded-bl-xs font-medium'
                    : 'bg-[#1C1917] text-white rounded-br-xs font-semibold'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Options */}
          {showOptions && !finished && (
            <div className="pl-10 flex flex-col gap-2" style={{ animation: 'fadeInUp 0.3s ease both' }}>
              {SURVEY_STEPS[stepIndex].options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt)}
                  onMouseEnter={() => setHoveredOpt(opt.id)}
                  onMouseLeave={() => setHoveredOpt(null)}
                  className="text-left px-4 py-3 bg-white border border-[#E5E0D6] hover:border-[#1C1917] hover:bg-[#FAF8F5] text-[#292524] font-semibold text-sm rounded-xl transition-all active:scale-[0.98] cursor-pointer flex items-center justify-between shadow-2xs"
                >
                  <span>{opt.label}</span>
                  <ChevronRight size={16} className="text-[#A8A29E]" />
                </button>
              ))}
            </div>
          )}

          {/* Finished state */}
          {finished && (
            <div className="pl-10" style={{ animation: 'fadeInUp 0.4s ease both' }}>
              <div className="bg-[#FAF8F5] border border-[#EAE6DF] rounded-2xl p-5 flex flex-col gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#F0FDFA] border border-[#99F6E4] text-[#0F766E] flex items-center justify-center">
                    <CheckCircle2 size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1C1917]">Tahlil yakunlandi!</div>
                    <div className="text-xs text-[#78716C]">Siz uchun barcha 5 ta yo'nalish tayyor</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(answers).map(([key, val]) => (
                    <span key={key} className="px-2.5 py-1 bg-white border border-[#E5E0D6] text-[#44403C] text-[11px] font-bold rounded-lg">
                      {SURVEY_STEPS.find(s => s.id === key)?.options.find(o => o.id === val)?.label}
                    </span>
                  ))}
                </div>

                <button
                  onClick={handleGoToDashboard}
                  disabled={redirecting}
                  className="w-full min-h-[54px] py-3.5 px-5 bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:to-teal-600 text-white font-black text-sm sm:text-base rounded-2xl transition-all shadow-md flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
                >
                  {redirecting ? (
                    <>
                      <Sparkles size={18} className="animate-spin" />
                      <span>Yuklanmoqda...</span>
                    </>
                  ) : (
                    <>
                      <span>Asosiy bo'limga o'tish</span>
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
