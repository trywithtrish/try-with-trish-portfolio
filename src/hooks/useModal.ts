"use client";

import { useCallback, useRef, useState } from "react";
import type { Collab } from "@/lib/data";

export function useModal() {
  const [item, setItem] = useState<Collab | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((collab: Collab, trigger?: HTMLElement | null) => {
    triggerRef.current = trigger ?? (document.activeElement as HTMLElement);
    setItem(collab);
  }, []);

  const close = useCallback(() => {
    setItem(null);
    // Return focus to the trigger that opened the modal
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  return { item, open, close };
}
