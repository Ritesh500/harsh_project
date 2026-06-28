"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(target: Date): TimeLeft {
  const diff = Math.max(0, target.getTime() - Date.now());
  const seconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(seconds / 86400),
    hours: Math.floor((seconds % 86400) / 3600),
    minutes: Math.floor((seconds % 3600) / 60),
    seconds: seconds % 60,
  };
}

const pad = (n: number) => n.toString().padStart(2, "0");

export default function Countdown({ target }: { target: Date }) {
  // Render nothing until mounted to avoid a server/client hydration mismatch
  // (the value depends on Date.now()).
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft(target));
    const id = setInterval(() => setTime(getTimeLeft(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  return (
    <div
      className="flex items-stretch justify-center gap-3 sm:gap-5"
      aria-live="off"
      aria-label="Time remaining until launch"
      style={{ visibility: mounted ? "visible" : "hidden" }}
    >
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-stretch gap-3 sm:gap-5">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-forest/10 bg-white/60 shadow-[0_8px_30px_rgba(36,53,40,0.08)] backdrop-blur-sm sm:h-20 sm:w-20">
              <span className="font-display text-3xl font-medium tabular-nums text-forest sm:text-4xl">
                {pad(unit.value)}
              </span>
            </div>
            <span className="mt-2 text-[0.65rem] uppercase tracking-[0.2em] text-muted sm:text-xs">
              {unit.label}
            </span>
          </div>
          {i < units.length - 1 && (
            <span
              aria-hidden
              className="self-start pt-3 font-display text-3xl text-gold/40 sm:pt-4 sm:text-4xl"
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
