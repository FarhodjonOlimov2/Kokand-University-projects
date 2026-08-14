'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useKiosk } from '@/context/KioskContext';
import { KioskHeader } from '@/components/ui/KioskHeader';
import { VoiceAssistant } from '@/components/ui/VoiceAssistant';
import { generateAIResponse, AIMessage } from '@/lib/ai/aiService';
import { HeartHandshake, Send, Bot, User, ShieldAlert } from 'lucide-react';

export default function PsychologyChatScreen() {
  const { user } = useKiosk();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: 'assistant',
      content: `Assalomu alaykum, ${user?.name || 'Foydalanuvchi'}! Bugun o'zingizni qanday his qilyapsiz? Qanday masala ruhiyatingizni bezovta qilmoqda? Men sizni tinglashga va samimiy maslahat berishga tayyorman.`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const newMessages: AIMessage[] = [...messages, { role: 'user', content: query.trim() }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const reply = await generateAIResponse(newMessages, user, 'psychology');
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Kechirasiz, xizmatni yuklashda muammo yuz berdi. Qayta urinib ko‘ring.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="gradient-page relative flex flex-col h-screen overflow-hidden pt-20 pb-4 px-4 sm:px-8 select-none">
      <KioskHeader title="Psixologik Suhbat AI" />

      <main className="w-full max-w-[1600px] mx-auto flex-1 flex flex-col h-full min-h-0">
        {/* DISCLAIMER BANNER */}
        <div className="p-3 bg-white border border-[#EAE6DF] rounded-2xl text-[#78716C] text-xs font-medium flex items-center justify-between gap-2 mb-3 shadow-2xs">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#D97706] shrink-0" />
            <span>AI klinik tashxis bermaydi. Shoshilinch ruhiy holatda inson mutaxassisiga murojaat qiling.</span>
          </div>
        </div>

        {/* FULL SCREEN CHAT WINDOW */}
        <div className="flex-1 bg-white rounded-3xl border border-[#EAE6DF] shadow-sm flex flex-col overflow-hidden min-h-0">
          {/* MESSAGES LIST */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3.5 items-end ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-10 h-10 bg-[#FAF8F5] border border-[#EAE6DF] rounded-2xl flex items-center justify-center text-[#0F766E] shrink-0 shadow-2xs">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] px-5 py-4 rounded-3xl text-base sm:text-lg leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-[#1C1917] text-white rounded-br-xs font-semibold'
                      : 'bg-[#FAF8F5] border border-[#EAE6DF] text-[#1C1917] rounded-bl-xs font-medium whitespace-pre-line'
                  }`}
                >
                  {msg.content}
                </div>

                {msg.role === 'user' && (
                  <div className="w-10 h-10 bg-[#1C1917] rounded-2xl flex items-center justify-center text-white shrink-0 font-bold text-sm shadow-2xs">
                    <User className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#FAF8F5] border border-[#EAE6DF] rounded-2xl flex items-center justify-center text-[#0F766E] shrink-0">
                  <Bot className="w-5 h-5 animate-spin-slow" />
                </div>
                <div className="px-5 py-3 bg-[#FAF8F5] rounded-2xl border border-[#EAE6DF] text-sm text-[#78716C] font-semibold">
                  Javob yozilmoqda...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* INPUT BAR */}
          <div className="p-4 sm:p-5 bg-white border-t border-[#EAE6DF] flex gap-3 items-center shrink-0">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Fikringizni yozing..."
              className="flex-1 min-h-[54px] max-h-[120px] px-5 py-3.5 border border-[#E5E0D6] focus:border-[#1C1917] rounded-2xl text-base sm:text-lg font-medium text-[#1C1917] outline-none resize-none bg-[#FAF8F5]"
              rows={1}
            />

            <VoiceAssistant onSpeechResult={(transcript) => handleSend(transcript)} />

            <button
              onClick={() => handleSend()}
              className="w-14 h-14 rounded-2xl bg-[#1C1917] hover:bg-[#292524] active:scale-95 text-white flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-xs"
              title="Yuborish"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
