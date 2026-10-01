/* =========================================
   프로젝트 데이터 — 이제 Supabase에서 동적으로 불러옵니다.
   - 프로젝트를 추가/수정/삭제하려면 이 파일이 아니라
     Supabase 대시보드(Table editor)의 projects 테이블을 바꾸면 됩니다.
   - 테이블 컬럼 ↔ 사이트에서 쓰는 이름
       id              → 프로젝트 고유 id (영문/숫자/하이픈, URL·data-id로 쓰임)
       title           → 제목
       category        → "branding" | "uiux" | "graphic" (index.html 필터와 동일해야 함)
       category_label  → 화면에 보이는 카테고리명 (예: "Branding")
       project_date    → "YYYY-MM" (Archive의 연도·월 자동 생성에 사용)
       featured        → true면 메인 '작업물 보러가기' 썸네일 후보
       client          → 클라이언트명
       role            → 담당 역할
       thumb           → 카드 썸네일 이미지 경로/URL
       image           → 모달 큰 이미지 경로/URL
       description     → 설명
       tags            → 태그 배열
       link            → 비핸스 등 상세 링크 (없으면 "")
   - img/projects/ 안의 파일을 그대로 쓰려면 thumb·image 값에
     "img/projects/파일명.jpg" 처럼 사이트 기준 상대경로를 넣으면 됩니다.
   ========================================= */
(function () {
  "use strict";

  const SUPABASE_URL = "https://brdmcekarrfdeqkpvqst.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZG1jZWthcnJmZGVxa3B2cXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA4MzEzMjQsImV4cCI6MjEwNjQwNzMyNH0.iAMQEYbG9zNM71BnZhd19aYYwU8V75lKK6vKgcKoWgk";

  // 데이터가 올 때까지 다른 스크립트(works.js, main.js)가 기다릴 수 있도록
  // 빈 배열과 Promise를 먼저 전역에 걸어둡니다.
  window.PROJECTS = [];
  let resolveReady;
  window.PROJECTS_READY = new Promise((resolve) => { resolveReady = resolve; });

  function done() {
    window.dispatchEvent(new Event("projects:ready"));
    resolveReady();
  }

  // DB 행(snake_case) → 사이트 코드가 기대하는 모양(camelCase 등)으로 변환
  function mapRow(r) {
    return {
      id: r.id,
      title: r.title,
      category: r.category,
      categoryLabel: r.category_label,
      date: r.project_date,
      featured: !!r.featured,
      client: r.client || "",
      role: r.role || "",
      thumb: r.thumb || "",
      image: r.image || r.thumb || "",
      desc: r.description || "",
      tags: r.tags || [],
      link: r.link || ""
    };
  }

  if (typeof supabase === "undefined") {
    console.error("[projects.js] Supabase 라이브러리를 불러오지 못했습니다. 프로젝트 목록이 비어있을 수 있어요.");
    done();
    return;
  }

  const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  client
    .from("projects")
    .select("*")
    .order("project_date", { ascending: false })
    .then(({ data, error }) => {
      if (error) {
        console.error("[projects.js] 프로젝트를 불러오지 못했습니다:", error.message);
      } else {
        window.PROJECTS = (data || []).map(mapRow);
      }
      done();
    });
})();
