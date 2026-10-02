import type { ComponentType } from "react";
import type { PlannedSlug } from "@/lib/registry";

/*
 * Hand made placeholder art for systems that are still on the roadmap. Each
 * one is plain markup and Tailwind utilities, a hint of the style rather than
 * the system itself, and is replaced by a live preview once the system ships.
 */

function Clay() {
  return (
    <div className="flex size-full items-center justify-center gap-4 bg-[#f6e7ff]">
      <div className="size-20 rounded-[2rem] bg-[#c9a7ff] shadow-[inset_-6px_-8px_14px_rgba(80,40,160,0.35),inset_6px_8px_14px_rgba(255,255,255,0.6),0_14px_24px_-8px_rgba(110,60,200,0.45)]" />
      <div className="flex flex-col gap-3">
        <div className="h-7 w-24 rounded-full bg-[#ffb4d9] shadow-[inset_-4px_-5px_10px_rgba(190,60,120,0.3),inset_4px_5px_10px_rgba(255,255,255,0.65),0_10px_18px_-8px_rgba(190,60,120,0.5)]" />
        <div className="h-7 w-16 rounded-full bg-[#9be7d8] shadow-[inset_-4px_-5px_10px_rgba(30,130,110,0.3),inset_4px_5px_10px_rgba(255,255,255,0.65),0_10px_18px_-8px_rgba(30,130,110,0.5)]" />
      </div>
    </div>
  );
}

function NeoBrutalism() {
  return (
    <div className="flex size-full items-center justify-center bg-[#ffe14d]">
      <div className="-rotate-2 border-[3px] border-black bg-white p-4 shadow-[6px_6px_0_#000]">
        <p className="text-lg leading-none font-black tracking-tight text-black uppercase">
          Ship it
        </p>
        <div className="mt-3 inline-block border-[3px] border-black bg-[#ff6bcb] px-3 py-1 text-xs font-bold text-black shadow-[3px_3px_0_#000]">
          Click
        </div>
      </div>
    </div>
  );
}

function Swiss() {
  return (
    <div className="relative grid size-full grid-cols-4 bg-white">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="border-l border-zinc-200 first:border-l-0" />
      ))}
      <div className="absolute top-0 left-1/4 h-1/2 w-1/2 bg-[#e3000f]" />
      <p className="absolute bottom-3 left-3 text-5xl leading-none font-bold tracking-tighter text-black">
        01
      </p>
      <p className="absolute right-3 bottom-4 text-[10px] leading-tight font-medium text-black uppercase">
        Grid
        <br />
        System
      </p>
    </div>
  );
}

