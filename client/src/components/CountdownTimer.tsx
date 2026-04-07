/**
 * CountdownTimer — Style B (Dashboard / Instrument Panel)
 * Counts down to a target race date. After the event, shows "RACE DAY" or hides.
 */
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

// Next race: 2026-04-11 09:00 (UTC+8)
const TARGET = new Date("2026-04-11T09:00:00+08:00").getTime();

interface TimeLeft {
  days: number;
  hours: number;
  mins: number;
  secs: number;
}

function calcTimeLeft(): TimeLeft | null {
  const diff = TARGET - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    mins: Math.floor((diff / (1000 * 60)) % 60),
    secs: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calcTimeLeft);
  const { language } = useLanguage();

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  const isZh = language === "zh";

  // If race has started, show live banner or hide
  if (!timeLeft) {
    return (
      <div className="w-full bg-[#111] border-y border-white/[0.06]">
        <div className="container py-5">
          <div className="flex items-center justify-center gap-3">
            <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span
              className="font-heading text-lg tracking-[0.15em] text-white/90"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {isZh ? "比賽進行中" : "RACE DAY"}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#111] border-y border-white/[0.06]">
      <div className="container py-4 lg:py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 max-w-3xl mx-auto">
          {/* Left: Event info */}
          <div className="text-center sm:text-left flex-1 min-w-0">
            <span
              className="inline-block bg-red-600 text-white text-xs font-bold tracking-[0.15em] px-2.5 py-0.5 rounded mb-1.5"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              R1
            </span>
            <div
              className="text-white text-lg sm:text-xl font-bold tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif" }}
            >
              {isZh ? "大鵬灣國際賽車場" : "DaPeng Bay International Circuit"}
            </div>
            <div className="text-white/40 text-xs mt-0.5 tracking-wide">
              {isZh ? "2026 年 4 月 11 日（五）09:00" : "April 11, 2026 (Fri) 09:00"}
            </div>
          </div>

          {/* Right: Countdown tiles */}
          <div className="flex gap-1.5 sm:gap-2">
            {([
              { val: timeLeft.days, label: isZh ? "天" : "DAY" },
              { val: timeLeft.hours, label: isZh ? "時" : "HR" },
              { val: timeLeft.mins, label: isZh ? "分" : "MIN" },
              { val: timeLeft.secs, label: isZh ? "秒" : "SEC" },
            ]).map((item, i) => (
              <div
                key={i}
                className="bg-white/[0.06] border border-white/[0.1] rounded-lg px-3 sm:px-4 py-2.5 text-center min-w-[56px] sm:min-w-[68px]"
              >
                <div
                  className="text-white text-2xl sm:text-[34px] font-bold leading-none"
                  style={{ fontFamily: "'Orbitron', monospace" }}
                >
                  {pad(item.val)}
                </div>
                <div className="text-white/30 text-[10px] tracking-[0.15em] mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
