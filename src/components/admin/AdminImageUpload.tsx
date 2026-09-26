"use client";

import Image from "next/image";
import { ImagePlus, LoaderCircle, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { uploadAdminImages } from "@/services/adminUploadService";

interface Props {
  value: string[];
  onChange: (urls: string[]) => void;
  multiple?: boolean;
}

const MAX_SIZE = 8 * 1024 * 1024;

export default function AdminImageUpload({ value, onChange, multiple = true }: Props) {
  const handleFiles = async (files: FileList | null) => {
    const selected = Array.from(files ?? []);
    if (!selected.length) return;

    const invalid = selected.find((file) => !file.type.startsWith("image/") || file.size > MAX_SIZE);
    if (invalid) {
      toast.error("សូមជ្រើសរូបភាពដែលមានទំហំមិនលើស 8MB។");
      return;
    }

    try {
      const urls = await uploadAdminImages(multiple ? selected : [selected[0]]);
      if (!urls.length) throw new Error("មិនទទួលបាន URL រូបភាពពី server ទេ។");
      onChange(multiple ? [...value, ...urls] : urls.slice(0, 1));
      toast.success("បញ្ចូលរូបភាពបានជោគជ័យ");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "មិនអាចបញ្ចូលរូបភាពបានទេ");
    }
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {value.map((url) => (
          <div key={url} className="group relative aspect-square overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
            <Image src={url} alt="Uploaded" fill sizes="160px" className="object-cover" />
            <button
              type="button"
              aria-label="លុបរូបភាព"
              onClick={() => onChange(value.filter((item) => item !== url))}
              className="absolute right-2 top-2 rounded-lg bg-red-600/90 p-1.5 text-white opacity-0 transition-opacity hover:bg-red-600 group-hover:opacity-100 shadow-sm"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
        {(multiple || value.length === 0) && (
          <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 text-center transition-colors hover:border-blue-500 hover:bg-blue-50/50">
            <ImagePlus size={21} className="mb-2 text-blue-600" />
            <span className="text-xs font-semibold text-slate-700">បញ្ចូលរូបភាព</span>
            <span className="mt-1 px-2 text-[10px] text-slate-400">JPG, PNG, WEBP · 8MB</span>
            <input
              type="file"
              accept="image/*"
              multiple={multiple}
              className="sr-only"
              onChange={(event) => {
                void handleFiles(event.target.files);
                event.currentTarget.value = "";
              }}
            />
          </label>
        )}
      </div>
      <p className="mt-2 text-[11px] text-slate-400">ការបញ្ចូលអាចចំណាយពេលបន្តិច ប្រសិនបើរូបភាពមានទំហំធំ។</p>
    </div>
  );
}