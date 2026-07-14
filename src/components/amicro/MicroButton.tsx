"use client";

/**
 * Amicro micro-transitions (MIT) - adapted for GRITSITE monochrome brand.
 * Source: https://github.com/Subhan-code/Amicro--Micro-transitions-
 */

import {
  useState,
  type ButtonHTMLAttributes,
  type ElementType,
} from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import {
  resolveMicroIcon,
  type MicroIconProp,
} from "./icons";

export type MicroInteraction =
  | "slide-arrow"
  | "sparkle"
  | "morph"
  | "color-morph"
  | "pulse"
  | "rotate"
  | "shake"
  | "ring";

export type MicroVariant = "primary" | "outline" | "ghost" | "soft" | "danger";
export type MicroSize = "sm" | "md" | "lg";
export type { MicroIconName, MicroIconProp } from "./icons";

type SharedProps = {
  label: string;
  interaction?: MicroInteraction;
  icon: MicroIconProp;
  iconHover?: MicroIconProp;
  successLabel?: string;
  success?: boolean;
  variant?: MicroVariant;
  size?: MicroSize;
  fullWidth?: boolean;
  className?: string;
  accentClass?: string;
};

type AsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
    href?: undefined;
  };

type AsLink = SharedProps & {
  href: string;
  target?: string;
  type?: never;
  disabled?: boolean;
};

export type MicroButtonProps = AsButton | AsLink;

const spring = { type: "spring" as const, stiffness: 600, damping: 25 };

const variants: Record<MicroVariant, string> = {
  primary:
    "bg-neutral-100 text-neutral-950 hover:bg-white shadow-[0_1px_0_rgba(255,255,255,0.35)_inset]",
  outline:
    "border border-white/20 bg-transparent text-white hover:border-white/40 hover:bg-white/5",
  ghost: "bg-transparent text-neutral-300 hover:bg-white/5 hover:text-white",
  soft: "bg-white/[0.04] text-neutral-100 hover:bg-white/[0.08] border border-white/10",
  danger:
    "border border-white/25 bg-white/5 text-neutral-200 hover:bg-white/10 hover:text-white",
};

const sizes: Record<MicroSize, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-7 text-base",
};

function SparkleGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l2.4 7.6H22l-6.2 4.5 2.4 7.6-6.2-4.5-6.2 4.5 2.4-7.6L2 9.6h7.6z" />
    </svg>
  );
}

