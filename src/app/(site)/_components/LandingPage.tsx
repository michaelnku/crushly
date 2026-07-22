import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  Sparkles,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import PhoneMockup from "./PhoneMockup";

import type { LucideIcon } from "lucide-react";

const stats: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
}[] = [
  {
    title: "1M+",
    subtitle: "Likes Shared",
    icon: Heart,
  },
  {
    title: "250K+",
    subtitle: "Matches",
    icon: Sparkles,
  },
  {
    title: "5M+",
    subtitle: "Messages",
    icon: MessageCircle,
  },
  {
    title: "Verified",
    subtitle: "Profiles",
    icon: ShieldCheck,
  },
];

export function LandingPage() {
  return (
    <main className="relative isolate overflow-hidden bg-crushly min-h-screen text-crushly-primary">
      {/* ---------- Ambient Glow ---------- */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="
          neon-blob
          neon-indigo
          h-[700px]
          w-[700px]
          left-1/2
          top-20
          -translate-x-1/2
        "
        />

        <div
          className="
          neon-blob
          neon-pink
          h-[500px]
          w-[500px]
          left-10
          top-[35%]
        "
          style={{ animationDelay: "-7s" }}
        />

        <div
          className="
          neon-blob
          neon-violet
          h-[520px]
          w-[520px]
          right-0
          top-32
        "
          style={{ animationDelay: "-13s" }}
        />

        <div className="noise" />
      </div>

      {/* NAV */}

      <header className="relative z-20 mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Heart className="fill-love text-love h-7 w-7" />

          <span className="text-2xl font-black">Crushly</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/auth/login"
            className="
            rounded-full
            border
            border-crushly-soft
            bg-crushly-glass
            px-5
            py-2.5
            transition
            hover:border-white/20
          "
          >
            Sign In
          </Link>

          <Link
            href="/auth/register"
            className="
            rounded-full
            bg-crushly-gradient
            px-6
            py-2.5
            font-semibold
            shadow-crushly
            transition
            hover:scale-105
          "
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section className="relative z-20 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-16 px-6 py-16 lg:grid-cols-[1.05fr_.95fr]">
        {" "}
        {/* LEFT */}
        <div className="max-w-2xl">
          {/* Eyebrow */}

          <div
            className="
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-white/10
      bg-white/5
      px-5
      py-2.5
      backdrop-blur-xl
      shadow-crushly
    "
          >
            <Heart className="h-4 w-4 text-love" fill="currentColor" />

            <span className="text-sm font-medium text-crushly-secondary">
              Built for meaningful connections, not endless swiping.
            </span>
          </div>

          {/* Heading */}

          <h1
            className="
      mt-8
      max-w-3xl
      text-5xl
      font-black
      tracking-[-0.05em]
      leading-[0.92]
      md:text-6xl
      lg:text-7xl
    "
          >
            Find someone looking for the same thing you are.
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-xl text-lg leading-8 text-crushly-secondary md:text-xl">
            Whether you're searching for a serious relationship, something
            casual, meaningful friendships, or simply new people to meet,
            Crushly helps you connect with people who share your intentions from
            the very beginning.
          </p>

          {/* CTA */}

          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href="/auth/register"
              className="
        group
        inline-flex
        items-center
        gap-3
        rounded-full
        bg-crushly-gradient
        px-8
        py-4
        text-base
        font-semibold
        shadow-crushly
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_60px_rgba(255,107,129,.35)]
      "
            >
              Start Matching
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/auth/login"
              className="
        inline-flex
        items-center
        rounded-full
        border
        border-white/10
        bg-white/5
        px-8
        py-4
        font-medium
        backdrop-blur-xl
        transition-all
        duration-300
        hover:bg-white/10
      "
            >
              Sign In
            </Link>
          </div>

          {/* Trust Row */}

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            <div className="flex items-center gap-2 text-sm text-crushly-secondary">
              <ShieldCheck className="h-5 w-5 text-love" strokeWidth={2.2} />
              Verified Profiles
            </div>

            <div className="flex items-center gap-2 text-sm text-crushly-secondary">
              <Sparkles className="h-5 w-5 text-accent" strokeWidth={2.2} />
              Intent-Based Matching
            </div>

            <div className="flex items-center gap-2 text-sm text-crushly-secondary">
              <MessageCircle className="h-5 w-5 text-love" strokeWidth={2.2} />
              Private Messaging
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="relative flex justify-center">
          <div
            className="
            absolute
            h-[520px]
            w-[520px]
            rounded-full
            bg-crushly-radial
            blur-3xl
          "
          />

          <PhoneMockup />
        </div>
      </section>

      {/* STATS */}

      <section className="relative z-20 mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-crushly-soft bg-crushly-glass p-6"
              >
                <Icon className="mb-5 text-love" />

                <h3 className="text-3xl font-bold">{item.title}</h3>

                <p className="mt-2 text-crushly-secondary">{item.subtitle}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
