"use client";

import {
  MicroButton,
  type MicroIconProp,
  type MicroInteraction,
  type MicroSize,
  type MicroVariant,
} from "./MicroButton";

type MicroLinkProps = {
  href: string;
  label: string;
  icon: MicroIconProp;
  iconHover?: MicroIconProp;
  interaction?: MicroInteraction;
  variant?: MicroVariant;
  size?: MicroSize;
  fullWidth?: boolean;
  className?: string;
  target?: string;
  accentClass?: string;
};

export function MicroLink({
  href,
  label,
  icon,
  iconHover,
  interaction = "slide-arrow",
  variant = "primary",
  size = "md",
  fullWidth,
  className,
  target,
  accentClass,
}: MicroLinkProps) {
  return (
    <MicroButton
      href={href}
      target={target}
      label={label}
      icon={icon}
      iconHover={iconHover}
      interaction={interaction}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      className={className}
      accentClass={accentClass}
    />
  );
}
