import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { heroMap } from "../content";

gsap.registerPlugin(useGSAP);

/*
 * A decorative flowchart behind the hero. Its resting state is plain CSS: a soft
 * field of blurred cards. On a first desktop visit with motion allowed, an intro
 * draws the chart (pattern and timings from fruitful.com's homepage intro), then
 * fans the cards out into that resting state and brings the hero in.
 *
 * Geometry is in a fixed 1920x1080 stage, scaled to the viewport.
 */

export const introKey = "ridgewell:map-intro";
const introWindowMs = 2 * 60 * 60 * 1000;
const playQuery =
  "(min-width: 992px) and (prefers-reduced-motion: no-preference)";

const STAGE = { w: 1920, h: 1080 };
const CARD = { w: 272, h: 76 };
const SPINE_X = 760;
const NODE_HALF = 64;
const CARD_X = 1000;
const MID_X = (SPINE_X + NODE_HALF + CARD_X) / 2;
const SOURCE = { x: STAGE.w / 2 - CARD.w / 2, y: 110 };
const PILL = { w: 494, h: 144, cx: STAGE.w / 2, cy: 458, rise: 300 };

/** Where each branch node sits on the spine, and its intro beat. */
const NODES = [
  { y: 300, beat: 2 },
  { y: 606, beat: 4 },
  { y: 914, beat: 6 },
];
/** Card centres in the chart, per branch. */
const CARD_Y = [[300], [430, 518, 606, 694, 782], [870, 958]];
/** Resting (fanned-out) card positions: left edge and vertical centre. */
const FAN: Record<string, [number, number]> = {
  source: [1660, 720],
  website: [180, 330],
  portal: [1580, 250],
  staff: [1640, 560],
  registrar: [120, 620],
  hr: [1500, 880],
  college: [260, 900],
  leasetrack: [1720, 410],
  ledger: [60, 475],
};

const beatAt = (beat: number) => 1.7 + (beat - 1) * 0.2;

const branchPipe = (fromY: number, toY: number) => {
  const x0 = SPINE_X + NODE_HALF;
  return fromY === toY
    ? `M${x0} ${fromY}L${CARD_X} ${toY}`
    : `M${x0} ${fromY}C${MID_X} ${fromY} ${MID_X} ${toY} ${CARD_X} ${toY}`;
};

const cards = heroMap.branches.flatMap((branch, b) =>
  branch.cards.map((card, i) => ({
    ...card,
    branch: b,
    cy:
      CARD_Y[b][i] ??
      CARD_Y[b][CARD_Y[b].length - 1] + 88 * (i + 1 - CARD_Y[b].length),
  })),
);

const ICONS: Record<string, string> = {
  website: "M3 5h18v14H3zM3 9h18",
  portal:
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 19c0-3 3-5 6-5s6 2 6 5M17 11a2.5 2.5 0 1 0 0-5M21 19c0-2.5-1.5-4-4-4.5",
  staff: "M8 4h8v3H8zM6 6H5v15h14V6h-1M8 12h8M8 16h5",
  registrar: "M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h7",
  hr: "M4 7V4h3M17 4h3v3M20 17v3h-3M7 20H4v-3M8 12h8",
  college: "M2 9l10-5 10 5-10 5zM6 11v5c2 2 10 2 12 0v-5",
  leasetrack: "M5 21V4h10v17M15 9h4v12M8 8h4M8 12h4M8 16h4M3 21h18",
  ledger: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  source: "M4 21V8l8-5 8 5v13M9 21v-6h6v6",
};

function Icon({ id }: { id: string }) {
  return (
    <svg className="hero-map-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d={ICONS[id] ?? ICONS.source} />
    </svg>
  );
}

/**
 * Backdrop labels are painted with CSS generated content: the chart is decoration,
 * so its words stay out of the text that assistive tech and contrast checks read.
 */
function Text({ value, className }: { value: string; className?: string }) {
  return <span className={className} data-text={value} />;
}

function fanStyle(id: string) {
  const [left, cy] = FAN[id] ?? [0, 0];
  return { left: `${left}px`, top: `${cy - CARD.h / 2}px` };
}

function seenRecently() {
  try {
    const shown = Number(localStorage.getItem(introKey));
    return Boolean(shown) && Date.now() - shown < introWindowMs;
  } catch {
    return false;
  }
}

let introDecision: boolean | undefined;

