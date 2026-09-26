import React from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface SportCard {
  id: number;
  title: string;
  imageSrc: string;
}

interface SportsCardGridProps {
  cards: SportCard[];
}

export const SportsCardGrid: React.FC<SportsCardGridProps> = ({ cards }) => {
  return (
    <div className="mx-auto mb-10 max-w-[1040px]">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.id}
            className="relative flex h-48 flex-col items-center justify-center overflow-hidden rounded-[22px] border border-[#09274C]/15 bg-white shadow-[0_10px_30px_-12px_rgba(9,39,76,0.08)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none"
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex h-1">
              <div className="w-3/4 bg-[#09274C] dark:bg-blue-500" />
              <div className="w-1/4 bg-[#E1131B]" />
            </div>

            {card.imageSrc ? (
              <img
                src={card.imageSrc}
                alt={card.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center px-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#09274C]/5 text-[#09274C] dark:bg-slate-800 dark:text-slate-300">
                  <ImageIcon className="h-6 w-6" />
                </div>
                <p className="mt-3 text-xs font-bold text-[#09274C] dark:text-slate-200">
                  {card.title}
                </p>
                <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
                  Insert Image Here
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};