function Editorial() {
  return (
    <div className="flex size-full flex-col justify-between bg-[#f4efe6] p-4 text-[#1d1a16]">
      <div className="flex justify-between border-b border-[#1d1a16] pb-1 text-[9px] tracking-[0.2em] uppercase">
        <span>Issue 12</span>
        <span>Autumn</span>
      </div>
      <p className="font-serif text-3xl leading-[0.95] italic">The quiet power of type</p>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="space-y-1">
            <div className="h-0.5 bg-[#1d1a16]/40" />
            <div className="h-0.5 bg-[#1d1a16]/40" />
            <div className="h-0.5 w-2/3 bg-[#1d1a16]/40" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Luxury() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-2 bg-[#0d0c0a]">
      <div className="h-px w-10 bg-[#c8a96a]" />
      <p className="font-serif text-2xl tracking-[0.4em] text-[#e9d9b4]">MAISON</p>
      <p className="text-[9px] tracking-[0.5em] text-[#c8a96a] uppercase">Est. 1924</p>
      <div className="h-px w-10 bg-[#c8a96a]" />
    </div>
  );
}

function Bento() {
  return (
    <div className="grid size-full grid-cols-4 grid-rows-3 gap-1.5 bg-[#f2f2f0] p-3">
      <div className="col-span-2 row-span-2 rounded-xl bg-[#1f1f1f]" />
      <div className="col-span-2 rounded-xl bg-[#ff7a45]" />
      <div className="rounded-xl bg-white" />
      <div className="rounded-xl bg-[#c6f36b]" />
      <div className="col-span-3 rounded-xl bg-white" />
      <div className="rounded-xl bg-[#7aa7ff]" />
    </div>
  );
}

function Maximalism() {
  return (
    <div className="relative size-full overflow-hidden bg-[repeating-linear-gradient(45deg,#ff3d7f_0_12px,#ffcf33_12px_24px)]">
      <div className="absolute -top-6 -left-6 size-28 rounded-full bg-[conic-gradient(#00c2a8,#6a4cff,#ff3d7f,#ffcf33,#00c2a8)]" />
      <div className="absolute right-4 bottom-4 size-24 rounded-full border-8 border-dotted border-[#6a4cff] bg-[#00c2a8]" />
      <p className="absolute inset-0 flex items-center justify-center font-serif text-3xl font-black text-white italic [text-shadow:3px_3px_0_#6a4cff,6px_6px_0_#000]">
        More!
      </p>
    </div>
  );
}

function Cybercore() {
  return (
    <div className="relative flex size-full items-center justify-center bg-[linear-gradient(160deg,#eef2f6,#b9c3cf_55%,#e9eef3)] font-mono text-[#1b3cff]">
      <div className="absolute inset-3 border border-[#1b3cff]/40" />
      <div className="absolute top-1/2 right-3 left-3 h-px bg-[#1b3cff]/30" />
      <div className="absolute top-3 bottom-3 left-1/2 w-px bg-[#1b3cff]/30" />
      <div className="relative size-14 rounded-full border-2 border-[#1b3cff]" />
      <p className="absolute top-4 left-5 text-[9px]">SYS.v2 // ONLINE</p>
      <p className="absolute right-5 bottom-4 text-[9px]">0x3FA9</p>
    </div>
  );
}

function Cyberpunk() {
  return (
    <div className="flex size-full items-center justify-center bg-[#07070c]">
      <div className="bg-[#fcee0a] px-5 py-3 [clip-path:polygon(0_0,100%_0,100%_70%,88%_100%,0_100%)]">
        <p className="font-mono text-xl font-black tracking-widest text-black">NIGHT_CITY</p>
      </div>
      <p className="absolute translate-x-6 translate-y-10 font-mono text-xs tracking-widest text-[#00f0ff] [text-shadow:2px_0_#ff2a6d]">
        // breach detected
      </p>
    </div>
  );
}

function Synthwave() {
  return (
    <div className="relative size-full overflow-hidden bg-[linear-gradient(#1a0533,#5b1a7a_55%,#1a0533_55%)]">
      <div className="absolute top-[18%] left-1/2 size-24 -translate-x-1/2 rounded-full bg-[linear-gradient(#ffd23f,#ff3c8e)] [mask:repeating-linear-gradient(#000_0_9px,transparent_9px_12px)]" />
      <div className="absolute inset-x-0 bottom-0 h-[45%] [perspective:120px]">
        <div className="absolute inset-x-[-50%] top-0 h-[200%] origin-top [transform:rotateX(60deg)] bg-[linear-gradient(#ff3c8e_1px,transparent_1px),linear-gradient(90deg,#ff3c8e_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
    </div>
  );
}

function Y2K() {
  return (
    <div className="flex size-full items-center justify-center gap-4 bg-[linear-gradient(135deg,#c9ecff,#f2d4ff)]">
      <div className="size-20 rounded-full bg-[radial-gradient(circle_at_30%_25%,#ffffff,#b8d8ff_30%,#6f8dff_70%,#3b4fd8)] shadow-[0_10px_25px_rgba(60,80,220,0.4)]" />
      <p className="bg-[linear-gradient(#ffffff,#9aa6b8_50%,#e9eef5_51%,#7d8799)] bg-clip-text font-sans text-3xl font-black text-transparent italic">
        2000
      </p>
      <span className="absolute translate-x-14 -translate-y-10 text-xl text-white">✦</span>
    </div>
  );
}

const heart = ["0110110", "1111111", "1111111", "0111110", "0011100", "0001000"];

function Pixel() {
  return (
    <div className="flex size-full items-center justify-center bg-[#2b2d42]">
      <div className="grid grid-cols-7 gap-0.5">
        {heart.flatMap((row, y) =>
          [...row].map((cell, x) => (
            <div
              key={`${x}-${y}`}
              className={cell === "1" ? "size-4 bg-[#ef233c]" : "size-4 bg-transparent"}
            />
          )),
        )}
      </div>
      <p className="absolute bottom-3 font-mono text-[10px] tracking-widest text-[#edf2f4]">1UP</p>
    </div>
  );
}

function Scrapbook() {
  return (
    <div className="relative size-full bg-[#d8c3a5]">
      <div className="absolute top-5 left-6 h-24 w-28 -rotate-6 bg-white p-1.5 pb-5 shadow-md">
        <div className="size-full bg-[linear-gradient(135deg,#8fb996,#5c8d89)]" />
      </div>
      <div className="absolute top-3 left-14 h-4 w-12 rotate-3 bg-[#f7e7a1]/80" />
      <div className="absolute right-6 bottom-6 rotate-3 bg-[#fffaf0] px-3 py-2 font-serif text-sm text-[#5a3e2b] italic shadow">
        summer &rsquo;24
      </div>
      <div className="absolute top-6 right-8 size-8 rounded-full bg-[#e76f51] text-center text-lg leading-8 text-white">
        ★
      </div>
    </div>
  );
}

function Sketch() {
  return (
    <div className="flex size-full items-center justify-center bg-[#fbfaf6]">
      <svg viewBox="0 0 160 100" className="h-3/4 text-[#2f3542]" fill="none">
        <path
          d="M14 22 C 40 18, 90 25, 146 20 M 146 20 C 149 45, 144 70, 147 82 M 147 82 C 100 85, 50 79, 13 83 M 13 83 C 16 60, 11 40, 15 21"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path d="M30 40 C 60 38, 90 42, 118 39" stroke="currentColor" strokeWidth="1.2" />
        <path d="M30 52 C 55 51, 80 54, 100 52" stroke="currentColor" strokeWidth="1.2" />
        <path
          d="M108 62 l 18 0 M 120 56 l 6 6 l -6 6"
          stroke="#e8590c"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="132" cy="34" r="7" stroke="#e8590c" strokeWidth="1.4" strokeDasharray="3 2" />
      </svg>
    </div>
  );
}

function Surrealism() {
  return (
    <div className="relative size-full overflow-hidden bg-[linear-gradient(#f7c59f,#a3c4f3)]">
      <div className="absolute top-4 right-6 size-14 rounded-full bg-[#fff4d6] shadow-[0_0_40px_#fff4d6]" />
      <div className="absolute bottom-0 h-1/3 w-full bg-[#e9d8a6]" />
      <div className="absolute bottom-12 left-1/2 h-20 w-12 -translate-x-1/2 animate-[float_6s_ease-in-out_infinite] rounded-t-full bg-[#264653] shadow-[0_30px_20px_-15px_rgba(0,0,0,0.35)]">
        <div className="absolute inset-x-2 top-3 bottom-2 rounded-t-full bg-[linear-gradient(#a3c4f3,#f7c59f)]" />
      </div>
    </div>
  );
}

function Ethereal() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden bg-[#fbf8ff]">
      <div className="absolute -top-8 -left-8 size-36 rounded-full bg-[#e7d7ff] blur-2xl" />
      <div className="absolute -right-6 -bottom-10 size-40 rounded-full bg-[#d4f1ff] blur-2xl" />
      <div className="absolute top-6 right-10 size-20 rounded-full bg-[#ffe3f1] blur-2xl" />
      <p className="relative font-serif text-2xl font-light tracking-[0.2em] text-[#6b5b95]">
        lumen
      </p>
    </div>
  );
}