/** Decide once per page load (React may mount effects twice in development). */
function shouldPlayIntro() {
  if (introDecision === undefined) {
    introDecision =
      window.matchMedia(playQuery).matches &&
      !location.hash &&
      window.scrollY === 0 &&
      !seenRecently();
    if (introDecision) markSeen();
  }
  return introDecision;
}

function markSeen() {
  try {
    localStorage.setItem(introKey, String(Date.now()));
  } catch {
    /* storage blocked: the intro may play again next visit */
  }
}

export default function HeroMap() {
  const root = useRef<HTMLDivElement>(null);

  // Fit the fixed stage to the viewport (layout, not motion).
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const fit = () =>
      el.style.setProperty(
        "--map-fit",
        String(
          gsap.utils.clamp(
            0.45,
            1,
            Math.min(window.innerHeight / STAGE.h, window.innerWidth / 460),
          ),
        ),
      );
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useGSAP(
    () => {
      const el = root.current;
      // Decide once, at load: never start the intro mid-page.
      if (!el || !shouldPlayIntro()) return;
      let started = false;
      const html = document.documentElement;
      const mm = gsap.matchMedia();
      mm.add(playQuery, () => {
        if (started) return;
        started = true;
        html.dataset.intro = "playing";

        const q = gsap.utils.selector(el);
        const stage = q(".hero-map-stage")[0];
        const mark = q(".hero-map-mark")[0];
        const source = q(".hero-map-source")[0];
        const fans = q(".hero-map-fan");
        const nodes = q(".hero-map-node");
        const checks = q(".hero-map-check");
        const pipes = Array.from(
          el.querySelectorAll<SVGPathElement>(".hero-map-pipe"),
        );
        const header = document.querySelector(".site-header");
        const headerLogo = document.querySelector(".site-header .brand img");
        // Outside this component's scope, so query the document directly.
        const heroItems = Array.from(
          document.querySelectorAll<HTMLElement>(
            ".hero-copy > *, .hero-stage, .proof",
          ),
        );

        pipes.forEach((pipe) => {
          const length = pipe.getTotalLength();
          // Hidden until drawn: a round cap on an undrawn path still paints a dot.
          gsap.set(pipe, {
            strokeDasharray: length,
            strokeDashoffset: length,
            autoAlpha: 0,
          });
        });
        gsap.set(heroItems, { autoAlpha: 0 });
        if (header) gsap.set(header, { autoAlpha: 0 });
        gsap.set(stage, { filter: "blur(0px)" });
        gsap.set(q(".hero-map-pipes"), { autoAlpha: 1 });
        gsap.set([...nodes, ...checks], { autoAlpha: 0 });
        gsap.set(checks, { scale: 0 });
        gsap.set(q(".hero-map-fill"), { scaleX: 0 });
        gsap.set(q(".hero-map-strip"), { x: 0, xPercent: 0 });
        gsap.set(q(".hero-map-big"), { autoAlpha: 1 });
        gsap.set(
          q(
            ".hero-map-source .hero-map-head, .hero-map-source .hero-map-track",
          ),
          {
            autoAlpha: 0,
          },
        );

        // Every fanned element starts at its place in the chart, unscaled and hidden.
        const chartOffset = (fan: HTMLElement) => {
          const id = fan.dataset.id ?? "";
          const [left, cy] = FAN[id] ?? [0, 0];
          const card = cards.find((c) => c.id === id);
          const chart =
            id === "source"
              ? { x: SOURCE.x, y: SOURCE.y }
              : { x: CARD_X, y: (card?.cy ?? cy) - CARD.h / 2 };
          return { x: chart.x - left, y: chart.y - (cy - CARD.h / 2) };
        };
        fans.forEach((fan) => {
          gsap.set(fan, { ...chartOffset(fan), scale: 1, autoAlpha: 0 });
        });
        const [srcLeft, srcCy] = FAN.source;
        gsap.set(source, {
          x: PILL.cx - PILL.w / 2 - srcLeft,
          y: PILL.cy - PILL.h / 2 + PILL.rise - (srcCy - CARD.h / 2),
          width: PILL.w,
          height: PILL.h,
          borderRadius: 64,
          autoAlpha: 0,
        });

        const tl = gsap.timeline({
          defaults: { ease: "power2.out" },
          onComplete: finish,
        });

        // Logo mark: pop in at the centre, then land on the header logo.
        tl.fromTo(
          mark,
          { xPercent: -50, yPercent: -50, autoAlpha: 0, scale: 0.9 },
          { autoAlpha: 1, scale: 1, duration: 0.45 },
          0.05,
        );
        if (headerLogo) {
          tl.to(
            mark,
            {
              duration: 1.2,
              ease: "power2.inOut",
              x: () => {
                const r = headerLogo.getBoundingClientRect();
                return r.left + r.width / 2 - window.innerWidth / 2;
              },
              y: () => {
                const r = headerLogo.getBoundingClientRect();
                return r.top + r.height / 2 - window.innerHeight / 2;
              },
              scale: () =>
                headerLogo.getBoundingClientRect().width /
                mark.getBoundingClientRect().width,
            },
            0.75,
          );
        }
        // The header (and its logo) appears only as the mark lands on it.
        if (header) tl.to(header, { autoAlpha: 1, duration: 0.3 }, 1.8);
        tl.to(mark, { autoAlpha: 0, duration: 0.2 }, 1.95);

        // Source pill morphs into the "Built for" card; its ticker slides.
        tl.to(source, { autoAlpha: 1, duration: 0.4 }, 0.75)
          .to(
            source,
            {
              ...chartOffset(source),
              width: CARD.w,
              height: CARD.h,
              borderRadius: 16,
              duration: 1.1,
              ease: "power2.inOut",
            },
            0.75,
          )
          .to(q(".hero-map-big"), { autoAlpha: 0, duration: 0.25 }, 1.05)
          .to(
            q(
              ".hero-map-source .hero-map-head, .hero-map-source .hero-map-track",
            ),
            { autoAlpha: 1, duration: 0.3 },
            1.15,
          )
          .to(
            q(".hero-map-strip"),
            {
              xPercent: -100 * (heroMap.audiences.length - 1),
              duration: 0.7,
              ease: "power3.inOut",
            },
            1.25,
          );

        // The chart draws, beat by beat.
        const [sourcePipe, ...spine] = pipes.filter(
          (p) => p.dataset.kind !== "branch",
        );
        const branchPipes = pipes.filter((p) => p.dataset.kind === "branch");
        const draw = (duration: number) => ({
          strokeDashoffset: 0,
          autoAlpha: 1,
          duration,
          ease: "none",
        });
        tl.to(sourcePipe, draw(0.32), beatAt(1));
        spine.forEach((pipe, i) => tl.to(pipe, draw(0.32), beatAt(1 + i * 2)));
        nodes.forEach((node, i) =>
          tl.to(node, { autoAlpha: 1, duration: 0.3 }, beatAt(NODES[i].beat)),
        );
        cards.forEach((card, i) => {
          const at = beatAt(NODES[card.branch].beat) + 0.05 * (i % 5);
          const fan = fans.find((f) => f.dataset.id === card.id);
          tl.to(branchPipes[i], draw(0.28), at);
          if (fan) {
            const offset = chartOffset(fan);
            tl.fromTo(
              fan,
              { y: offset.y + 14 },
              { y: offset.y, autoAlpha: 1, duration: 0.4 },
              at + 0.08,
            ).to(
              fan.querySelector(".hero-map-fill"),
              { scaleX: 1, duration: 0.45 },
              at + 0.2,
            );
          }
          tl.to(
            checks[i],
            { autoAlpha: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" },
            at + 0.2,
          );
        });

        // The chart dissolves into the backdrop; the hero comes in.
        tl.to(
          [...pipes, ...nodes, ...checks],
          {
            autoAlpha: 0,
            duration: 0.6,
            stagger: { each: 0.035, from: "end" },
          },
          3.45,
        )
          .to(
            fans,
            {
              x: 0,
              y: 0,
              scale: 1.25,
              autoAlpha: 0.4,
              duration: 2.2,
              ease: "power2.inOut",
            },
            3.45,
          )
          .to(
            stage,
            { filter: "blur(14px)", duration: 1.2, ease: "power2.inOut" },
            3.45,
          )
          .to(
            heroItems,
            {
              autoAlpha: 1,
              duration: 0.9,
              stagger: 0.08,
              startAt: { y: 24 },
              y: 0,
            },
            3.6,
          );

        // Any input plays the rest quickly.
        const hurry = () => tl.timeScale(5);
        const events = [
          "click",
          "keydown",
          "wheel",
          "touchstart",
          "scroll",
        ] as const;
        events.forEach((type) =>
          window.addEventListener(type, hurry, { passive: true }),
        );

        function finish() {
          events.forEach((type) => window.removeEventListener(type, hurry));
          // Hand the resting state back to the stylesheet.
          // Only the properties the intro set: React owns the inline left/top.
          const motionProps = "transform,opacity,visibility";
          gsap.set(fans, {
            clearProps: `${motionProps},width,height,borderRadius`,
          });
          gsap.set(stage, { clearProps: "filter" });
          gsap.set([mark, ...nodes, ...checks], { clearProps: motionProps });
          gsap.set(pipes, {
            clearProps: `${motionProps},strokeDasharray,strokeDashoffset`,
          });
          gsap.set(
            q(
              ".hero-map-fill, .hero-map-strip, .hero-map-big, .hero-map-pipes, .hero-map-source .hero-map-head, .hero-map-source .hero-map-track",
            ),
            { clearProps: motionProps },
          );
          gsap.set(heroItems, { clearProps: "opacity,visibility,transform" });
          if (header) gsap.set(header, { clearProps: "opacity,visibility" });
          html.dataset.intro = "done";
        }

        return () => {
          // Leaving desktop or turning motion off mid-intro: show the page as it rests.
          events.forEach((type) => window.removeEventListener(type, hurry));
          html.dataset.intro = "done";
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const strip = heroMap.audiences;
  return (
    <div className="hero-map" ref={root} aria-hidden="true">
      <div className="hero-map-stage">
        <svg
          className="hero-map-pipes"
          viewBox={`0 0 ${STAGE.w} ${STAGE.h}`}
          width={STAGE.w}
          height={STAGE.h}
        >
          <path
            className="hero-map-pipe"
            d={`M${STAGE.w / 2} ${SOURCE.y + CARD.h}C${STAGE.w / 2} ${SOURCE.y + CARD.h + 40} ${SPINE_X} ${NODES[0].y - 80} ${SPINE_X} ${NODES[0].y - 12}`}
          />
          {NODES.slice(1).map((node, i) => (
            <path
              key={node.y}
              className="hero-map-pipe"
              d={`M${SPINE_X} ${NODES[i].y + 12}L${SPINE_X} ${node.y - 12}`}
            />
          ))}
          {cards.map((card) => (
            <path
              key={card.id}
              className="hero-map-pipe"
              data-kind="branch"
              d={branchPipe(NODES[card.branch].y, card.cy)}
            />
          ))}
        </svg>
        {heroMap.branches.map((branch, i) => (
          <div
            key={branch.node}
            className="hero-map-node"
            style={{
              left: `${SPINE_X - NODE_HALF}px`,
              top: `${NODES[i].y - 12}px`,
            }}
          >
            <Text value={branch.node} />
          </div>
        ))}
        <div
          className="hero-map-fan hero-map-source"
          data-id="source"
          style={fanStyle("source")}
        >
          <span className="hero-map-big">
            <Icon id="source" />
            <Text value={heroMap.source} />
          </span>
          <div className="hero-map-head">
            <Icon id="source" />
            <Text value={heroMap.sourceHead} />
          </div>
          <div className="hero-map-track">
            <div className="hero-map-strip">
              {strip.map((audience) => (
                <Text key={audience} value={audience} />
              ))}
            </div>
          </div>
        </div>
        {cards.map((card) => (
          <div
            key={card.id}
            className="hero-map-fan hero-map-card"
            data-id={card.id}
            style={fanStyle(card.id)}
          >
            <div className="hero-map-head">
              <Icon id={card.id} />
              <Text value={card.name} />
            </div>
            <div className="hero-map-track">
              <span className="hero-map-fill" />
              <Text className="hero-map-label" value={card.label} />
            </div>
          </div>
        ))}
        {cards.map((card) => (
          <div
            key={card.id}
            className="hero-map-check"
            style={{
              left: `${MID_X - 12}px`,
              top: `${(NODES[card.branch].y + card.cy) / 2 - 12}px`,
            }}
          >
            <svg viewBox="0 0 24 24">
              <path d="M8 12.5l2.5 2.5 5-5.5" />
            </svg>
          </div>
        ))}
      </div>
      <div className="hero-map-mark">
        <img
          src="./brand/ridgewell-logo.svg"
          alt=""
          aria-hidden="true"
          width="360"
          height="85"
        />
      </div>
    </div>
  );
}
