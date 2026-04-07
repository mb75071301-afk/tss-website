/**
 * ScheduleSection — R1 2026 Race Weekend Timetable
 * Saturday (Qualifying + Sprint) & Sunday (Warm-Up + Race)
 * Tabbed layout with motorsport-style dark design
 */
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ScheduleRow {
  start: string;
  end: string;
  section: string;
  sectionZh: string;
  cls: string;
  laps: string;
  isBreak?: boolean;
}

const SATURDAY: ScheduleRow[] = [
  { start: "09:00", end: "09:15", section: "Qualifying", sectionZh: "排位賽", cls: "Super Stock 150 (ST150)", laps: "15 mins" },
  { start: "09:25", end: "09:40", section: "Qualifying", sectionZh: "排位賽", cls: "Super Stock 250 (ST250)\nSuper Sport 250 (SP250)", laps: "15 mins" },
  { start: "09:50", end: "10:05", section: "Qualifying", sectionZh: "排位賽", cls: "Super Stock 300 (ST300)", laps: "15 mins" },
  { start: "10:15", end: "10:30", section: "Qualifying", sectionZh: "排位賽", cls: "Super Stock 400 (ST400)\nSuper Sport 400 (SP400)", laps: "15 mins" },
  { start: "10:40", end: "10:55", section: "Qualifying", sectionZh: "排位賽", cls: "Super Sport 300 (SP300)", laps: "15 mins" },
  { start: "11:05", end: "11:20", section: "Qualifying", sectionZh: "排位賽", cls: "Super Sport 150 (SP150)", laps: "15 mins" },
  { start: "11:30", end: "11:50", section: "Free Practice 1", sectionZh: "自由練習 1", cls: "Super Pole 1000", laps: "20 mins" },
  { start: "12:00", end: "13:20", section: "LUNCH", sectionZh: "午休時間", cls: "", laps: "", isBreak: true },
  { start: "13:30", end: "13:50", section: "Sprint Race", sectionZh: "衝刺賽", cls: "Super Stock 150 (ST150A&B)", laps: "5 Laps" },
  { start: "13:55", end: "14:15", section: "Sprint Race", sectionZh: "衝刺賽", cls: "Super Stock 250 (ST250A)\nSuper Sport 250 (SP250A)", laps: "5 Laps" },
  { start: "14:20", end: "14:40", section: "Sprint Race", sectionZh: "衝刺賽", cls: "Super Stock 300 (ST300A&B)", laps: "5 Laps" },
  { start: "14:45", end: "15:05", section: "Sprint Race", sectionZh: "衝刺賽", cls: "Super Stock 400 (ST400A)\nSuper Sport 400 (SP400A)", laps: "5 Laps" },
  { start: "15:10", end: "15:30", section: "Sprint Race", sectionZh: "衝刺賽", cls: "Super Sport 300 (SP300A&B)", laps: "5 Laps" },
  { start: "15:35", end: "15:55", section: "Sprint Race", sectionZh: "衝刺賽", cls: "Super Sport 150 (SP150A)", laps: "5 Laps" },
  { start: "16:00", end: "16:20", section: "Free Practice 2", sectionZh: "自由練習 2", cls: "Super Pole 1000", laps: "20 mins" },
  { start: "16:25", end: "16:55", section: "AWARDS", sectionZh: "頒獎", cls: "", laps: "", isBreak: true },
];

