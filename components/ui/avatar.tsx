import Image from "next/image";
import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  src?: string | null;
  className?: string;
  imageClassName?: string;
};

export function Avatar({ name, src, className, imageClassName }: AvatarProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-brand-950 text-sm font-semibold text-brand-100 shadow-[0_12px_24px_-18px_rgba(17,17,17,0.45)]",
        className
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={`Foto de perfil de ${name}`}
          fill
          sizes="40px"
          className={cn("object-cover", imageClassName)}
        />
      ) : (
        initials
      )}
    </div>
  );
}
