/* =========================================
   Portfolio main script
   ========================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- 1. 프로젝트 카드 렌더링 ---------- */
  const grid = $("#workGrid");

  function renderProjects() {
    if (!grid || typeof PROJECTS === "undefined") return;

    grid.innerHTML = PROJECTS.map((p) => `
      <li class="work__item reveal" data-category="${p.category}">
        <button type="button" class="card" data-id="${p.id}" aria-label="${p.title} 자세히 보기">
          <div class="card__thumb">
            <img src="${p.thumb}" alt="${p.title} 썸네일" loading="lazy" />
            <span class="card__view">View</span>
          </div>
          <div class="card__info">
            <h3 class="card__title">${p.title}</h3>
            <span class="card__meta">${p.year}</span>
          </div>
          <p class="card__cat">${p.categoryLabel} — ${p.role}</p>
        </button>
      </li>
    `).join("");
  }

  /* ---------- 2. 카테고리 필터 ---------- */
  function initFilter() {
    const buttons = $$(".filter__btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.dataset.filter;
        buttons.forEach((b) => b.classList.toggle("is-active", b === btn));

        $$(".work__item").forEach((item) => {
          const show = filter === "all" || item.dataset.category === filter;
          item.classList.toggle("is-hidden", !show);
          if (show) item.classList.add("is-visible");
        });
      });
    });
  }

  /* ---------- 3. 프로젝트 모달 ---------- */
  const modal = $("#modal");
  let lastFocused = null;

  function openModal(id) {
    const p = PROJECTS.find((x) => x.id === id);
    if (!p) return;

    $("#modalImg").src = p.image;
    $("#modalImg").alt = p.title;
    $("#modalMeta").textContent = `${p.categoryLabel} · ${p.year} · ${p.client}`;
    $("#modalTitle").textContent = p.title;
    $("#modalDesc").textContent = p.desc;
    $("#modalTags").innerHTML = p.tags.map((t) => `<li>${t}</li>`).join("");

    const link = $("#modalLink");
    if (p.link) { link.href = p.link; link.hidden = false; }
    else { link.hidden = true; }

    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("is-locked");
    $(".modal__close", modal).focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("is-locked");
    if (lastFocused) lastFocused.focus();
  }

  function initModal() {
    if (!modal) return;
    grid.addEventListener("click", (e) => {
      const card = e.target.closest(".card");
      if (card) openModal(card.dataset.id);
    });
    $$("[data-close]", modal).forEach((el) => el.addEventListener("click", closeModal));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
    });
  }

  /* ---------- 4. 헤더 스크롤 상태 ---------- */
  function initHeader() {
    const header = $("#header");
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- 5. 모바일 메뉴 ---------- */
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

  /* ---------- 6. 스크롤 등장 애니메이션 ---------- */
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

  /* ---------- 7. 현재 섹션 메뉴 하이라이트 ---------- */
  function initActiveNav() {
    const links = $$(".nav__link");
    const sections = links.map((l) => $(l.getAttribute("href"))).filter(Boolean);
    if (!("IntersectionObserver" in window)) return;

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.toggle("is-current", l.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- 8. 푸터 연도 ---------- */
  function initYear() {
    const y = $("#year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
    initFilter();
    initModal();
    initHeader();
    initMenu();
    initReveal();
    initActiveNav();
    initYear();
  });
})();
