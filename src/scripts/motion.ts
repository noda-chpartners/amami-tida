import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

function headerOffset(): number {
  const header = document.querySelector<HTMLElement>(".site-header");
  return (header?.offsetHeight ?? 72) + 8;
}

export function initMotion(): void {
  const header = document.querySelector<HTMLElement>(".site-header");
  const toggle = document.querySelector<HTMLButtonElement>(".nav-toggle");

  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false,
    anchors: {
      offset: -headerOffset(),
    },
  });

  lenis.on("scroll", () => {
    ScrollTrigger.update();
  });

  const onTick = (time: number) => {
    lenis.raf(time * 1000);
  };

  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  const setNav = (open: boolean) => {
    header?.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    toggle?.setAttribute("aria-expanded", open ? "true" : "false");
    if (open) lenis.stop();
    else lenis.start();
  };

  toggle?.addEventListener("click", () => {
    setNav(toggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setNav(false);
  });

  document.addEventListener(
    "click",
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a");
      const href = link?.getAttribute("href");
      if (href?.startsWith("#")) setNav(false);
    },
    true,
  );

  ScrollTrigger.create({
    start: 12,
    onToggle: (self) => {
      header?.classList.toggle("is-scrolled", self.isActive);
    },
  });

  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const hero = gsap.timeline({ defaults: { ease: "power3.out" } });

    hero
      .fromTo(
        ".hero__kicker, .hero__place",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.08 },
      )
      .fromTo(
        ".hero__title span",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
        "-=0.35",
      )
      .fromTo(
        ".hero__lead",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.75 },
        "-=0.5",
      )
      .fromTo(
        ".hero__actions",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.45",
      )
      .fromTo(
        ".hero__facts",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.4",
      );

    gsap.fromTo(
      ".hero__clip img",
      { y: -10, scale: 1.08 },
      {
        y: 10,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
        },
      );
    });

    ScrollTrigger.batch(".plate", {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            overwrite: true,
          },
        );
      },
    });
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}
