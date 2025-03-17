"use client";

import React, { PropsWithChildren, useEffect, useRef } from "react";
import { ReactLenis, useLenis } from "@studio-freight/react-lenis";
import { LenisOptions } from "@studio-freight/lenis";
import Lenis from "@studio-freight/lenis";
import { usePathname } from "next/navigation";

const SmoothScroll = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useLenis((lenis: Lenis) => {
    lenisRef.current = lenis;
  });

  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname]);

  const lenisOptions: LenisOptions = {
    duration: 3.5,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
    orientation: "vertical" as const,
    gestureOrientation: "vertical" as const,
  };

  return (
    <ReactLenis root options={lenisOptions} autoRaf={true}>
      {children}
    </ReactLenis>
  );
};

export default SmoothScroll;