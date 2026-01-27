"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";

import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2, User, X } from "lucide-react";

import {
  onboardingPhotosSchema,
  OnboardingPhotosSchemaType,
} from "@/lib/zodValidation";
import { deleteFileAction, saveOnboardingPhotos } from "@/actions/onboarding";
import { PhotoUpload } from "@/components/onboarding/photo-upload";

import Image from "next/image";
import { toast } from "sonner";

export default function OnboardingPhotosPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [deletingKeys, setDeletingKeys] = useState<Set<string>>(new Set());

  const form = useForm<OnboardingPhotosSchemaType>({
    resolver: zodResolver(onboardingPhotosSchema),
    defaultValues: {
      photos: [],
    },
  });

  const onSubmit = (values: OnboardingPhotosSchemaType) => {
    startTransition(async () => {
      const res = await saveOnboardingPhotos(values);
      if (!res?.error) {
        router.push("/discover");
        router.refresh();
      }
    });
  };

  const deletePhoto = async (photoKey: string, index: number) => {
    if (deletingKeys.has(photoKey)) return;

    setDeletingKeys((prev) => new Set(prev).add(photoKey));

    try {
      await deleteFileAction(photoKey);

      const updatedPhotos = form
        .getValues("photos")
        .filter((_, i) => i !== index);

      form.setValue("photos", updatedPhotos, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });

      toast.success("Photo deleted");
    } catch (error) {
      toast.error("Failed to delete photo");
    } finally {
      setDeletingKeys((prev) => {
        const next = new Set(prev);
        next.delete(photoKey);
        return next;
      });
    }
  };

  const photos = form.watch("photos");

  return (
    <main className="min-h-screen flex items-center justify-center bg-crushly px-4">
      <div className="w-full max-w-lg space-y-7 rounded-2xl border border-crushly bg-crushly-soft p-8 shadow-xl">
        {/* Progress */}
        <OnboardingProgress step={4} totalSteps={4} />

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-crushly-primary">
            Add your photos 📸
          </h1>
          <p className="text-sm text-crushly-muted">
            Profiles with photos get way more love
          </p>
        </div>

        {/* Empty state when no photos uploaded */}
        {photos.length === 0 && (
          <div
            className="
      flex aspect-square items-center justify-center
      rounded-xl border border-dashed border-crushly
      bg-[rgba(255,107,129,0.06)]
      text-crushly-muted
    "
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <User className="h-8 w-8 text-crushly-muted" />
              <span className="text-xs">Your first photo will appear here</span>
            </div>
          </div>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Photo Upload */}
            <FormField
              control={form.control}
              name="photos"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  {/* Live preview */}
                  {photos.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {photos.map((photo, index) => (
                        <div
                          key={photo.key}
                          className="
              group relative aspect-square overflow-hidden
              rounded-xl border border-crushly
              bg-crushly-soft
              shadow-sm
            "
                        >
                          <Image
                            src={photo.url}
                            alt="Profile photo"
                            fill
                            className="
                h-full w-full object-cover
                transition-transform duration-300
                group-hover:scale-105
              "
                          />

                          {/* Gradient overlay on hover */}
                          <div
                            className="
                pointer-events-none absolute inset-0
                bg-gradient-to-t
                from-black/30 via-transparent to-transparent
                opacity-0 group-hover:opacity-100
                transition-opacity
              "
                          />

                          {/* Primary badge */}
                          {index === 0 && (
                            <span
                              className="
                  absolute top-2 left-2
                  rounded-full px-2 py-0.5
                  text-[11px] font-semibold text-white
                  bg-crushly-gradient
                  shadow
                "
                            >
                              Primary
                            </span>
                          )}
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            disabled={deletingKeys.has(photo.key)}
                            onClick={() => deletePhoto(photo.key, index)}
                            className="absolute top-1 right-1 bg-black/70 hover:bg-black"
                          >
                            {deletingKeys.has(photo.key) ? (
                              <Loader2 className="absolute inset-0 m-auto h-4 w-4 animate-spin text-white" />
                            ) : (
                              <X className="h-3 w-3 text-white" />
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload */}
                  {photos.length < 6 && (
                    <PhotoUpload
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="
                w-full h-11 rounded-lg font-semibold text-white
                bg-crushly-gradient
                hover:opacity-90 transition
                disabled:opacity-70
              "
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Finishing…
                </span>
              ) : (
                "Start crushing"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
