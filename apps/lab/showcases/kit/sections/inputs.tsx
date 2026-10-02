"use client";

import {
  Autocomplete,
  Button,
  Combobox,
  DatePicker,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Form,
  Input,
  MultiCombobox,
  NumberField,
  OTPField,
  Select,
  Textarea,
} from "@aliveui/ui";
import { Search } from "lucide-react";
import { Demo, ShowcaseSection } from "@/components/showcase/showcase-section";
import { Panel } from "./panel";

const cities = ["Addis Ababa", "Berlin", "Cape Town", "Lisbon", "Nairobi", "Osaka", "Toronto"].map(
  (label) => ({ value: label.toLowerCase().replace(/\s/g, ""), label }),
);

const tags = ["design", "development", "documentation", "glass", "motion", "tokens", "webgl"];

const countries = [
  { value: "et", label: "Ethiopia" },
  { value: "de", label: "Germany" },
  { value: "jp", label: "Japan" },
  { value: "us", label: "United States" },
];

export function InputsSection() {
  return (
    <ShowcaseSection
      id="inputs"
      title="Inputs"
      description="Recessed wells that light up with the accent colour on focus."
    >
      <Panel className="grid gap-8 md:grid-cols-2">
        <Demo label="Field with validation">
          <Field>
            <FieldLabel>Email</FieldLabel>
            <Input type="email" required placeholder="you@example.com" />
            <FieldDescription>Leave it empty and blur the field to see the error.</FieldDescription>
            <FieldError match="valueMissing">Please enter your email.</FieldError>
          </Field>
        </Demo>
        <Demo label="Select">
          <Field>
            <FieldLabel nativeLabel={false} render={<div />}>
              Country
            </FieldLabel>
            <Select items={countries} placeholder="Choose a country" aria-label="Country" />
          </Field>
        </Demo>
        <Demo label="Search">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 opacity-50" />
            <Input aria-label="Search" placeholder="Search" className="pl-10" />
          </div>
        </Demo>
        <Demo label="Textarea">
          <Field>
            <FieldLabel>Note</FieldLabel>
            <Textarea placeholder="Write something" />
          </Field>
        </Demo>
        <Demo label="Number field">
          <NumberField defaultValue={2} min={1} max={12} aria-label="Guests" />
        </Demo>
        <Demo label="One time code">
          <OTPField length={6} groupSize={3} aria-label="Verification code" />
        </Demo>
        <Demo label="Combobox">
          <Combobox items={cities} placeholder="Search cities" aria-label="City" />
        </Demo>
        <Demo label="Multi select">
          <MultiCombobox
            items={cities}
            defaultValue={[cities[0]!, cities[2]!]}
            placeholder="Add cities"
            aria-label="Cities"
          />
        </Demo>
        <Demo label="Autocomplete">
          <Autocomplete items={tags} search placeholder="Search tags" aria-label="Tag" />
        </Demo>
        <Demo label="Date picker">
          <DatePicker aria-label="Check in" min={new Date()} placeholder="Check in" />
        </Demo>
        <Demo label="Fieldset and form" className="md:col-span-2">
          <Form
            onSubmit={(event) => event.preventDefault()}
            className="grid gap-4 md:grid-cols-[1fr_1fr_auto] md:items-end"
          >
            <Fieldset className="contents">
              <FieldsetLegend className="sr-only">Billing details</FieldsetLegend>
              <Field name="company">
                <FieldLabel>Company</FieldLabel>
                <Input placeholder="Company name" />
              </Field>
              <Field name="tax">
                <FieldLabel>Tax ID</FieldLabel>
                <Input placeholder="Fiscal number" />
              </Field>
            </Fieldset>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Form>
        </Demo>
      </Panel>
    </ShowcaseSection>
  );
}