function Bohemian() {
  return (
    <div className="relative flex size-full items-end justify-center gap-3 bg-[#f3e3cc] pb-0 [background-image:radial-gradient(#c96f3b33_1.5px,transparent_1.5px)] [background-size:12px_12px]">
      <div className="h-24 w-14 rounded-t-full bg-[#c96f3b]" />
      <div className="h-32 w-14 rounded-t-full bg-[#d9a441]" />
      <div className="h-20 w-14 rounded-t-full bg-[#8a9a5b]" />
    </div>
  );
}

function Victorian() {
  return (
    <div className="flex size-full items-center justify-center bg-[#4a1022] p-3">
      <div className="flex size-full flex-col items-center justify-center border-4 border-double border-[#d4b26a] text-[#d4b26a]">
        <span className="text-lg leading-none">❦</span>
        <p className="font-serif text-xl tracking-wide italic">Curiosities</p>
        <span className="text-lg leading-none [transform:scaleY(-1)]">❦</span>
      </div>
    </div>
  );
}

function WabiSabi() {
  return (
    <div className="relative flex size-full items-center justify-center bg-[#ece4d8]">
      <div className="h-20 w-24 rounded-[46%_54%_42%_58%/55%_45%_55%_45%] bg-[#b9a48b] shadow-[inset_-6px_-6px_14px_rgba(80,60,40,0.25)]" />
      <div className="absolute bottom-6 left-8 h-1 w-28 -rotate-3 rounded-full bg-[#3d3a35]/70" />
      <p className="absolute top-4 right-5 font-serif text-xs tracking-[0.3em] text-[#6b6257]">
        侘寂
      </p>
    </div>
  );
}

export const swatches: Record<PlannedSlug, ComponentType> = {
  clay: Clay,
  neobrutalism: NeoBrutalism,
  swiss: Swiss,
  editorial: Editorial,
  luxury: Luxury,
  bento: Bento,
  maximalism: Maximalism,
  cybercore: Cybercore,
  cyberpunk: Cyberpunk,
  synthwave: Synthwave,
  y2k: Y2K,
  pixel: Pixel,
  scrapbook: Scrapbook,
  sketch: Sketch,
  surrealism: Surrealism,
  ethereal: Ethereal,
  bohemian: Bohemian,
  victorian: Victorian,
  "wabi-sabi": WabiSabi,
};
