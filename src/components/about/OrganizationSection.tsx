import { ArrowDown, UserRound } from "lucide-react";

import SectionHeading from "./SectionHeading";

function OrgCard({
  title,
  description,
  icon: Icon,
  members,
  variant = "department",
}: {
  title: string;
  description?: string;
  icon: typeof UserRound;
  members?: string[];
  variant?: "lead" | "department";
}) {
  return (
    <div
      className={
        variant === "lead"
          ? "w-full max-w-xs rounded-2xl border border-blue-500/40 bg-blue-600/20 px-6 py-5 text-center shadow-md shadow-blue-500/20 dark:shadow-blue-950/30"
          : "w-full rounded-2xl border border-slate-200 bg-white px-6 py-5 dark:border-slate-800 dark:bg-[#121c2d]"
      }
    >
      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 ring-1 ring-blue-500/25 dark:bg-[#162235] dark:text-blue-400">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="mt-3 text-sm font-semibold text-slate-900 dark:text-white">{title}</div>
      {description ? (
        <div className="mt-1 text-xs text-slate-500 dark:text-slate-400">{description}</div>
      ) : null}
      {members && members.length > 0 ? (
        <ul className="mt-4 space-y-1.5 border-t border-slate-200 pt-3 dark:border-slate-700/50">
          {members.map((member) => (
            <li
              key={member}
              className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs text-slate-600 dark:bg-[#162235] dark:text-slate-300"
            >
              {member}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
