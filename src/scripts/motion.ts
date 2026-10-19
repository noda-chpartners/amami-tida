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
        ".cover__photo",
        { scale: 1.08 },
        { scale: 1, duration: 1.6, ease: "power2.out" },
      )
      .fromTo(
        ".hero__line",
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
        0.2,
      )
      .fromTo(
        ".hero__lead",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.4,
      )
      .fromTo(
        ".hero__actions",
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.5,
      );

    gsap.to(".tide-wave__track--back", {
      xPercent: -50,
      duration: 18,
      ease: "none",
      repeat: -1,
    });

    gsap.to(".tide-wave__track:not(.tide-wave__track--back)", {
      xPercent: -50,
      duration: 11,
      ease: "none",
      repeat: -1,
    });

    gsap.utils.toArray<HTMLElement>(".drift").forEach((el) => {
      gsap.to(el, {
        y: -42,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".drift-slow").forEach((el) => {
      gsap.to(el, {
        y: 28,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    });
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
}
