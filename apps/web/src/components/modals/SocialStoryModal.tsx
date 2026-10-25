"use client";

import React, { useState } from "react";
import { WatqPrismMark, WatqFullLogo } from "@/components/brand/WatqLogo";
import { Check, Copy, Share2, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

interface SocialStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  typeCode: string;
  archetypeTitle: string;
  callsign?: string;
  temperament?: string;
  summary: string;
}

export function SocialStoryModal({
  isOpen,
  onClose,
  typeCode,
  archetypeTitle,
  callsign,
  temperament,
  summary,
}: SocialStoryModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const shareText = `🧠 Just decoded my cognitive architecture on Watq!
✨ Verified Archetype: ${typeCode} — ${archetypeTitle}
⚡ Callsign: ${callsign || "Sovereign"}
🏛️ Class: ${temperament || "Jungian Typology"}

Decode yours in 3 minutes (100% private & instant):
https://watq.mafrilearth.com`;

  const handleCopyText = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Story caption copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy caption");
    }
  };

  const handleNativeShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Watq Cognitive Report — ${typeCode}`,
          text: shareText,
          url: "https://watq.mafrilearth.com",
        });
        toast.success("Story shared successfully!");
        return;
      } catch {
        // Fallback
      }
    }
    handleCopyText();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#0D111A] border border-white/[0.1] rounded-3xl max-w-sm w-full flex flex-col shadow-2xl relative overflow-hidden">
        {/* Top Bar */}
        <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#D4F024]" />
            <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
              9:16 Social Story Card
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 9:16 Canvas Card Preview */}
        <div className="p-4 flex items-center justify-center bg-black/40">
          <div className="w-[280px] aspect-[9/16] rounded-2xl bg-gradient-to-b from-[#121622] via-[#090C12] to-[#040608] border border-white/[0.12] p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none">
            {/* Top Glow & Watermark */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4F024]/15 rounded-full blur-3xl pointer-events-none" />

            {/* Card Header */}
            <div className="relative z-10 flex items-center justify-between">
              <WatqFullLogo markSize={20} showTagline={false} />
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4F024] bg-[#D4F024]/10 border border-[#D4F024]/20 px-2 py-0.5 rounded-full">
                VERIFIED
              </span>
            </div>

            {/* Center Typology Hero */}
            <div className="relative z-10 text-center my-auto py-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-[#D4F024]/10 border border-[#D4F024]/20 flex items-center justify-center shadow-lg shadow-[#D4F024]/10">
                <WatqPrismMark size={32} />
              </div>

              <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">
                COGNITIVE ARCHETYPE
              </div>
              <h3 className="text-4xl font-black font-display text-white tracking-tight leading-none mb-1">
                {typeCode}
              </h3>
              <div className="text-sm font-bold text-[#D4F024] font-display">{archetypeTitle}</div>

              {callsign && (
                <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4F024]" />
                  <span>Callsign: {callsign}</span>
                </div>
              )}

              <p className="text-[10px] text-slate-400 mt-3 line-clamp-3 leading-relaxed px-1">
                {summary}
              </p>
            </div>

            {/* Card Footer */}
            <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[9px] font-mono text-slate-500">
              <span>watq.mafrilearth.com</span>
              <span className="text-[#D4F024]">Personality Decoded.</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-4 border-t border-white/[0.08] flex items-center gap-2 bg-black/20">
          <button
            onClick={handleCopyText}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/[0.05] border border-white/[0.1] text-xs font-mono font-semibold text-slate-200 hover:bg-white/[0.1] transition-all"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            <span>{copied ? "Copied" : "Copy Caption"}</span>
          </button>
          <button
            onClick={handleNativeShare}
            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#D4F024] text-[#08090C] text-xs font-mono font-bold hover:bg-[#E2FE52] transition-all shadow-md shadow-[#D4F024]/10"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Story</span>
          </button>
        </div>
      </div>
    </div>
  );
}
