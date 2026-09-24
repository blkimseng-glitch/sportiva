import type { LucideIcon } from "lucide-react";

import { cn } from "cn";
import type { SectionHeadingData } from "./types";

interface SectionHeadingProps {
  data: SectionHeadingData;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  data,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
        {data.label}
      </span>
      <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
        {data.title}
      </h2>
      {data.description ? (
        <p
          className={cn(
            "mt-4 text-sm leading-relaxed text-slate-500 sm:text-base dark:text-slate-400",
            align === "center" && "mx-auto"
          )}
        >
          {data.description}
        </p>
      ) : null}
    </div>
  );
}

export const sectionIconClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 ring-1 ring-blue-500/25 dark:bg-blue-600/15 dark:text-blue-400";

export function SectionIcon({ icon }: { icon: LucideIcon }) {
  const Icon = icon;
  return (
    <div className={sectionIconClass}>
      <Icon className="h-6 w-6" />
    </div>
  );
}