import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Crimson_Text, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { TopHeader } from '@/components/layout/TopHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toaster } from '@/lib/hooks/useToast';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const crimson = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'LinguaFlow – English Practice',
  description: 'Master English with structured daily practice across Reading, Writing, Listening, and Speaking.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LinguaFlow',
  },
  icons: {
    icon: '/icons/icon-192.png',
    apple: '/icons/icon-180.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#1A2744',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${crimson.variable} ${jetbrains.variable}`}
    >
      <body className="overflow-hidden h-dvh flex flex-col bg-brand-cream">
        <TopHeader />
        <main
          id="main-content"
          className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth"
          style={{ paddingBottom: 'calc(var(--nav-height) + 1rem)' }}
        >
          {children}
        </main>
        <BottomNav />
        <Toaster />
      </body>
    </html>
  );
}
