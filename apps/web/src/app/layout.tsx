import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import "@c15t/nextjs/styles.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ConsentManager } from "@/components/privacy/ConsentManager";
import { AnalyticsProvider } from "@watq/analytics";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Toaster } from "@watq/design-system";
import { VercelToolbar } from "@vercel/toolbar/next";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://watq.mafrilearth.com"),
  title: {
    default: "Watq — Personality Decoded",
    template: "%s | Watq",
  },
  description:
    "Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.",
  keywords: [
    "Watq",
    "Personality Decoded",
    "cognitive assessment",
    "personality test",
    "16 personality types",
    "psychometrics",
    "jungian typology",
    "cognitive typology",
    "career trajectories",
    "college major recommendations",
    "free personality test",
  ],
  authors: [{ name: "Watq Team", url: "https://watq.mafrilearth.com" }],
  creator: "Watq",
  publisher: "Watq",
  alternates: {
    canonical: "https://watq.mafrilearth.com",
  },
  icons: {
    icon: "/brand/watq-favicon.svg",
    shortcut: "/brand/watq-favicon.svg",
    apple: "/brand/watq-app-icon.svg",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "axxY_kb9E9Ehzoo8SORatzCeFY9i9Qmotgxn2P9UPZ4",
  },
  openGraph: {
    title: "Watq — Personality Decoded",
    description:
      "Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.",
    url: "https://watq.mafrilearth.com",
    siteName: "Watq",
    images: [
      {
        url: "/brand/watq-logo-full.svg",
        width: 1200,
        height: 630,
        alt: "Watq — Personality Decoded",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Watq — Personality Decoded",
    description:
      "Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.",
    images: ["/brand/watq-logo-full.svg"],
    creator: "@watq",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://watq.mafrilearth.com/#webapp",
      name: "Watq",
      alternateName: "Watq — Personality Decoded",
      url: "https://watq.mafrilearth.com",
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      browserRequirements: "Requires JavaScript. Requires HTML5.",
      description:
        "Modern cognitive assessment engine decoding human personality traits with mathematical precision and instant clarity for educational and career trajectory guidance.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://watq.mafrilearth.com/#organization",
      name: "Watq",
      url: "https://watq.mafrilearth.com",
      logo: "https://watq.mafrilearth.com/brand/watq-logo-full.svg",
    },
    {
      "@type": "FAQPage",
      "@id": "https://watq.mafrilearth.com/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Watq?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Watq is a sovereign, model-agnostic cognitive assessment platform that decodes human personality traits with mathematical precision and maps results to global educational (UNESCO ISCED-F 2013) and career (ILO ISCO-08) trajectories.",
          },
        },
        {
          "@type": "Question",
          name: "Is Watq free and private?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Watq operates 100% client-side with zero database storage requirements, encrypting all sessions directly within your browser via the Web Crypto API without selling or storing personal data.",
          },
        },
        {
          "@type": "Question",
          name: "What psychological standard does Watq use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The reference instrument is grounded in Carl Gustav Jung's 1921 Cognitive Typology (16 Cognitive Types) across 4 bipolar dimensions: Extraversion-Introversion, Sensing-Intuition, Thinking-Feeling, and Judging-Perceiving.",
          },
        },
      ],
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
      className={`dark h-full antialiased ${plusJakartaSans.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="min-h-full flex flex-col bg-[#08090C] text-[#F8FAFC]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AnalyticsProvider>
          <NuqsAdapter>
            <ConsentManager>
              <TooltipProvider delayDuration={150}>{children}</TooltipProvider>
              <Toaster position="bottom-right" richColors closeButton />
            </ConsentManager>
          </NuqsAdapter>
        </AnalyticsProvider>
        {process.env.NODE_ENV === "development" &&
          Boolean(process.env.VERCEL_ENV || process.env.VERCEL_TOOLBAR) && (
            <VercelToolbar />
          )}
      </body>
    </html>
  );
}
