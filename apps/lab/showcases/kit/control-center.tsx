"use client";

import { Surface, IconButton, Slider } from "@aliveui/ui";
import { cn } from "@aliveui/primitives";
import {
  Bluetooth,
  Moon,
  Pause,
  Plane,
  Play,
  SkipBack,
  SkipForward,
  Sun,
  Volume2,
  Wifi,
} from "lucide-react";
import { useState, type ReactNode } from "react";

function ToggleTile({
  label,
  icon,
  defaultOn = false,
}: {
  label: string;
  icon: ReactNode;
  defaultOn?: boolean;
}) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex flex-col items-center gap-1.5">
      <IconButton
        aria-label={label}
        aria-pressed={on}
        variant={on ? "primary" : "default"}
        onClick={() => setOn((value) => !value)}
      >
        {icon}
      </IconButton>
      <span className="text-[11px] font-medium opacity-70">{label}</span>
    </div>
  );
}

function SliderTile({ label, icon, value }: { label: string; icon: ReactNode; value: number }) {
  return (
    <Surface
      elevation="raised"
      padding="none"
      className="col-span-4 flex items-center gap-3 rounded-3xl px-4 py-2"
    >
      <span className="opacity-70 [&_svg]:size-4">{icon}</span>
      <Slider aria-label={label} defaultValue={value} />
    </Surface>
  );
}

/** An Apple style control centre, composed only from kit components. */
export function ControlCenter({ className }: { className?: string }) {
  const [playing, setPlaying] = useState(true);
  const [focus, setFocus] = useState(false);

  return (
    <Surface
      padding="none"
      className={cn("grid w-full max-w-sm grid-cols-4 gap-3 rounded-[2.25rem] p-3.5", className)}
    >
      <Surface
        elevation="raised"
        padding="none"
        className="col-span-2 grid grid-cols-2 place-items-center gap-y-3 rounded-3xl p-3"
      >
        <ToggleTile label="Airplane" icon={<Plane />} />
        <ToggleTile label="Wi Fi" icon={<Wifi />} defaultOn />
        <ToggleTile label="Bluetooth" icon={<Bluetooth />} defaultOn />
        <ToggleTile label="Night" icon={<Moon />} />
      </Surface>

      <Surface
        elevation="raised"
        padding="none"
        className="col-span-2 flex flex-col justify-between rounded-3xl p-4"
      >
        <div className="flex items-center gap-3">
          <div className="size-10 shrink-0 rounded-xl bg-[conic-gradient(from_200deg,#f472b6,#60a5fa,#fbbf24,#f472b6)] shadow-raised" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Midnight City</p>
            <p className="truncate text-xs opacity-60">M83</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <IconButton aria-label="Previous" variant="ghost" size="sm">
            <SkipBack className="fill-current" />
          </IconButton>
          <IconButton
            aria-label={playing ? "Pause" : "Play"}
            variant="ghost"
            onClick={() => setPlaying((value) => !value)}
          >
            {playing ? <Pause className="fill-current" /> : <Play className="fill-current" />}
          </IconButton>
          <IconButton aria-label="Next" variant="ghost" size="sm">
            <SkipForward className="fill-current" />
          </IconButton>
        </div>
      </Surface>

      <button
        type="button"
        aria-pressed={focus}
        onClick={() => setFocus((value) => !value)}
        className={cn(
          "surface col-span-4 flex items-center gap-3 rounded-3xl px-4 py-3 text-left shadow-raised transition-[background-color,scale] duration-300 ease-spring active:scale-[0.98]",
          "outline-none focus-visible:ring-2 focus-visible:ring-ring",
          focus && "bg-accent/85 text-accent-foreground",
        )}
      >
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full",
            focus ? "bg-white/25" : "bg-foreground/10",
          )}
        >
          <Moon className="size-4" />
        </span>
        <span className="text-sm font-semibold">Focus</span>
        <span className="ml-auto text-xs opacity-70">{focus ? "On" : "Off"}</span>
      </button>

      <SliderTile label="Brightness" icon={<Sun />} value={70} />
      <SliderTile label="Volume" icon={<Volume2 />} value={45} />
    </Surface>
  );
}
