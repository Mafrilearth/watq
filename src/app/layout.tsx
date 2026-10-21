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
  title: {
    default: 'Watq — Personality Decoded',
    template: '%s | Watq',
  },
  description:
    'Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.',
  keywords: [
    'Watq',
    'Personality Decoded',
    'cognitive assessment',
    'personality test',
    '16 personality types',
    'psychometrics',
    'jungian typology',
    'cognitive typology',
    'career trajectories',
    'college major recommendations',
    'free personality test',
  ],
  authors: [{ name: 'Watq Team', url: 'https://watq.mafrilearth.com' }],
  creator: 'Watq',
  publisher: 'Watq',
  alternates: {
    canonical: 'https://watq.mafrilearth.com',
  },
  icons: {
    icon: '/brand/watq-favicon.svg',
    shortcut: '/brand/watq-favicon.svg',
    apple: '/brand/watq-app-icon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'axxY_kb9E9Ehzoo8SORatzCeFY9i9Qmotgxn2P9UPZ4',
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
  twitter: {
    card: 'summary_large_image',
    title: 'Watq — Personality Decoded',
    description:
      'Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.',
    images: ['/brand/watq-logo-full.svg'],
    creator: '@watq',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://watq.mafrilearth.com/#webapp',
      name: 'Watq',
      alternateName: 'Watq — Personality Decoded',
      url: 'https://watq.mafrilearth.com',
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description:
        'Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://watq.mafrilearth.com/#organization',
      name: 'Watq',
      url: 'https://watq.mafrilearth.com',
      logo: 'https://watq.mafrilearth.com/brand/watq-logo-full.svg',
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
