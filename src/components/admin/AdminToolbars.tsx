import { Search, SlidersHorizontal } from "lucide-react";
import type { ChangeEvent, ReactNode } from "react";

interface Props {
  search: string;
  onSearch: (value: string) => void;
  placeholder: string;
  filter?: ReactNode;
  action?: ReactNode;
}

export default function AdminToolbar({ search, onSearch, placeholder, filter, action }: Props) {
  return (
    <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center">
      <div className="relative min-w-0 flex-1">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
        <input
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onSearch(event.target.value)}
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-slate-700/70 bg-[#101a2b] pl-9 pr-3 text-sm text-slate-200 outline-none transition-colors placeholder:text-slate-600 focus:border-blue-500/60"
        />
      </div>
      {filter ? (
        <div className="flex items-center gap-2 text-slate-500">
          <SlidersHorizontal size={15} />
          {filter}
        </div>
      ) : null}
      {action ? <div className="lg:ml-auto">{action}</div> : null}
    </div>
  );
}
