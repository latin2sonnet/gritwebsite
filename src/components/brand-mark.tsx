import Image from "next/image";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

/** G monogram from brand-pictures (favicon / header / footer) */
export function BrandMark({
  size = 32,
  className,
  priority = false,
}: BrandMarkProps) {
  return (
    <Image
      src="/brand/icon-g.jpg"
      alt="GRIT"
      width={size}
      height={size}
      priority={priority}
      className={cn(
        "rounded-md object-cover ring-1 ring-black/8",
        className
      )}
    />
  );
}
