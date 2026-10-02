import type { Meta, StoryObj } from "@storybook/react-vite";
import { withBackdrop } from "../../storybook/with-backdrop.js";
import { Accordion, AccordionItem, AccordionPanel, AccordionTrigger } from "./accordion.js";

const faqs = [
  ["What is AliveUI?", "A workspace of design systems shipped as React libraries."],
  ["Is surface accessible?", "Yes. Behaviour comes from Base UI and contrast is tuned per mode."],
  ["Can I theme it?", "Override any --alive token on a data system element."],
];

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  decorators: [withBackdrop],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Accordion {...args} className="max-w-md">
      {faqs.map(([question, answer]) => (
        <AccordionItem key={question}>
          <AccordionTrigger>{question}</AccordionTrigger>
          <AccordionPanel>{answer}</AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ),
};

export const Multiple: Story = { ...Default, args: { multiple: true } };
