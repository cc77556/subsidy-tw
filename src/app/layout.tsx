import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: '補助通 — 台灣政府補助一站查到底',
    template: '%s | 補助通',
  },
  description:
    '補助通彙整台灣各項政府補助資訊，包含租屋補貼、育兒津貼、節能家電、就業獎勵等，幫助你快速找到適合的補助方案並了解申請方式。',
  keywords: [
    '台灣補助',
    '政府補助',
    '租金補貼',
    '育兒津貼',
    '節能家電補助',
    '就業獎勵',
    '補助查詢',
    '補助通',
  ],
  openGraph: {
    title: '補助通 — 台灣政府補助一站查到底',
    description:
      '彙整 20+ 項台灣政府補助，涵蓋租屋、育兒、節能、就業、醫療、旅遊、社福七大類別。',
    type: 'website',
    locale: 'zh_TW',
    siteName: '補助通 SubsidyTW',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            }
          } catch(e) {}
        `}} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: '"Noto Sans TC", sans-serif' }}>
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 text-gray-900 dark:text-slate-100">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
