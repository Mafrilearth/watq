import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Watq Documentation — Scientific Psychometrics & Architecture",
  description:
    "Comprehensive documentation of the Jungian 1921 cognitive assessment engine, scoring algorithms, and next-forge monorepo.",
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
        <div className="flex min-h-screen flex-col">{children}</div>
      </body>
    </html>
  );
}
