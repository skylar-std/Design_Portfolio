/* =========================================
   프로젝트 데이터
   - 여기만 수정하면 작업물 페이지(연도·월별), 상세 모달, 메인 미리보기가 모두 자동으로 바뀝니다.
   - date: "YYYY-MM" 형식 (예: "2025-08")  → Archive의 연도/월 버튼이 이 값으로 만들어짐
   - featured: true  → 메인 '작업물 보러가기' 썸네일 후보 (최신 3개 사용) / false → 작업물 페이지에만
   - category: "branding" | "uiux" | "graphic"  (index.html 필터 버튼의 data-filter와 동일해야 함)
   - thumb: 카드 썸네일 / image: 모달 큰 이미지 (img/projects/ 폴더에 넣기)
   - link: 비핸스·노션 등 상세 페이지 주소 (없으면 "" → 버튼 숨김)
   ※ 순서는 상관없어요. 날짜 기준으로 자동 정렬됩니다.
   ========================================= */
const PROJECTS = [
  {
    id: "aurora-season",
    title: "Aurora 겨울 시즌 패키지",
    category: "branding",
    categoryLabel: "Branding",
    date: "2025-11",
    featured: false,
    client: "Aurora Coffee Roasters",
    role: "Packaging",
    thumb: "img/projects/project-01.svg",
    image: "img/projects/project-01.svg",
    desc: "브랜드 리뉴얼 이후 첫 시즌 한정 원두 패키지. 기존 컬러 시스템 안에서 겨울 무드를 표현했습니다.",
    tags: ["Packaging", "Seasonal", "Illustrator"],
    link: ""
  },
  {
    id: "aurora",
    title: "Aurora Coffee 브랜딩",
    category: "branding",
    categoryLabel: "Branding",
    date: "2025-08",
    featured: true,
    client: "Aurora Coffee Roasters",
    role: "Brand Identity · Packaging",
    thumb: "img/projects/project-01.svg",
    image: "img/projects/project-01.svg",
    desc: "새벽의 첫 잔이라는 콘셉트로 로고, 컬러 시스템, 원두 패키지까지 브랜드 전반을 설계했습니다. 리뉴얼 후 온라인 재구매율이 32% 상승했습니다.",
    tags: ["Logo", "Color System", "Packaging", "Illustrator"],
    link: "https://www.behance.net/"
  },
  {
    id: "fitlog",
    title: "FitLog 운동 기록 앱",
    category: "uiux",
    categoryLabel: "UI/UX",
    date: "2025-03",
    featured: true,
    client: "FitLog (Startup)",
    role: "Product Design · Design System",
    thumb: "img/projects/project-02.svg",
    image: "img/projects/project-02.svg",
    desc: "사용자 인터뷰 12건을 바탕으로 기록 플로우를 5단계에서 2단계로 줄였습니다. 컴포넌트 80여 개 규모의 디자인 시스템을 함께 구축했습니다.",
    tags: ["UX Research", "Figma", "Prototype", "Design System"],
    link: "https://www.behance.net/"
  },
  {
    id: "fitlog-icon",
    title: "FitLog 앱 아이콘 리뉴얼",
    category: "uiux",
    categoryLabel: "UI/UX",
    date: "2025-03",
    featured: false,
    client: "FitLog (Startup)",
    role: "App Icon",
    thumb: "img/projects/project-02.svg",
    image: "img/projects/project-02.svg",
    desc: "앱 리디자인과 함께 진행한 아이콘 리뉴얼. 작은 크기에서도 식별되도록 형태를 단순화했습니다.",
    tags: ["Icon", "Figma"],
    link: ""
  },
  {
    id: "card-illust",
    title: "연말 카드 일러스트",
    category: "graphic",
    categoryLabel: "Graphic",
    date: "2024-12",
    featured: false,
    client: "Personal Project",
    role: "Illustration",
    thumb: "img/projects/project-03.svg",
    image: "img/projects/project-03.svg",
    desc: "한글 자소를 모티프로 한 연말 카드 일러스트 4종.",
    tags: ["Illustration", "Typography"],
    link: ""
  },
  {
    id: "seoul-type",
    title: "서울 타이포그래피 포스터 展",
    category: "graphic",
    categoryLabel: "Graphic",
    date: "2024-11",
    featured: true,
    client: "Personal Project",
    role: "Poster · Typography",
    thumb: "img/projects/project-03.svg",
    image: "img/projects/project-03.svg",
    desc: "서울의 지명을 한글 자소로 해체·재조합한 포스터 시리즈 12점. 그룹전에 출품했습니다.",
    tags: ["Typography", "Poster", "Exhibition"],
    link: ""
  },
  {
    id: "greenmarket",
    title: "Green Market 리브랜딩",
    category: "branding",
    categoryLabel: "Branding",
    date: "2024-05",
    featured: true,
    client: "Green Market",
    role: "Rebranding · Signage",
    thumb: "img/projects/project-04.svg",
    image: "img/projects/project-04.svg",
    desc: "동네 유기농 마켓의 리브랜딩. 매장 사인물, 장바구니, SNS 템플릿까지 오프라인과 온라인 접점을 하나의 언어로 정리했습니다.",
    tags: ["Rebranding", "Signage", "SNS Template"],
    link: "https://www.behance.net/"
  },
  {
    id: "cafe-menu",
    title: "카페 메뉴판 디자인",
    category: "graphic",
    categoryLabel: "Graphic",
    date: "2024-05",
    featured: false,
    client: "Local Cafe",
    role: "Print",
    thumb: "img/projects/project-04.svg",
    image: "img/projects/project-04.svg",
    desc: "소규모 카페의 메뉴판과 테이블 POP. 인쇄 감리까지 진행했습니다.",
    tags: ["Print", "Menu"],
    link: ""
  },
  {
    id: "banking",
    title: "모바일 뱅킹 리디자인",
    category: "uiux",
    categoryLabel: "UI/UX",
    date: "2023-09",
    featured: true,
    client: "XYZ Agency (Concept)",
    role: "UI Design · Usability Test",
    thumb: "img/projects/project-05.svg",
    image: "img/projects/project-05.svg",
    desc: "송금 화면의 정보 위계를 재정리하고 사용성 테스트로 검증했습니다. 송금 완료까지 걸리는 시간이 평균 18초 단축되었습니다.",
    tags: ["UI", "Usability Test", "Fintech"],
    link: ""
  },
  {
    id: "dashboard",
    title: "사내 대시보드 UI",
    category: "uiux",
    categoryLabel: "UI/UX",
    date: "2023-06",
    featured: false,
    client: "XYZ Agency",
    role: "Dashboard UI",
    thumb: "img/projects/project-05.svg",
    image: "img/projects/project-05.svg",
    desc: "매출·재고 데이터를 한 화면에서 볼 수 있는 사내 대시보드. 차트 컴포넌트 가이드를 함께 정리했습니다.",
    tags: ["Dashboard", "Data Viz"],
    link: ""
  },
  {
    id: "zine",
    title: "독립 매거진 〈Slow〉",
    category: "graphic",
    categoryLabel: "Graphic",
    date: "2023-02",
    featured: true,
    client: "Slow Magazine",
    role: "Editorial Design",
    thumb: "img/projects/project-06.svg",
    image: "img/projects/project-06.svg",
    desc: "느리게 사는 사람들의 이야기를 담은 독립 매거진 2호의 편집 디자인. 그리드 시스템과 표지 디자인을 맡았습니다.",
    tags: ["Editorial", "InDesign", "Grid"],
    link: ""
  }
];