const SUNDAY: ScheduleRow[] = [
  { start: "09:00", end: "09:10", section: "Warm-Up", sectionZh: "暖身", cls: "Super Stock 150 (ST150A&B)", laps: "10 mins" },
  { start: "09:15", end: "09:25", section: "Warm-Up", sectionZh: "暖身", cls: "Super Stock 250 (ST250A)\nSuper Sport 250 (SP250A)", laps: "10 mins" },
  { start: "09:30", end: "09:40", section: "Warm-Up", sectionZh: "暖身", cls: "Super Stock 300 (ST300A&B)", laps: "10 mins" },
  { start: "09:45", end: "09:55", section: "Warm-Up", sectionZh: "暖身", cls: "Super Stock 400 (ST400A)\nSuper Sport 400 (SP400A)", laps: "10 mins" },
  { start: "10:00", end: "10:10", section: "Warm-Up", sectionZh: "暖身", cls: "Super Sport 300 (SP300A&B)", laps: "10 mins" },
  { start: "10:15", end: "10:25", section: "Warm-Up", sectionZh: "暖身", cls: "Super Sport 150 (SP150A)", laps: "10 mins" },
  { start: "10:30", end: "10:45", section: "Super Pole 1", sectionZh: "超級桿位 1", cls: "Super Pole 1000", laps: "15 mins" },
  { start: "10:50", end: "11:15", section: "Race", sectionZh: "正賽", cls: "Super Stock 150 (ST150A&B)", laps: "7 Laps" },
  { start: "11:20", end: "11:45", section: "Race", sectionZh: "正賽", cls: "Super Stock 250 (ST250A)\nSuper Sport 250 (SP250A)", laps: "7 Laps" },
  { start: "12:00", end: "13:20", section: "LUNCH", sectionZh: "午休時間", cls: "", laps: "", isBreak: true },
  { start: "13:30", end: "13:55", section: "Race", sectionZh: "正賽", cls: "Super Stock 300 (ST300A&B)", laps: "7 Laps" },
  { start: "14:00", end: "14:25", section: "Race", sectionZh: "正賽", cls: "Super Stock 400 (ST400A)\nSuper Sport 400 (SP400A)", laps: "7 Laps" },
  { start: "14:30", end: "14:55", section: "Race", sectionZh: "正賽", cls: "Super Sport 300 (SP300A&B)", laps: "7 Laps" },
  { start: "15:00", end: "15:25", section: "Race", sectionZh: "正賽", cls: "Super Sport 150 (SP150A)", laps: "7 Laps" },
  { start: "15:30", end: "15:45", section: "Super Pole 2", sectionZh: "超級桿位 2", cls: "Super Pole 1000", laps: "15 mins" },
  { start: "16:00", end: "16:30", section: "AWARDS", sectionZh: "頒獎", cls: "", laps: "", isBreak: true },
];

function getSectionColor(section: string): string {
  if (section.includes("Race") || section.includes("Sprint")) return "text-red-400";
  if (section.includes("Qualifying")) return "text-yellow-400";
  if (section.includes("Warm") || section.includes("Practice")) return "text-blue-400";
  if (section.includes("Pole")) return "text-purple-400";
  return "text-white/60";
}

