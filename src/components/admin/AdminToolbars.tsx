"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";

interface Props {
  search: string;
  onSearch: (value: string) => void;
  placeholder?: string;
  filter?: ReactNode;
  action?: ReactNode;
}

export default function AdminToolbar({
  search,
  onSearch,
  placeholder = "Search...",
  filter,
  action,
}: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>
      {filter ? (
        <div className="flex items-center gap-2 text-slate-500">
          <SlidersHorizontal size={15} className="text-slate-400" />
          {filter}
        </div>
      ) : null}
      {action ? <div className="lg:ml-auto">{action}</div> : null}
    </div>
  );
}