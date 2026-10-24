"use client";

import React, { useState } from "react";
import { generateCollaborationManual } from "@watq/core";
import { Check, Copy, FileText, Sparkles, X } from "lucide-react";
import { toast } from "sonner";

interface CollaborationManualModalProps {
  isOpen: boolean;
  onClose: () => void;
  typeCode: string;
  callsign?: string;
  userName?: string;
}

export function CollaborationManualModal({
  isOpen,
  onClose,
  typeCode,
  callsign,
  userName = "Collaborator",
}: CollaborationManualModalProps) {
  const [copied, setCopied] = useState<boolean>(false);

  if (!isOpen) return null;

  const manual = generateCollaborationManual(typeCode, callsign);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(manual.markdownContent);
      setCopied(true);
      toast.success("Collaboration README copied to clipboard!", {
        description: "Paste into your GitHub profile, Notion, or Slack bio.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy manual");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#0D111A] border border-white/[0.1] rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl relative overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#D4F024]/10 border border-[#D4F024]/20 flex items-center justify-center text-[#D4F024]">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-[#D4F024] uppercase tracking-wider">
                <Sparkles className="w-3 h-3" />
                <span>ENTERPRISE COLLABORATION README</span>
              </div>
              <h2 className="text-lg font-bold text-white font-display">
                How to Work with {userName} — {typeCode}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-sm text-slate-300 leading-relaxed font-sans">
          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Working Pace &amp; Style:
              </span>
              <p className="text-xs text-white font-medium">{manual.workingStyle}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Communication Vector:
              </span>
              <p className="text-xs text-white font-medium">{manual.communicationStyle}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Feedback Protocol:
              </span>
              <p className="text-xs text-white font-medium">{manual.howToGiveFeedback}</p>
            </div>
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
              <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">
                Decision Making:
              </span>
              <p className="text-xs text-white font-medium">{manual.decisionMakingStyle}</p>
            </div>
          </div>

          {/* Raw Markdown Preview Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">
                Markdown Source (Formatted for GitHub / Notion):
              </span>
              <span className="text-[10px] font-mono text-slate-500">README.md</span>
            </div>
            <pre className="p-4 rounded-2xl bg-black/50 border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto whitespace-pre-wrap max-h-60 selection:bg-[#D4F024] selection:text-[#08090C]">
              {manual.markdownContent}
            </pre>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-white/[0.08] flex items-center justify-between bg-black/20">
          <span className="text-xs font-mono text-slate-500 hidden sm:inline-block">
            Generates standardized cross-functional onboarding docs.
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleCopy}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#D4F024] text-[#08090C] hover:bg-[#E2FE52] transition-all shadow-md shadow-[#D4F024]/10"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied Markdown!" : "Copy README.md"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
