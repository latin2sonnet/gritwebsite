import type { ElementType } from "react";
import {
  ArrowRight,
  BookOpen,
  Camera,
  Check,
  Cpu,
  MessageSquare,
  ScanLine,
  Sparkles,
  Wrench,
} from "lucide-react";

export const MICRO_ICONS = {
  "arrow-right": ArrowRight,
  "book-open": BookOpen,
  camera: Camera,
  check: Check,
  cpu: Cpu,
  chat: MessageSquare,
  "scan-line": ScanLine,
  sparkles: Sparkles,
  wrench: Wrench,
} as const;

export type MicroIconName = keyof typeof MICRO_ICONS;
export type MicroIconProp = MicroIconName | ElementType;

export function resolveMicroIcon(icon: MicroIconProp): ElementType {
  if (typeof icon === "string") {
    return MICRO_ICONS[icon as MicroIconName] ?? Sparkles;
  }
  return icon;
}
