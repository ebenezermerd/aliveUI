"use client";

import { cn } from "@aliveui/primitives";
import { CheckboxGroup as BaseCheckboxGroup } from "@base-ui/react/checkbox-group";
import type { WithClassName } from "../../lib/styles.js";

export type CheckboxGroupProps = WithClassName<BaseCheckboxGroup.Props>;

/**
 * Shares one array value across several `Checkbox` elements. Give each one a
 * `value`, and add a parent checkbox with `parent` to select all.
 */
export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return <BaseCheckboxGroup className={cn("flex flex-col gap-3", className)} {...props} />;
}
