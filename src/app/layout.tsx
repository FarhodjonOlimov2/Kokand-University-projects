import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Outfit } from 'next/font/google';
import './globals.css';
import { KioskProvider } from '@/context/KioskContext';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Muqimiy Aql Markazi',
  description: 'Bilim. Kasb. Til. Ko\'mak. AI. — Mahalla fuqarolari uchun zamonaviy raqamli xizmatlar markazi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="antialiased bg-slate-50 text-slate-900 font-jakarta">
        <KioskProvider>{children}</KioskProvider>
      </body>
    </html>
  );
}
