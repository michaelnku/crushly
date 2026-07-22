import Image from "next/image";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-crushly">
      {/* Ambient Glow */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="neon-blob neon-indigo left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2" />

        <div
          className="neon-blob neon-pink left-20 top-32 h-[340px] w-[340px]"
          style={{ animationDelay: "-5s" }}
        />

        <div
          className="neon-blob neon-violet right-10 bottom-10 h-[360px] w-[360px]"
          style={{ animationDelay: "-11s" }}
        />

        <div className="noise" />
      </div>

      {/* Content */}

      <div className="relative z-20 flex flex-col items-center">
        {/* Logo */}

        <div className="relative">
          <div className="absolute inset-0 scale-125 rounded-full bg-crushly-gradient opacity-60 blur-3xl" />

          <Image
            src="/logo.png"
            alt="Crushly"
            width={110}
            height={110}
            priority
            className="relative animate-logo-float drop-shadow-2xl"
          />
        </div>

        {/* Brand */}

        <h1 className="mt-8 text-4xl font-black tracking-tight text-white">
          Crushly
        </h1>

        <p className="mt-2 text-sm tracking-wide text-crushly-secondary">
          Find your perfect connection.
        </p>

        {/* Loading */}

        <div className="mt-10 flex items-center gap-2">
          <span className="loading-dot" />
          <span className="loading-dot animation-delay-200" />
          <span className="loading-dot animation-delay-400" />
        </div>
      </div>
    </main>
  );
}
