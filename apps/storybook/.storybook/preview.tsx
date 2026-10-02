import { SystemProvider, type Mode } from "@aliveui/ui";
import type { Preview } from "@storybook/react-vite";
import "./preview.css";

const preview: Preview = {
  parameters: {
    layout: "fullscreen",
  },
  globalTypes: {
    system: {
      description: "Design system",
      toolbar: {
        title: "System",
        icon: "paintbrush",
        items: ["glass", "minimal"],
        dynamicTitle: true,
      },
    },
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
    system: "glass",
    mode: "light",
  },
  decorators: [
    // Every story renders in the system and mode picked in the toolbar.
    (Story, { globals }) => (
      <SystemProvider
        system={globals.system as string}
        mode={globals.mode as Mode}
        className="relative isolate min-h-dvh bg-background p-10"
      >
        <Story />
      </SystemProvider>
    ),
  ],
};

export default preview;
