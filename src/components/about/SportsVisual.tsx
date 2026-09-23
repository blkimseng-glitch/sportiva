import {
  CalendarDays,
  Dumbbell,
  Newspaper,
  Trophy,
  Users,
} from "lucide-react";

import { cn } from "cn";

interface SportsVisualProps {
  className?: string;
  title?: string;
}

const tiles = [
  { icon: Newspaper, className: "top-6 left-6" },
  { icon: Users, className: "top-10 right-6" },
  { icon: CalendarDays, className: "bottom-8 left-8" },
  { icon: Dumbbell, className: "bottom-10 right-10" },
];

/**
 * Decorative, icon-based illustration placeholder. The project has no
 * suitable sports image assets, so a clean composition of brand icons is
 * used instead of inventing external image URLs.
 */
export default function SportsVisual({ className, title }: SportsVisualProps) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-[4/3] w-full max-w-lg select-none",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute -top-8 -left-8 h-40 w-40 rounded-full bg-blue-600/15 blur-2xl" />
      <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-full bg-indigo-500/15 blur-2xl" />
      <div className="absolute inset-0 rounded-3xl border border-slate-300 bg-white shadow-2xl shadow-slate-200 dark:border-slate-700/70 dark:bg-[#121c2d] dark:shadow-blue-950/30" />

      {tiles.map(({ icon: Icon, className: tileClass }) => (
        <div
          key={tileClass}
          className={cn(
            "absolute flex h-12 w-12 items-center justify-center rounded-xl border border-slate-300 bg-white text-blue-600 shadow-lg shadow-slate-200 dark:border-slate-700/60 dark:bg-[#162235] dark:text-blue-400 dark:shadow-blue-950/40",
            tileClass
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      ))}

      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/30">
          <Trophy className="h-10 w-10" />
        </div>
        {title ? (
          <span className="rounded-full bg-white border border-slate-300 px-4 py-1.5 text-xs font-semibold text-slate-700 dark:bg-[#162235] dark:border-slate-700/60 dark:text-slate-200">
            {title}
          </span>
        ) : null}
      </div>

      <div className="absolute -bottom-5 left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-[100%] bg-blue-950/60 blur-2xl" />
    </div>
  );
}