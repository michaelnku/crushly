"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Bell,
  Heart,
  MapPin,
  MessageCircle,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import FloatingBadge from "./FloatingBadge";
import { floatingBadges, mockProfiles } from "./mock-data";

export default function PhoneMockup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const profile = mockProfiles[currentIndex];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const interval = setInterval(() => {
      setIsVisible(false);

      timeout = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % mockProfiles.length);
        setIsVisible(true);
      }, 400);
    }, 4500);

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, []);

  return (
    <div className="relative">
      {/* Floating badges */}

      {floatingBadges.map((badge, index) => (
        <FloatingBadge
          key={badge.id}
          text={badge.text}
          emoji={badge.emoji}
          position={badge.position}
          delay={index * 1.5}
        />
      ))}

      {/* Phone */}

      <div
        className="
        relative
        h-[700px]
        w-[340px]
        overflow-hidden
        rounded-[42px]
        border
        border-white/10
        bg-crushly-card
        shadow-[0_30px_80px_rgba(0,0,0,.45)]
      "
      >
        {/* Notch */}

        <div className="absolute left-1/2 top-3 z-30 h-7 w-36 -translate-x-1/2 rounded-full bg-black" />

        {/* Status bar */}

        <div className="flex items-center justify-between px-6 pt-6 text-xs font-semibold text-white">
          <span>9:41</span>

          <span>📶 WiFi 🔋</span>
        </div>

        {/* Header */}

        <div className="mt-6 flex items-center justify-between px-5">
          <div className="flex items-center gap-1">
            <div className="relative flex h-10 w-10 items-center justify-center">
              {/* Soft Glow */}
              <div className="absolute inset-0 rounded-full bg-crushly-gradient blur-xl opacity-50" />

              {/* Logo */}
              <Image
                src="/logo.png"
                alt="Crushly"
                width={16}
                height={16}
                priority
                className="relative z-10 h-9 w-9 rounded-xl object-contain"
              />
            </div>

            <span className="text-xl font-black tracking-tight">Crushly</span>
          </div>

          <div className="relative">
            <Bell size={22} className="animate-bell text-crushly-secondary" />

            {/* Pulse */}
            <span
              className="
      absolute
      -right-1
      -top-1
      h-3
      w-3
      rounded-full
      bg-red-500/40
      animate-ping
    "
            />

            {/* Dot */}
            <span
              className="
      absolute
      -right-1
      -top-1
      z-10
      h-3
      w-3
      rounded-full
      bg-red-500
      ring-2
      ring-crushly-card
    "
            />
          </div>
        </div>

        {/* Profile Card */}

        <div
          className={`
    mx-4
    mt-5
    overflow-hidden
    rounded-[28px]
    bg-crushly-bg-soft
    transition-[opacity,transform]
    duration-400
    ease-in-out
    ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-[0.98]"}
  `}
        >
          <div className="relative h-[420px]">
            <Image
              src={profile.image}
              alt={profile.name}
              fill
              priority
              className="object-cover"
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6">
              <div className="flex items-center gap-2">
                <h2 className="text-3xl font-bold text-white">
                  {profile.name}
                </h2>

                <span className="pb-1 text-xl text-white">{profile.age}</span>
                {profile.verified && (
                  <span className="rounded-full bg-blue-500 px-2 py-0.5 text-[10px] font-semibold uppercase">
                    ✓
                  </span>
                )}
              </div>

              <div className="mt-2 flex items-center justify-between text-sm text-white/90">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  {profile.location}
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      profile.online ? "bg-green-400" : "bg-gray-400"
                    }`}
                  />

                  {profile.online ? "Online" : "Offline"}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-love/15 px-3 py-1 text-xs font-semibold text-love">
                ❤️ {profile.compatibility}% Match
              </span>
            </div>
            <p className="text-sm leading-6 text-crushly-secondary">
              {profile.bio}
            </p>

            <div className="flex flex-wrap gap-2">
              {profile.interests.map((interest) => (
                <span
                  key={interest}
                  className="
                  rounded-full
                  bg-crushly-glass
                  border
                  border-crushly-soft
                  px-3
                  py-1
                  text-xs
                "
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}

        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-crushly-glass
            border
            border-crushly-soft
            transition
            hover:scale-110
          "
          >
            <X className="text-red-400" />
          </button>

          <button
            className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            bg-crushly-gradient
            shadow-crushly
            transition
            hover:scale-110
          "
          >
            <Heart className="fill-white text-white" size={28} />
          </button>

          <button
            className="
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-crushly-glass
            border
            border-crushly-soft
            transition
            hover:scale-110
          "
          >
            <Star className="text-yellow-400" />
          </button>
        </div>

        {/* Bottom Nav */}

        <div className="absolute inset-x-0 bottom-5 flex justify-around px-8">
          <Heart className="text-love fill-love" />

          <Sparkles className="text-crushly-secondary" />

          <MessageCircle className="text-crushly-secondary" />
        </div>
      </div>
    </div>
  );
}
