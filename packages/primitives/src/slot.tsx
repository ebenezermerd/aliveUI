import {
  cloneElement,
  isValidElement,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "./cn.js";

type AnyProps = Record<string, unknown>;

function composeRefs<T>(...refs: (Ref<T> | undefined)[]): Ref<T> {
  return (node) => {
    const cleanups = refs.map((ref) => {
      if (typeof ref === "function") return ref(node);
      if (ref) ref.current = node;
      return undefined;
    });
    return () => {
      cleanups.forEach((cleanup, index) => {
        if (typeof cleanup === "function") {
          cleanup();
          return;
        }
        const ref = refs[index];
        if (typeof ref === "function") ref(null);
        else if (ref) ref.current = null;
      });
    };
  };
}

function mergeProps(slotProps: AnyProps, childProps: AnyProps): AnyProps {
  const merged: AnyProps = { ...slotProps, ...childProps };

  for (const key of Object.keys(slotProps)) {
    const slotValue = slotProps[key];
    const childValue = childProps[key];

    if (/^on[A-Z]/.test(key) && typeof slotValue === "function") {
      merged[key] =
        typeof childValue === "function"
          ? (...args: unknown[]) => {
              childValue(...args);
              slotValue(...args);
            }
          : slotValue;
    } else if (key === "className") {
      merged[key] = cn(slotValue as string | undefined, childValue as string | undefined);
    } else if (key === "style") {
      merged[key] = { ...(slotValue as CSSProperties), ...(childValue as CSSProperties) };
    } else if (key === "ref") {
      merged[key] = childValue
        ? composeRefs(slotValue as Ref<unknown>, childValue as Ref<unknown>)
        : slotValue;
    }
  }

  return merged;
}

export interface SlotProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
  ref?: Ref<HTMLElement>;
}

/**
 * Renders its single child element with the slot's props merged in. This is
 * what powers `asChild`, letting a component lend its styling and behaviour
 * to another element such as a link.
 */
export function Slot({ children, ...slotProps }: SlotProps) {
  if (!isValidElement<AnyProps>(children)) return null;
  return cloneElement(children, mergeProps(slotProps, children.props));
}
