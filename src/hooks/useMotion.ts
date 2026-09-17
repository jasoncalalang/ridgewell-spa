import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function useVectorMotion(variant = "default") {
  const ref = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const svg = ref.current;
        if (!svg) return;

        const objects = svg.querySelectorAll(":scope > g[transform]");
        const routes = svg.querySelectorAll<SVGPathElement>(
          "[data-route], [data-routes] > path",
        );
        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: svg,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });

        timeline.from(objects, {
          opacity: 0,
          duration: 0.5,
          stagger: 0.12,
          ease: "power1.out",
          clearProps: "opacity",
        });
        routes.forEach((route, index) => {
          const length = route.getTotalLength();
          timeline.fromTo(
            route,
            { strokeDasharray: length, strokeDashoffset: length },
            {
              strokeDashoffset: 0,
              duration: 0.9,
              ease: "power2.inOut",
              clearProps: "strokeDasharray,strokeDashoffset",
            },
            0.2 + index * 0.08,
          );
        });
      });
      return () => media.revert();
    },
    { scope: ref, dependencies: [variant], revertOnUpdate: true },
  );

  return ref;
}

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
