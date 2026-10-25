"use client";

import { Input } from "@/components/ui/input";
import { useUIStore } from "@/lib/stores/uiStore";
import Fuse from "fuse.js";
import { Briefcase, GraduationCap, Search } from "lucide-react";
import { parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";

interface VocationalSearchProps {
  careers: string[];
  majors: string[];
}

interface Item {
  title: string;
  type: "Career" | "College Major";
}

export function VocationalSearch({ careers, majors }: VocationalSearchProps) {
  const { locale } = useUIStore();
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({
      shallow: true,
      throttleMs: 300,
      clearOnDefault: true,
    }),
  );

  const allItems: Item[] = useMemo(() => {
    const c = careers.map((title) => ({ title, type: "Career" as const }));
    const m = majors.map((title) => ({ title, type: "College Major" as const }));
    return [...c, ...m];
  }, [careers, majors]);

  const fuse = useMemo(
    () =>
      new Fuse(allItems, {
        keys: ["title", "type"],
        threshold: 0.35, // Typo-tolerant matching
        distance: 100,
      }),
    [allItems],
  );

  const results = useMemo(() => {
    if (!query.trim()) return allItems;
    return fuse.search(query).map((res) => res.item);
  }, [query, fuse, allItems]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input
          type="text"
          placeholder={
            locale === "id"
              ? "Cari karir atau jurusan (misal: Desain, Data, Manajemen, Arsitek)..."
              : "Search careers and majors (e.g., Architect, Engineer, Systems, Design)..."
          }
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-[#0C0E14] border-white/10 text-xs focus-visible:border-[#D4F024]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-72 overflow-y-auto pr-1">
        {results.length > 0 ? (
          results.map((item) => (
            <div
              key={`${item.type}-${item.title}`}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between hover:bg-white/[0.06] transition-colors"
            >
              <div className="flex items-center gap-2.5 truncate">
                {item.type === "Career" ? (
                  <Briefcase className="w-3.5 h-3.5 text-[#D4F024] shrink-0" />
                ) : (
                  <GraduationCap className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                )}
                <span className="text-xs text-slate-200 truncate font-medium">{item.title}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider shrink-0 ml-2">
                {item.type === "Career"
                  ? locale === "id"
                    ? "Karir"
                    : "Career"
                  : locale === "id"
                    ? "Jurusan"
                    : "Major"}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-2 py-6 text-center text-xs text-slate-500 font-mono">
            {locale === "id"
              ? `Tidak ditemukan hasil yang cocok untuk "${query}"`
              : `No matching options found for "${query}"`}
          </div>
        )}
      </div>
    </div>
  );
}
