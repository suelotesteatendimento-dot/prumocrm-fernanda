import { cn } from "@/lib/utils";

type AvatarProps = {
  name: string;
  className?: string;
};

export function Avatar({ name, className }: AvatarProps) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-brand-950 text-sm font-semibold text-brand-100 shadow-[0_12px_24px_-18px_rgba(17,17,17,0.45)]",
        className
      )}
    >
      {initials}
    </div>
  );
}
