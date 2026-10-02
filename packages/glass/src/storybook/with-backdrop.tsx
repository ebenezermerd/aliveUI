import type { Decorator } from "@storybook/react-vite";

/** Puts soft colour fields behind a story, since glass needs something to refract. */
export const withBackdrop: Decorator = (Story) => (
  <>
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-16 -left-10 size-72 rounded-full bg-fuchsia-400/70 blur-3xl" />
      <div className="absolute top-10 left-64 size-80 rounded-full bg-sky-400/70 blur-3xl" />
      <div className="absolute top-56 left-24 size-72 rounded-full bg-amber-300/70 blur-3xl" />
    </div>
    <Story />
  </>
);
