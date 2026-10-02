import { cn } from "@aliveui/primitives";
import { passwordStrength } from "../schemas.js";

const tones = ["", "bg-danger", "bg-warning", "bg-accent", "bg-success"] as const;

/** Four segments that fill as a password gets stronger. */
export function PasswordStrengthMeter({ value }: { value: string }) {
  const { score, label } = passwordStrength(value);
  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <div className="flex flex-1 gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <span
            key={step}
            className={cn(
              "h-1.5 flex-1 rounded-full bg-foreground/10 transition-colors duration-300",
              score >= step && tones[score],
            )}
          />
        ))}
      </div>
      <span className="w-12 text-right text-xs text-muted-foreground">{label}</span>
    </div>
  );
}
