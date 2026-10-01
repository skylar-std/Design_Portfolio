/* =========================================
   Portfolio main script
   ========================================= */
(function () {
  "use strict";

  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ---------- 0. 날짜 유틸 ---------- */
  const MONTHS = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  const pad = (n) => String(n).padStart(2, "0");
  const fmtDate = (d) => d.replace("-", ".");            // "2025-08" → "2025.08"
  const byDateDesc = (a, b) => b.date.localeCompare(a.date);

  /* ---------- 1. 프로젝트 카드 렌더링 (featured만) ---------- */
  const grid = $("#workGrid");

  function renderProjects() {
    if (!grid || typeof PROJECTS === "undefined") return;

    const featured = PROJECTS.filter((p) => p.featured !== false).sort(byDateDesc);
    grid.innerHTML = featured.map((p) => `
      <li class="work__item reveal" data-category="${p.category}">
        <button type="button" class="card" data-id="${p.id}" aria-label="${p.title} 자세히 보기">
          <div class="card__thumb">
            <img src="${p.thumb}" alt="${p.title} 썸네일" loading="lazy" />
            <span class="card__view">View</span>
          </div>
          <div class="card__info">
            <h3 class="card__title">${p.title}</h3>
            <span class="card__meta">${fmtDate(p.date)}</span>
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
    $("#modalMeta").textContent = `${p.categoryLabel} · ${fmtDate(p.date)} · ${p.client}`;
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

  /* ---------- 3-1. Archive : 연도 → 월별 보기 ---------- */
  function initArchive() {
    const yearsEl = $("#archiveYears");
    const monthsEl = $("#archiveMonths");
    const listEl = $("#archiveList");
    const summaryEl = $("#archiveSummary");
    const resetBtn = $("#archiveReset");
    if (!yearsEl || typeof PROJECTS === "undefined") return;

    const items = PROJECTS
      .filter((p) => /^\d{4}-\d{2}$/.test(p.date || ""))
      .map((p) => ({ ...p, y: +p.date.slice(0, 4), m: +p.date.slice(5, 7) }))
      .sort(byDateDesc);
    const years = [...new Set(items.map((i) => i.y))];
    if (!years.length) return;

    const state = { year: years[0], month: null };

    function renderYears() {
      yearsEl.innerHTML = years.map((y) => {
        const count = items.filter((i) => i.y === y).length;
        const active = y === state.year;
        return `<button type="button" role="tab" class="archive__year${active ? " is-active" : ""}"
                  data-year="${y}" aria-selected="${active}">${y}<sup>${count}</sup></button>`;
      }).join("");
    }

    function renderMonths() {
      const inYear = items.filter((i) => i.y === state.year);
      monthsEl.innerHTML = MONTHS.map((name, idx) => {
        const m = idx + 1;
        const count = inYear.filter((i) => i.m === m).length;
        const active = state.month === m;
        const dots = Array.from({ length: Math.min(count, 4) }, () => "<i></i>").join("");
        return `<button type="button" class="archive__mbtn${active ? " is-active" : ""}"
                  data-month="${m}" ${count ? "" : "disabled"} aria-pressed="${active}"
                  aria-label="${state.year}년 ${m}월, ${count}개 프로젝트">
                  <strong>${pad(m)}</strong><span>${name.slice(0, 3)}</span>
                  <span class="archive__dots">${dots}</span>
                </button>`;
      }).join("");
    }

    function renderList() {
      const list = items.filter((i) => i.y === state.year && (!state.month || i.m === state.month));

      summaryEl.innerHTML = state.month
        ? `<strong>${state.year}년 ${state.month}월</strong> · ${list.length}개 프로젝트`
        : `<strong>${state.year}년</strong> 전체 · ${list.length}개 프로젝트`;
      resetBtn.hidden = !state.month;

      // 월별로 묶기 (최신 월 먼저)
      const groups = [];
      list.forEach((p) => {
        const last = groups[groups.length - 1];
        if (last && last.m === p.m) last.items.push(p);
        else groups.push({ m: p.m, items: [p] });
      });

      listEl.innerHTML = groups.map((g) => `
        <div class="archive__group">
          <h3 class="archive__month"><em>${pad(g.m)}</em>${MONTHS[g.m - 1]}</h3>
          <ul class="archive__rows">
            ${g.items.map((p) => `
              <li>
                <button type="button" class="archive__row" data-id="${p.id}">
                  <img src="${p.thumb}" alt="" loading="lazy" />
                  <span class="archive__info">
                    <span class="archive__title">${p.title}</span>
                    <span class="archive__sub">${p.categoryLabel} · ${p.client}</span>
                  </span>
                  <span class="archive__arrow" aria-hidden="true">↗</span>
                </button>
              </li>`).join("")}
          </ul>
        </div>`).join("");
    }

    function renderAll() { renderYears(); renderMonths(); renderList(); }

    yearsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-year]");
      if (!btn) return;
      state.year = +btn.dataset.year;
      state.month = null;
      renderAll();
    });

    monthsEl.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-month]");
      if (!btn || btn.disabled) return;
      const m = +btn.dataset.month;
      state.month = state.month === m ? null : m;   // 같은 월 다시 누르면 해제
      renderMonths();
      renderList();
    });

    resetBtn.addEventListener("click", () => { state.month = null; renderMonths(); renderList(); });

    listEl.addEventListener("click", (e) => {
      const row = e.target.closest(".archive__row");
      if (row) openModal(row.dataset.id);
    });

    renderAll();
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
    initArchive();
    initHeader();
    initMenu();
    initReveal();
    initActiveNav();
    initYear();
  });
})();
