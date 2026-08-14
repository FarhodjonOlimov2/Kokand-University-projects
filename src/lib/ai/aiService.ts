import { UserProfile } from '@/types';

export interface AIMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

/**
 * Sends chat messages to /api/chat which calls Groq (primary) or Gemini (fallback).
 * If API is unavailable, falls back to local demo responses.
 */
export async function generateAIResponse(
  messages: AIMessage[],
  user: UserProfile | null,
  contextModule: 'general' | 'language' | 'career' | 'migration' | 'psychology' = 'general'
): Promise<string> {
  const userName = user?.name || 'Foydalanuvchi';
  const userAge = user?.age || 20;

  // Add context hint to the last user message for the AI
  const enhancedMessages = [...messages];
  if (contextModule !== 'general' && enhancedMessages.length > 0) {
    const contextHints: Record<string, string> = {
      language: `[Kontekst: Foydalanuvchi til o'rganish bo'limida. Tillar va ta'lim haqida javob ber.]`,
      career: `[Kontekst: Foydalanuvchi kasb o'rganish bo'limida. Kasblar va ko'nikmalar haqida javob ber.]`,
      migration: `[Kontekst: Foydalanuvchi migratsiya bo'limida. Rasmiy migratsiya va xorijda ishlash/o'qish haqida javob ber. Faqat rasmiy manbalarni tavsiya et.]`,
      psychology: `[Kontekst: Foydalanuvchi psixologik ko'mak bo'limida. Samimiy, ehtiyotkor va qo'llab-quvvatlovchi ohangda javob ber. Klinik tashxis qo'yma.]`,
    };

    const lastMsg = enhancedMessages[enhancedMessages.length - 1];
    if (lastMsg.role === 'user') {
      enhancedMessages[enhancedMessages.length - 1] = {
        ...lastMsg,
        content: `${contextHints[contextModule] || ''}\n\nFoydalanuvchi: ${userName}, ${userAge} yosh.\n\n${lastMsg.content}`,
      };
    }
  }

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: enhancedMessages,
        userName,
        userAge,
      }),
    });

    if (!response.ok) {
      throw new Error(`API responded with ${response.status}`);
    }

    const data = await response.json();
    return data.reply || 'Javob olinmadi.';
  } catch (error) {
    console.warn('API call failed, using local demo fallback:', error);
    return generateLocalFallback(messages, userName, userAge, contextModule);
  }
}

/**
 * Local demo fallback when API is unavailable
 */
function generateLocalFallback(
  messages: AIMessage[],
  userName: string,
  userAge: number,
  contextModule: string
): string {
  const lastUserMessage = messages[messages.length - 1]?.content || '';
  const queryLower = lastUserMessage.toLowerCase();

  // Child safety
  if (userAge <= 12) {
    const unsafeWords = ['urush', 'qurol', 'zorlik'];
    if (unsafeWords.some(w => queryLower.includes(w))) {
      return `Salom ${userName}! Keling, bilim va ijodiy g'oyalar haqida suhbatlashamiz! 🌟`;
    }
  }

  if (contextModule === 'psychology') {
    if (queryLower.includes('depressiya') || queryLower.includes('stress') || queryLower.includes('tushkunlik')) {
      return `Salom ${userName}. Stress sezayotganingiz tabiiy holat.\n\n📌 **Tavsiyalar:**\n1. 20-30 daqiqa toza havoda sayr qiling.\n2. Chuqur nafas mashqini bajaring.\n3. Yaqinlaringiz bilan suhbatlashing.\n\n⚠️ *Agar bosim davom etsa, mutaxassisga murojaat qiling.*`;
    }
    return `Assalomu alaykum ${userName}. Sizni eshitayapman. Qaysi masala bo'yicha fikr almashmoqchisiz?`;
  }

  if (contextModule === 'migration') {
    return `Salom ${userName}. Xorijga chiqishdan oldin faqat rasmiy manbalardan foydalaning. Qaysi davlat sizni qiziqtirmoqda?`;
  }

  if (contextModule === 'career') {
    return `Assalomu alaykum ${userName}! ${userAge} yoshingizda zamonaviy IT kasblarni egallashingiz juda zo'r!\n\n🚀 **Tavsiyalar:**\n- Web Development\n- Grafik Dizayn / UI UX\n- AI Prompt Engineering`;
  }

  if (contextModule === 'language') {
    return `Assalomu alaykum ${userName}! Xorijiy tillarni o'rganish kelajak uchun muhim! 🌍\n\n"Ibrat Farzandlari" loyihasi orqali bepul o'rganishingiz mumkin.`;
  }

  if (queryLower.includes('salom') || queryLower.includes('assalom')) {
    return `Salom ${userName}! Men Muqimiy "Aql Markazi" AI yordamchisiman. Sizga yordam beraman! Nimadan boshlaymiz?`;
  }

  return `Yaxshi savol, ${userName}! AI tizimimiz bu borada sizga tavsiyalar beradi. Yana nima kerak?`;
}
