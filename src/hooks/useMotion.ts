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
        ref.current?.querySelectorAll("h1, h2").forEach((heading) => {
          gsap.from(heading, {
            y: 12,
            duration: 0.55,
            ease: "power2.out",
            clearProps: "transform",
            scrollTrigger: {
              trigger: heading,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          });
        });
      });
      return () => media.revert();
    },
    { scope: ref },
  );

  return ref;
}
