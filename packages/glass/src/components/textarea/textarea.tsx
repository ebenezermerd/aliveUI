"use client";

import { cn } from "@aliveui/primitives";
import { Field } from "@base-ui/react/field";
import type { Ref, TextareaHTMLAttributes } from "react";
import { fieldControl } from "../input/input.js";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  ref?: Ref<HTMLTextAreaElement>;
}

/** A multi line text field that grows with its content where the browser supports it. */
export function Textarea({ className, ...props }: TextareaProps) {
  return (
    <Field.Control
      render={
        <textarea
          className={cn(fieldControl, "min-h-24 resize-y py-2.5 [field-sizing:content]", className)}
          {...props}
        />
      }
    />
  );
}
