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
import Image from "next/image";
import MobileMenu from "./MobileMenu";

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

      {/* Ambient Lights */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="
      absolute
      left-1/2
      top-28
      h-[380px]
      w-[380px]
      -translate-x-1/2
      rounded-full
      bg-fuchsia-500/18
      blur-[90px]
    "
        />

        <div
          className="
      absolute
      right-12
      top-44
      h-[260px]
      w-[260px]
      rounded-full
      bg-violet-500/20
      blur-[80px]
    "
        />

        <div
          className="
      absolute
      left-8
      bottom-24
      h-[220px]
      w-[220px]
      rounded-full
      bg-pink-500/16
      blur-[70px]
    "
        />

        <div className="noise" />
      </div>

      {/* NAV */}

      <header
        className="
    relative
    z-20
    mx-auto
    flex
    max-w-7xl
    items-center
    justify-between
    px-5
    py-6
    md:px-8
  "
      >
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-crushly-gradient blur-xl opacity-50" />

            <Image
              src="/logo.png"
              alt="Crushly"
              width={44}
              height={44}
              priority
              className="relative z-10 h-11 w-11 rounded-xl object-contain"
            />
          </div>

          <span className="text-xl font-black tracking-tight">Crushly</span>
        </div>

        {/* Desktop */}

        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/auth/login"
            className="
        rounded-full
        border
        border-crushly-soft
        bg-crushly-glass
        px-5
        py-2.5
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
      "
          >
            Get Started
          </Link>
        </div>

        {/* Mobile */}

        <div className="md:hidden z-100">
          <MobileMenu />
        </div>
      </header>

      {/* HERO */}

      <section
        className="
    relative
    z-20
    mx-auto
    grid
    max-w-7xl
    items-center
    gap-16

    px-6
    py-12

    lg:min-h-[calc(100vh-80px)]
    lg:grid-cols-[1.05fr_.95fr]

    xl:gap-24
  "
      >
        {/* LEFT */}
        <div
          className="
    order-2
    text-center

    lg:order-1
    lg:text-left
    lg:max-w-2xl
  "
        >
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
        font-black
        tracking-[-0.05em]
        leading-[0.92]
        text-4xl
        sm:text-5xl
        lg:text-6xl
        xl:text-7xl
    "
          >
            Find someone looking for the same thing you are.
          </h1>

          {/* Description */}

          <p className="mt-8 max-w-xl text-base sm:text-lg md:text-xl leading-8 text-crushly-secondary md:text-xl">
            Whether you're searching for a serious relationship, something
            casual, meaningful friendships, or simply new people to meet,
            Crushly helps you connect with people who share your intentions from
            the very beginning.
          </p>

          {/* CTA */}

          <div
            className="
            mt-12
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:justify-center
            lg:justify-start
        "
          >
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
        <div
          className="
    order-1
    flex
    justify-center

    lg:order-2
  "
        >
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
