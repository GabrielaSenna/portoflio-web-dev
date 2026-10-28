/* =============================================================
   Portfólio — Gabriela Moreira Senna
   Interações: tema claro/escuro, menu mobile, header no scroll,
   reveal, nav ativa, marquee infinito e parallax leve no hero.
   ============================================================= */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Header: estado ao rolar ---------- */
  const header = document.querySelector(".header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Tema claro / escuro ---------- */
  const root = document.documentElement;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    root.setAttribute("data-theme", theme);
    if (themeMeta) themeMeta.setAttribute("content", theme === "dark" ? "#2F1B1A" : "#EFEFC9");
    if (themeToggle) {
      themeToggle.setAttribute("aria-label", theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro");
    }
  };

  applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* armazenamento indisponível: o tema vale só para esta visita */
      }
    });
  }

  /* ---------- Menu mobile ---------- */
  const nav = document.getElementById("nav");
  const toggle = document.querySelector(".nav-toggle");
  const links = Array.from(document.querySelectorAll(".nav__link"));

  const setMenu = (open) => {
    nav.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("nav-open", open);
  };

  toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) setMenu(false);
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) setMenu(false);
  });

  /* ---------- Reveal ao entrar na tela ---------- */
  const reveals = document.querySelectorAll(".reveal");

  // O que já está na primeira tela aparece na hora, sem esperar o observer
  reveals.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add("is-visible");
  });

  if (reduceMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  /* ---------- Link ativo na navegação ---------- */
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = `#${entry.target.id}`;
          links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === id));
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- Marquee: duplica os itens para o loop ser contínuo ---------- */
  document.querySelectorAll(".marquee__track").forEach((track) => {
    Array.from(track.children).forEach((item) => {
      const clone = item.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
  });

  /* ---------- Parallax leve nas pastas do hero ---------- */
  const visual = document.querySelector(".hero__visual");
  const finePointer = window.matchMedia("(pointer: fine)").matches;

  if (visual && finePointer && !reduceMotion) {
    const layers = visual.querySelectorAll("[data-depth]");
    let frame = null;

    visual.addEventListener("mousemove", (e) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const rect = visual.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        layers.forEach((layer) => {
          const depth = Number(layer.dataset.depth) || 0;
          layer.style.transform = `translate(${(x * depth).toFixed(1)}px, ${(y * depth).toFixed(1)}px)`;
        });
        frame = null;
      });
    });

    visual.addEventListener("mouseleave", () => {
      layers.forEach((layer) => (layer.style.transform = ""));
    });
  }

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
})();
