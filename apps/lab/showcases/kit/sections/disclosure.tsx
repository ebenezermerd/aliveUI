"use client";

import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  AccordionTrigger,
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
  Switch,
} from "@aliveui/glass";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

const faqs = [
  ["What is AliveUI?", "A workspace of design systems, each shipped as its own React library."],
  [
    "Is the glass system accessible?",
    "Behaviour, focus management and keyboard support come from Base UI, and contrast is tuned per mode.",
  ],
  ["Can I theme it?", "Override any --alive token on an element with data-system set to glass."],
];

export function DisclosureSection() {
  return (
    <ShowcaseSection
      id="disclosure"
      title="Disclosure"
      description="Accordions and collapsibles that animate their height smoothly."
    >
      <Panel className="grid gap-8 md:grid-cols-[3fr_2fr]">
        <Demo label="Accordion">
          <Accordion defaultValue={[faqs[0]![0]]}>
            {faqs.map(([question, answer]) => (
              <AccordionItem key={question} value={question}>
                <AccordionTrigger>{question}</AccordionTrigger>
                <AccordionPanel>{answer}</AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Demo>
        <Demo label="Collapsible">
          <Collapsible>
            <CollapsibleTrigger>Advanced settings</CollapsibleTrigger>
            <CollapsiblePanel className="space-y-3 pt-3 pl-9 text-sm">
              {["Hardware acceleration", "Developer menu", "Experimental features"].map(
                (label, index) => (
                  <label key={label} className="flex items-center justify-between gap-3">
                    {label}
                    <Switch defaultChecked={index === 0} />
                  </label>
                ),
              )}
            </CollapsiblePanel>
          </Collapsible>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
