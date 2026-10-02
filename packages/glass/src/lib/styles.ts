/** Shared class recipes so every glass component moves and focuses the same way. */

/** Focus ring for controls. */
export const focusRing =
  "outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0";

/** Springy press and hover feedback for anything clickable. */
export const pressable =
  "transition-[background-color,box-shadow,scale,color,opacity] duration-(--alive-duration-base) ease-spring active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:scale-100";

/** Popup entrance and exit, driven by Base UI's starting and ending style attributes. */
export const popupMotion =
  "origin-(--transform-origin) transition-[scale,opacity,translate] duration-(--alive-duration-base) ease-spring data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 data-ending-style:duration-(--alive-duration-fast) data-ending-style:ease-standard motion-reduce:transition-none";

/** Shared surface for every floating popup. */
export const popupSurface = "glass-overlay rounded-2xl text-foreground shadow-floating";

/** Disabled look for controls that expose Base UI's disabled attribute. */
export const disabled = "data-disabled:pointer-events-none data-disabled:opacity-50";