function MicroInner({
  label,
  interaction,
  Icon1,
  Icon2,
  successLabel,
  success,
  variant,
  hovered,
  accentClass,
}: {
  label: string;
  interaction: MicroInteraction;
  Icon1: ElementType;
  Icon2?: ElementType;
  successLabel?: string;
  success: boolean;
  variant: MicroVariant;
  hovered: boolean;
  accentClass?: string;
}) {
  const showSecond =
    success ||
    (hovered &&
      (interaction === "morph" ||
        interaction === "slide-arrow" ||
        interaction === "sparkle" ||
        interaction === "ring" ||
        interaction === "color-morph") &&
      !!Icon2);
  const displayLabel = success && successLabel ? successLabel : label;
  // Inherit button text color so inverted CTAs (dark fill + white type) stay readable
  const iconColor = "text-current";
  const accent =
    accentClass ||
    (variant === "primary" ? "text-current" : "text-neutral-100");

  if (interaction === "slide-arrow") {
    return (
      <>
        <AnimatePresence mode="popLayout" initial={false}>
          {!hovered && (
            <motion.span
              key="i1"
              layout
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={spring}
              className="mr-2 flex shrink-0 items-center"
            >
              <Icon1 className={cn("h-4 w-4", iconColor)} />
            </motion.span>
          )}
        </AnimatePresence>
        <motion.span layout className="whitespace-nowrap tracking-tight">
          {displayLabel}
        </motion.span>
        <AnimatePresence mode="popLayout" initial={false}>
          {hovered && Icon2 && (
            <motion.span
              key="i2"
              layout
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={spring}
              className="ml-2 flex shrink-0 items-center"
            >
              <Icon2 className={cn("h-4 w-4", iconColor)} />
            </motion.span>
          )}
        </AnimatePresence>
      </>
    );
  }

  if (interaction === "sparkle") {
    return (
      <>
        <span className="relative mr-2 flex h-4 w-4 shrink-0 items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {!hovered ? (
              <motion.span
                key="s1"
                initial={{ y: -12, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: -12, opacity: 0, scale: 0.8 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Icon1 className={cn("h-4 w-4", iconColor)} />
              </motion.span>
            ) : (
              <motion.span
                key="s2"
                initial={{ y: 12, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 12, opacity: 0, scale: 0.8 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                {Icon2 ? (
                  <Icon2 className={cn("h-4 w-4", accent)} />
                ) : (
                  <Icon1 className={cn("h-4 w-4", accent)} />
                )}
                <motion.span
                  initial={{ opacity: 0, scale: 0, rotate: -45, y: 8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ ...spring, delay: 0.05 }}
                  className="absolute -right-2 -top-3"
                >
                  <SparkleGlyph className="h-2.5 w-2.5 text-neutral-200" />
                </motion.span>
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <motion.span layout className="whitespace-nowrap tracking-tight">
          {displayLabel}
        </motion.span>
      </>
    );
  }

  if (interaction === "morph") {
    return (
      <>
        <span className="relative mr-2 flex h-4 w-4 shrink-0 items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {!showSecond ? (
              <motion.span
                key="m1"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Icon1 className={cn("h-4 w-4", iconColor)} />
              </motion.span>
            ) : (
              <motion.span
                key="m2"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                {Icon2 && (
                  <Icon2 className={cn("h-4 w-4", accent)} />
                )}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <motion.span layout className="whitespace-nowrap tracking-tight">
          {displayLabel}
        </motion.span>
      </>
    );
  }

  if (interaction === "color-morph") {
    return (
      <>
        <span className="relative mr-2 flex h-4 w-4 shrink-0 items-center justify-center">
          <Icon1
            className={cn(
              "h-4 w-4 transition-colors duration-300",
              hovered || success ? cn(accent, "fill-current") : iconColor
            )}
          />
        </span>
        <span className="whitespace-nowrap tracking-tight">{displayLabel}</span>
      </>
    );
  }

  if (interaction === "pulse") {
    return (
      <>
        <motion.span
          className="mr-2 flex shrink-0"
          animate={{ scale: hovered ? [1, 1.22, 1] : 1 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          <Icon1
            className={cn(
              "h-4 w-4",
              iconColor,
              hovered && variant !== "primary" && cn("fill-current", accent)
            )}
          />
        </motion.span>
        <span className="whitespace-nowrap tracking-tight">{displayLabel}</span>
      </>
    );
  }

  if (interaction === "shake") {
    return (
      <>
        <motion.span
          className="mr-2 flex shrink-0"
          animate={
            hovered
              ? { y: [0, -2, 0, -2, 0], rotate: [0, -10, 10, -10, 0] }
              : { y: 0, rotate: 0 }
          }
          transition={{ duration: 0.4 }}
        >
          <Icon1 className={cn("h-4 w-4", iconColor)} />
        </motion.span>
        <span className="whitespace-nowrap tracking-tight">{displayLabel}</span>
      </>
    );
  }

  if (interaction === "ring") {
    return (
      <>
        <span className="relative mr-2 flex h-4 w-4 shrink-0 items-center justify-center">
          <AnimatePresence mode="popLayout" initial={false}>
            {!hovered ? (
              <motion.span
                key="r1"
                initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Icon1 className={cn("h-4 w-4", iconColor)} />
              </motion.span>
            ) : (
              <motion.span
                key="r2"
                initial={{ rotate: -15, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                exit={{ rotate: 15, scale: 0.8, opacity: 0 }}
                transition={spring}
                className="absolute inset-0 flex items-center justify-center"
              >
                {Icon2 ? (
                  <Icon2 className={cn("h-4 w-4", accent)} />
                ) : (
                  <Icon1 className={cn("h-4 w-4", accent)} />
                )}
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 600,
                    damping: 15,
                    delay: 0.1,
                  }}
                  className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-neutral-100"
                />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <motion.span layout className="whitespace-nowrap tracking-tight">
          {displayLabel}
        </motion.span>
      </>
    );
  }

  return (
    <>
      <motion.span
        className="mr-2 flex shrink-0"
        animate={{ rotate: hovered ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <Icon1 className={cn("h-4 w-4", iconColor)} />
      </motion.span>
      <span className="whitespace-nowrap tracking-tight">{displayLabel}</span>
    </>
  );
}

export function MicroButton(props: MicroButtonProps) {
  const {
    label,
    interaction = "slide-arrow",
    icon,
    iconHover,
    successLabel,
    success = false,
    variant = "primary",
    size = "md",
    fullWidth,
    className,
    accentClass,
  } = props;

  const Icon1 = resolveMicroIcon(icon);
  const Icon2 = iconHover ? resolveMicroIcon(iconHover) : undefined;
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();

  const shell = cn(
    "relative inline-flex items-center justify-center rounded-full font-semibold outline-none focus-visible:ring-2 focus-visible:ring-white/40 cursor-pointer",
    variants[variant],
    sizes[size],
    fullWidth && "w-full",
    className
  );

  const inner = (
    <motion.div
      layout
      transition={spring}
      className="flex items-center justify-center"
    >
      <MicroInner
        label={label}
        interaction={interaction}
        Icon1={Icon1}
        Icon2={Icon2}
        successLabel={successLabel}
        success={success}
        variant={variant}
        hovered={hovered || success}
        accentClass={accentClass}
      />
    </motion.div>
  );

  const hoverHandlers = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
  };

  if ("href" in props && props.href) {
    if (reduce) {
      return (
        <Link
          href={props.href}
          target={props.target}
          className={shell}
        >
          <span className="flex items-center justify-center">
            <Icon1 className="mr-2 h-4 w-4 text-current" />
            <span className="whitespace-nowrap tracking-tight">{label}</span>
          </span>
        </Link>
      );
    }
    return (
      <motion.div
        className={cn(fullWidth ? "block w-full" : "inline-flex")}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.96 }}
        transition={spring}
      >
        <Link
          href={props.href}
          target={props.target}
          className={shell}
          {...hoverHandlers}
        >
          {inner}
        </Link>
      </motion.div>
    );
  }

  const btn = props as AsButton;
  const { type = "button", disabled, onClick, id, name, form, value } = btn;

  if (reduce) {
    return (
      <button
        type={type}
        disabled={disabled}
        id={id}
        name={name}
        form={form}
        value={value}
        onClick={onClick}
        className={cn(shell, disabled && "pointer-events-none opacity-50")}
      >
        <span className="flex items-center justify-center">
          <Icon1 className="mr-2 h-4 w-4 text-current" />
          <span className="whitespace-nowrap tracking-tight">{label}</span>
        </span>
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      id={id}
      name={name}
      form={form}
      value={value}
      whileHover={disabled ? undefined : { scale: 1.02 }}
      whileTap={disabled ? undefined : { scale: 0.96 }}
      transition={spring}
      onClick={onClick}
      className={cn(shell, disabled && "pointer-events-none opacity-50")}
      {...hoverHandlers}
    >
      {inner}
    </motion.button>
  );
}
