import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useSectionMotion() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const root = ref.current;
        if (!root) return;
        const once = (trigger: Element) => ({
          trigger,
          start: "top 92%",
          toggleActions: "play none none none" as const,
        });
        root.querySelectorAll("h1, h2").forEach((heading) => {
          gsap.from(heading, {
            y: 12,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: once(heading),
          });
        });
        root.querySelectorAll(".hero-stage").forEach((stage) => {
          gsap.from(stage, {
            y: 24,
            duration: 0.7,
            ease: "power2.out",
            clearProps: "transform",
          });
        });
        root
          .querySelectorAll("[data-reveal]:not(.hero-stage)")
          .forEach((element) => {
            gsap.from(element, {
              y: 12,
              opacity: 0,
              duration: 0.6,
              ease: "power2.out",
              clearProps: "transform,opacity",
              scrollTrigger: once(element),
            });
          });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return ref;
}
