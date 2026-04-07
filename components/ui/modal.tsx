"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type ModalProps = {
  open: boolean;
  title: string;
  description?: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

export function Modal({
  open,
  title,
  description,
  onClose,
  children,
  className
}: ModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <button
        type="button"
        aria-label="Fechar modal"
        className="absolute inset-0 bg-brand-950/35"
        onClick={onClose}
      />

      <div
        className={cn(
          "relative z-10 w-full max-w-2xl overflow-hidden rounded-[28px] border border-brand-300/55 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,243,238,0.96))] shadow-[0_28px_60px_-30px_rgba(17,17,17,0.34)]",
          className
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-brand-300/45 px-6 py-5 sm:px-7">
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-brand-950">
              {title}
            </h2>
            {description ? (
              <p className="mt-1 text-sm leading-6 text-brand-600">{description}</p>
            ) : null}
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="shrink-0"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="max-h-[calc(100vh-8rem)] overflow-y-auto px-6 py-6 sm:px-7">
          {children}
        </div>
      </div>
    </div>
  );
}
