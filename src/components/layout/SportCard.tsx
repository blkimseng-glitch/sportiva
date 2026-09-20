import Link from "next/link";
import { SportItem } from "@/lib/types";

const BADGE_COLORS: Record<string, string> = {
  Football: "bg-flare",
  Basketball: "bg-turf",
  Training: "bg-ink-soft",
  Running: "bg-turf",
  Gear: "bg-flare-dark",
};

export default function SportCard({
  item,
  featured = false,
}: {
  item: SportItem;
  featured?: boolean;
}) {
  const badgeColor = BADGE_COLORS[item.categoryName] ?? "bg-ink-soft";

  return (
    <Link
      href={`/sports/${item.id}`}
      className={`group flex flex-col ${featured ? "lg:col-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden bg-slate-200 ${featured ? "aspect-[2/1]" : "aspect-[1.35/1]"}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.imageUrls[0]}
          alt={item.name}
          className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-70" />
        <span
          className={`absolute bottom-3 left-3 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white ${badgeColor}`}
        >
          {item.categoryName}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-4">
        <div className="mb-2 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-ink/40">
          <span>SportHub</span>
          <span className="h-1 w-1 rounded-full bg-flare" />
          <span>5 min read</span>
        </div>
        <h3 className={`font-display font-bold leading-tight text-ink transition-colors group-hover:text-flare-dark ${featured ? "text-2xl sm:text-3xl" : "text-xl"}`}>
          {item.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55 line-clamp-2">
          {item.description}
        </p>
        <span className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-flare-dark">
          Open story <span className="text-base transition-transform group-hover:translate-x-1">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
