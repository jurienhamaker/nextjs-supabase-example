"use client";
import { useLayoutEffect } from "react";

export function useLockBodyScroll(isLocked: boolean) {
  useLayoutEffect(() => {
    document.body.style.overflow = isLocked ? "hidden" : "visible";

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isLocked]);
}
