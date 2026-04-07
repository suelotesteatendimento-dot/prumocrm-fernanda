import Image from "next/image";

export function LogoMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="relative h-[128px] w-[214px]">
        <Image
          src="/logo.png"
          alt="Logo da clínica MBW Espaço Integrativo"
          fill
          priority
          sizes="(max-width: 1024px) 214px, 214px"
          className="object-contain object-center"
        />
      </div>
    </div>
  );
}
