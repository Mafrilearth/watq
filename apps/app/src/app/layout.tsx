import { AnalyticsProvider } from "@watq/analytics";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Watq Studio — Cognitive Workspace",
  description:
    "Enterprise cognitive management, psychological profile tracking, and team diagnostics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${jakarta.variable} min-h-screen bg-[#08090C] text-slate-100 antialiased selection:bg-[#D4F024] selection:text-[#08090C]`}
      >
        <AnalyticsProvider>
          <div className="flex min-h-screen flex-col">{children}</div>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