function getSectionBadgeBg(section: string): string {
  if (section.includes("Race") || section.includes("Sprint")) return "bg-red-500/20 border-red-500/30";
  if (section.includes("Qualifying")) return "bg-yellow-500/20 border-yellow-500/30";
  if (section.includes("Warm") || section.includes("Practice")) return "bg-blue-500/20 border-blue-500/30";
  if (section.includes("Pole")) return "bg-purple-500/20 border-purple-500/30";
  return "bg-white/10 border-white/10";
}

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<"sat" | "sun">("sat");
  const { language } = useLanguage();
  const isZh = language === "zh";

  const rows = activeDay === "sat" ? SATURDAY : SUNDAY;

  return (
    <section id="schedule" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12 bg-red-500" />
            <span className="text-red-500 font-heading text-xs tracking-[0.3em] uppercase">
              Schedule
            </span>
            <div className="h-px w-12 bg-red-500" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
            {isZh ? "賽程表" : "Race "}<span className="text-red-500">{isZh ? "" : "Schedule"}</span>
          </h2>
          <p className="text-white/40 mt-3 text-sm tracking-wide">
            2026 TSS Round 1 — {isZh ? "大鵬灣國際賽車場" : "DaPeng Bay International Circuit"}
          </p>
        </div>

        {/* Day tabs */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveDay("sat")}
            className={`
              px-6 py-2.5 rounded-lg font-heading text-sm tracking-[0.15em] transition-all
              ${activeDay === "sat"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/80 border border-white/[0.08]"
              }
            `}
          >
            {isZh ? "週六 4/11" : "SAT 4/11"}
            <span className="block text-[10px] tracking-[0.2em] mt-0.5 opacity-60">
              {isZh ? "排位賽 + 衝刺賽" : "QUALIFYING + SPRINT"}
            </span>
          </button>
          <button
            onClick={() => setActiveDay("sun")}
            className={`
              px-6 py-2.5 rounded-lg font-heading text-sm tracking-[0.15em] transition-all
              ${activeDay === "sun"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                : "bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/80 border border-white/[0.08]"
              }
            `}
          >
            {isZh ? "週日 4/12" : "SUN 4/12"}
            <span className="block text-[10px] tracking-[0.2em] mt-0.5 opacity-60">
              {isZh ? "暖身 + 正賽" : "WARM-UP + RACE"}
            </span>
          </button>
        </div>

        {/* Schedule table */}
        <div className="max-w-4xl mx-auto">
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-[70px_70px_1fr_2fr_80px] gap-px bg-white/[0.06] rounded-t-lg overflow-hidden text-[11px] tracking-[0.15em] text-white/40 uppercase">
            <div className="bg-white/[0.04] px-3 py-2.5 text-center">Start</div>
            <div className="bg-white/[0.04] px-3 py-2.5 text-center">End</div>
            <div className="bg-white/[0.04] px-3 py-2.5">{isZh ? "項目" : "Session"}</div>
            <div className="bg-white/[0.04] px-3 py-2.5">{isZh ? "組別" : "Class"}</div>
            <div className="bg-white/[0.04] px-3 py-2.5 text-center">Laps</div>
          </div>

          {/* Rows */}
          <div className="space-y-px">
            {rows.map((row, i) => {
              if (row.isBreak) {
                return (
                  <div
                    key={i}
                    className="bg-white/[0.08] py-3 text-center font-heading text-sm tracking-[0.2em] text-white/70 border-y border-white/[0.08]"
                  >
                    <span className="text-white/30 text-xs mr-3" style={{ fontFamily: "'Orbitron', monospace" }}>
                      {row.start} — {row.end}
                    </span>
                    {row.section} / {row.sectionZh}
                  </div>
                );
              }

              const isRace = row.section.includes("Race") || row.section.includes("Sprint");

              return (
                <div
                  key={i}
                  className={`
                    grid grid-cols-1 sm:grid-cols-[70px_70px_1fr_2fr_80px] gap-px
                    ${isRace ? "bg-red-500/[0.04]" : "bg-transparent"}
                    group hover:bg-white/[0.04] transition-colors
                  `}
                >
                  {/* Mobile: compact row */}
                  <div className="sm:hidden px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white/50 text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>
                        {row.start} — {row.end}
                      </span>
                      <span className="text-white/40 text-xs">{row.laps}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold ${getSectionColor(row.section)} border ${getSectionBadgeBg(row.section)} px-2 py-0.5 rounded`}>
                        {isZh ? row.sectionZh : row.section}
                      </span>
                      <span className="text-white/80 text-sm">{row.cls.split("\n")[0]}</span>
                    </div>
                    {row.cls.includes("\n") && (
                      <div className="text-white/50 text-xs mt-0.5 ml-1">{row.cls.split("\n")[1]}</div>
                    )}
                  </div>

                  {/* Desktop: grid row */}
                  <div className="hidden sm:flex items-center justify-center px-3 py-3 border-b border-white/[0.06]">
                    <span className="text-white/60 text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>{row.start}</span>
                  </div>
                  <div className="hidden sm:flex items-center justify-center px-3 py-3 border-b border-white/[0.06]">
                    <span className="text-white/40 text-xs" style={{ fontFamily: "'Orbitron', monospace" }}>{row.end}</span>
                  </div>
                  <div className="hidden sm:flex items-center px-3 py-3 border-b border-white/[0.06]">
                    <span className={`text-xs font-bold ${getSectionColor(row.section)} border ${getSectionBadgeBg(row.section)} px-2.5 py-1 rounded`}>
                      {isZh ? row.sectionZh : row.section}
                    </span>
                  </div>
                  <div className="hidden sm:flex items-center px-3 py-3 border-b border-white/[0.06]">
                    <div>
                      <span className={`text-sm ${isRace ? "text-white font-bold" : "text-white/70"}`}>
                        {row.cls.split("\n")[0]}
                      </span>
                      {row.cls.includes("\n") && (
                        <span className="block text-white/40 text-xs mt-0.5">
                          {row.cls.split("\n")[1]}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center justify-center px-3 py-3 border-b border-white/[0.06]">
                    <span className={`text-xs ${isRace ? "text-red-400 font-bold" : "text-white/40"}`}>
                      {row.laps}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
