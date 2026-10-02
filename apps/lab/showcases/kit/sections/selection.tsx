"use client";

import { Checkbox, CheckboxGroup, Radio, RadioGroup, Slider, Switch } from "@aliveui/ui";
import { useState } from "react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

const apps = ["mail", "photos", "notes", "reminders"];

function SyncApps() {
  const [value, setValue] = useState<string[]>(["photos", "notes"]);
  return (
    <CheckboxGroup
      value={value}
      onValueChange={setValue}
      allValues={apps}
      aria-label="Sync apps"
      className="flex-row flex-wrap items-center gap-x-6"
    >
      <label className="flex items-center gap-2.5 text-sm font-medium">
        <Checkbox parent /> Sync everything
      </label>
      {apps.map((app) => (
        <label key={app} className="flex items-center gap-2.5 text-sm capitalize">
          <Checkbox value={app} /> {app}
        </label>
      ))}
    </CheckboxGroup>
  );
}

export function SelectionSection() {
  return (
    <ShowcaseSection
      id="selection"
      title="Selection"
      description="Checkboxes, radios, switches and sliders with spring feedback."
    >
      <Panel className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <Demo label="Checkbox">
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex items-center gap-2.5">
              <Checkbox defaultChecked /> Photos
            </label>
            <label className="flex items-center gap-2.5">
              <Checkbox /> Messages
            </label>
            <label className="flex items-center gap-2.5">
              <Checkbox indeterminate /> Some folders
            </label>
          </div>
        </Demo>
        <Demo label="Radio">
          <RadioGroup defaultValue="week" aria-label="Summary frequency" className="text-sm">
            {["day", "week", "month"].map((value) => (
              <label key={value} className="flex items-center gap-2.5 capitalize">
                <Radio value={value} /> Every {value}
              </label>
            ))}
          </RadioGroup>
        </Demo>
        <Demo label="Switch">
          <div className="flex flex-col gap-3 text-sm">
            <label className="flex items-center justify-between gap-3">
              Wi Fi <Switch defaultChecked />
            </label>
            <label className="flex items-center justify-between gap-3">
              Bluetooth <Switch />
            </label>
            <label className="flex items-center justify-between gap-3 opacity-80">
              Hotspot <Switch disabled />
            </label>
          </div>
        </Demo>
        <Demo label="Slider">
          <div className="space-y-2">
            <Slider aria-label="Volume" defaultValue={60} />
            <Slider defaultValue={[25, 75]} thumbLabels={["Minimum price", "Maximum price"]} />
          </div>
        </Demo>
        <Demo label="Checkbox group" className="md:col-span-2 lg:col-span-4">
          <SyncApps />
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
