"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          className="
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            border
            border-crushly-soft
            bg-crushly-glass
            backdrop-blur-xl
          "
        >
          <Menu size={22} />
        </button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="
          border-l
          border-crushly-soft
          bg-[#0f1224]/95
          backdrop-blur-2xl
          text-white
          px-6
          py-4
        "
      >
        <SheetHeader>
          <SheetTitle className="text-left text-white">Crushly</SheetTitle>
        </SheetHeader>

        <div className="mt-8 space-y-4">
          <Link
            href="/auth/login"
            className="
              flex
              justify-center
              rounded-full
              border
              border-crushly-soft
              bg-crushly-glass
              px-5
              py-3
            "
          >
            Sign In
          </Link>

          <Link
            href="/auth/register"
            className="
              flex
              justify-center
              rounded-full
              bg-crushly-gradient
              px-5
              py-3
              font-semibold
              shadow-crushly
            "
          >
            Get Started
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
