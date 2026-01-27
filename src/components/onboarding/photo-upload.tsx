"use client";

import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";

interface UploadedPhoto {
  url: string;
  key: string;
}

interface PhotoUploadProps {
  value: UploadedPhoto[];
  onChange: (photos: UploadedPhoto[]) => void;
}

export function PhotoUpload({ value, onChange }: PhotoUploadProps) {
  return (
    <div>
      {/* Upload button */}
      <UploadButton
        endpoint="profilePhotos"
        className="
          ut-button:border
          ut-button:border-crushly
          ut-button:font-semibold
          ut-button:transition
          ut-button:bg-blue-500/10 
          ut-button:text-blue-600 
          ut-button:border 
          ut-button:border-blue-500/30 
          ut-button:rounded-full 
          ut-button:px-5 
          ut-button:py-2 
          ut-button:text-sm 
          hover:ut-button:bg-blue-500/20
        "
        onClientUploadComplete={(files) => {
          if (!files || files.length === 0) {
            toast.error("Upload failed");
            return;
          }

          const uploaded = files.map((file) => ({
            url: file.url,
            key: file.key,
          }));

          onChange([...value, ...uploaded]);
          toast.success("Photo added 💖");
        }}
        onUploadError={(error) => {
          toast.error(error.message || "Upload failed");
        }}
      />
    </div>
  );
}
