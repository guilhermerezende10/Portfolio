import { useEffect } from "react";

/**
 * Wires up every scroll-driven effect on the page in a single pass. Components
 * only declare intent through data-attributes on their markup:
 *
 *   [data-hero]      staggered entrance on load (data-hero="0|1|2…")
 *   [data-reveal]    fade/slide up when it scrolls into view
 *   [data-parallax]  translateY relative to its parent's viewport position
 *   [data-para]      translateY relative to its own document position
 *   [data-edu-fill]  the education timeline's fill bar (scaleY 0 → 1 on scroll)
 *
 * Ported from the design's runtime so behavior matches the source one-to-one.
 * Respects prefers-reduced-motion (CSS already reveals everything statically).
 */
export function useSiteAnimations() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    // ---- Hero entrance -----------------------------------------------------
    const heroEls = Array.from(document.querySelectorAll<HTMLElement>("[data-hero]"));
    heroEls.forEach((el) => {
      const i = parseInt(el.dataset.hero ?? "0", 10) || 0;
      el.style.transitionDelay = `${100 + i * 140}ms`;
    });
    requestAnimationFrame(() =>
      requestAnimationFrame(() => heroEls.forEach((el) => el.classList.add("is-in")))
    );

    // ---- Reveal on scroll --------------------------------------------------
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = Array.from(
            el.parentElement?.querySelectorAll<HTMLElement>(":scope > [data-reveal]") ?? []
          );
          const idx = Math.max(0, siblings.indexOf(el));
          el.style.transitionDelay = `${idx * 110}ms`;
          el.classList.add("is-visible");
          io.unobserve(el);
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => io.observe(el));

    // ---- Parallax + education fill (single rAF loop) -----------------------
    const bgEls = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    const paraEls = Array.from(document.querySelectorAll<HTMLElement>("[data-para]"));
    const eduFill = document.querySelector<HTMLElement>("[data-edu-fill]");
    const eduTrack = eduFill?.parentElement ?? null;

    const docTop = (node: HTMLElement | null) => {
      let t = 0;
      while (node) {
        t += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return t;
    };

    const render = () => {
      const vh = window.innerHeight;
      const sy = window.scrollY;

      bgEls.forEach((el) => {
        const rate = parseFloat(el.dataset.parallax ?? "0.1") || 0.1;
        const rect = el.parentElement!.getBoundingClientRect();
        const offset = (rect.top + rect.height / 2 - vh / 2) * rate;
        el.style.transform = `translateY(${-offset}px)`;
      });

      paraEls.forEach((el) => {
        const rate = parseFloat(el.dataset.para ?? "0") || 0;
        const offset = (docTop(el) + el.offsetHeight / 2 - sy - vh / 2) * rate;
        // Drive parallax on the independent `translate` property, not `transform`.
        // Elements that also carry [data-reveal] animate `transform` (slide-up) with
        // a `transition: transform` — writing that same property every frame made the
        // per-frame updates inherit the transition (laggy) and clobbered the slide.
        // The two channels now compose without fighting.
        el.style.translate = `0 ${-offset}px`;
      });

      if (eduFill && eduTrack) {
        const r = eduTrack.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.72 - r.top) / r.height));
        eduFill.style.transform = `scaleY(${p})`;
      }
    };

    // Scroll/resize drive a single coalesced rAF instead of a perpetual loop, so
    // the parallax math (and its getBoundingClientRect reads) runs only when the
    // viewport actually moves — no steady per-frame work while the page sits idle.
    let rafId = 0;
    const schedule = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        render();
      });
    };
    render(); // set initial positions before the first scroll
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    // ---- Project frame spin — only run the decorative ring while on-screen ----
    const spin = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-spinning", entry.isIntersecting);
      });
    });
    document
      .querySelectorAll<HTMLElement>(".project-media-frame")
      .forEach((el) => spin.observe(el));

    return () => {
      io.disconnect();
      spin.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
}
