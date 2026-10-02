"use client";

import { Button, IconButton, Toggle, ToggleGroup } from "@aliveui/ui";
import { Bold, Heart, Italic, Plus, Search, Share, Star, Trash2 } from "lucide-react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

export function ButtonsSection() {
  return (
    <ShowcaseSection
      id="buttons"
      title="Buttons"
      description="Default, primary, ghost and destructive variants, with feedback while pressed."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Variants">
          <div className="flex flex-wrap items-center gap-3">
            <Button>Default</Button>
            <Button variant="primary">Tinted</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </Demo>
        <Demo label="Sizes">
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button>Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </Demo>
        <Demo label="With icons">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">
              <Plus /> New note
            </Button>
            <Button>
              <Share /> Share
            </Button>
            <Button disabled>Disabled</Button>
          </div>
        </Demo>
        <Demo label="Icon buttons">
          <div className="flex flex-wrap items-center gap-3">
            <IconButton aria-label="Search" size="sm">
              <Search />
            </IconButton>
            <IconButton aria-label="Favourite">
              <Heart />
            </IconButton>
            <IconButton aria-label="Add" variant="primary">
              <Plus />
            </IconButton>
            <IconButton aria-label="Delete" variant="danger" size="lg">
              <Trash2 />
            </IconButton>
          </div>
        </Demo>
        <Demo label="Toggle">
          <div className="flex flex-wrap items-center gap-3">
            <Toggle aria-label="Favourite" defaultPressed>
              <Star />
            </Toggle>
            <ToggleGroup multiple defaultValue={["bold"]} aria-label="Text style">
              <Toggle value="bold" aria-label="Bold" size="sm">
                <Bold />
              </Toggle>
              <Toggle value="italic" aria-label="Italic" size="sm">
                <Italic />
              </Toggle>
            </ToggleGroup>
          </div>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
