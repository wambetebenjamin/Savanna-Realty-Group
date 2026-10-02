import Image, { ImageProps } from "next/image";
import { blurFor } from "@/lib/blur";

interface SmartImageProps extends Omit<ImageProps, "src" | "placeholder" | "blurDataURL" | "alt"> {
  /** Image name inside /public/images (without extension) */
  name: string;
  alt: string;
}

/**
 * next/image wrapper that automatically attaches the generated blur
 * placeholder for every project photo.
 */
export function SmartImage({ name, alt, ...props }: SmartImageProps) {
  return (
    <Image
      src={`/images/${name}.jpg`}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurFor(name)}
      quality={82}
      {...props}
    />
  );
}
