import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
  },
  globalTypes: {
    mode: {
      description: "Colour mode",
      toolbar: {
        title: "Mode",
        icon: "mirror",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    mode: "light",
  },
  decorators: [
    // Each story file sets `parameters.system` so its tokens resolve.
    (Story, { parameters, globals }) => (
      <div
        data-system={parameters.system as string | undefined}
        data-mode={globals.mode as string}
        className="relative isolate min-h-dvh bg-background p-10"
      >
        <Story />
      </div>
    ),
  ],
};

export default preview;
