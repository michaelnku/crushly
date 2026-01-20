"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

export default function SocialLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const loginWithGoogle = async () => {
    setLoading(true);

    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/discover",
    });
  };

  return (
    <div className="space-y-4">
      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-grow h-px bg-[var(--crushly-border)]" />
        <span className="text-xs text-crushly-muted">or</span>
        <div className="flex-grow h-px bg-[var(--crushly-border)]" />
      </div>

      {/* Google Button */}
      <button
        type="button"
        onClick={loginWithGoogle}
        disabled={loading}
        className="
          w-full h-11 flex items-center justify-center gap-3
          border border-crushly rounded-lg
          text-crushly-primary
          bg-transparent
          hover:bg-[var(--crushly-bg-hover)]
          transition
          disabled:opacity-60
        "
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-crushly-muted"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
              />
            </svg>
            Redirecting…
          </span>
        ) : (
          <>
            <FcGoogle className="text-xl" />
            <span className="font-medium">Continue with Google</span>
          </>
        )}
      </button>
    </div>
  );
}
