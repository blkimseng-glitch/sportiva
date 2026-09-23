import { cn } from "cn";

interface SportsVisualProps {
  className?: string;
  image?: string;
}

export default function SportsVisual({ className, image }: SportsVisualProps) {
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
      <div className="absolute inset-0 overflow-hidden rounded-3xl border border-slate-300 bg-white shadow-2xl shadow-slate-200 dark:border-slate-700/70 dark:bg-[#121c2d] dark:shadow-blue-950/30">
        {image ? (
          // eslint-disable-next-line @next/next/no-img-element -- local asset from /public
          <img
            src={image}
            alt=""
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      <div className="absolute -bottom-5 left-1/2 h-10 w-2/3 -translate-x-1/2 rounded-[100%] bg-blue-950/60 blur-2xl" />
    </div>
  );
}