"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const MobileMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open menu"
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
          transition
          hover:border-white/20
        "
      >
        <Menu size={22} />
      </button>

      {open && (
        <>
          {/* Backdrop */}

          <button
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Panel */}

          <div
            className="
              fixed
              right-5
              top-5
              z-50
              w-72
              rounded-3xl
              border
              border-crushly-soft
              bg-crushly-glass
              p-6
              backdrop-blur-2xl
              shadow-[0_25px_80px_rgba(0,0,0,.45)]
            "
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">Menu</span>

              <button
                onClick={() => setOpen(false)}
                className="
                  rounded-xl
                  p-2
                  transition
                  hover:bg-white/10
                "
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-8 space-y-3">
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="
                  flex
                  justify-center
                  rounded-full
                  border
                  border-crushly-soft
                  bg-crushly-glass
                  px-5
                  py-3
                  font-medium
                "
              >
                Sign In
              </Link>

              <Link
                href="/auth/register"
                onClick={() => setOpen(false)}
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
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
