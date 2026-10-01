/* =========================================
   공통 스크립트 (index.html, works.html 모두 사용)
   - 헤더, 모바일 메뉴, 스크롤 등장 효과, 메뉴 하이라이트, 푸터 연도
   - 메인의 '작업물 보러가기' 썸네일 미리보기
   ========================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- 1. 메인: 작업물 보러가기 미리보기 ---------- */
  function renderPreview() {
    const stack = $("#projectPreview");
    if (!stack || typeof PROJECTS === "undefined") return;

    const featured = PROJECTS
      .filter((p) => p.featured !== false)
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 3);
    stack.innerHTML = featured.map((p) => `<img src="${p.thumb}" alt="" loading="lazy" />`).join("");

    const count = $("#projectCount");
    if (count && PROJECTS.length) {
      const years = PROJECTS.map((p) => +p.date.slice(0, 4));
      count.textContent = `${PROJECTS.length} Projects · ${Math.min(...years)} — ${Math.max(...years)}`;
    }
  }

  /* ---------- 2. 헤더 스크롤 상태 ---------- */
  function initHeader() {
    const header = $("#header");
    if (!header) return;
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 3. 모바일 메뉴 ---------- */
  function initMenu() {
    const btn = $("#menuBtn");
    const nav = $("#nav");
    if (!btn || !nav) return;

    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "메뉴 닫기" : "메뉴 열기");
      document.body.classList.toggle("is-locked", open);
    };

    btn.addEventListener("click", () => setOpen(!nav.classList.contains("is-open")));
    $$(".nav__link", nav).forEach((a) => a.addEventListener("click", () => setOpen(false)));
  }

  /* ---------- 4. 스크롤 등장 애니메이션 ---------- */
  function initReveal() {
    const targets = $$(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- 5. 현재 섹션 메뉴 하이라이트 (같은 페이지 #링크만) ---------- */
  function initActiveNav() {
    const links = $$(".nav__link").filter((l) => l.getAttribute("href").startsWith("#"));
    const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
    if (!sections.length || !("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle("is-current", l.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- 6. 푸터 연도 ---------- */
  function initYear() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  renderPreview();
  initHeader();
  initMenu();
  initReveal();
  initActiveNav();
  initYear();
})();
