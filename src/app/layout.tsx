import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://watq.mafrilearth.com'),
  title: 'Watq — Personality Decoded',
  description:
    'Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.',
  icons: {
    icon: '/brand/watq-favicon.svg',
    shortcut: '/brand/watq-favicon.svg',
    apple: '/brand/watq-app-icon.svg',
  },
  openGraph: {
    title: 'Watq — Personality Decoded',
    description:
      'Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.',
    url: 'https://watq.mafrilearth.com',
    siteName: 'Watq',
    images: [
      {
        url: '/brand/watq-logo-full.svg',
        width: 1200,
        height: 630,
        alt: 'Watq — Personality Decoded',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark h-full antialiased ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#090D16] text-[#F8FAFC]">
        {children}
      </body>
    </html>
  );
}
