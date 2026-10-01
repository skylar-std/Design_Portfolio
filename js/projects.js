/* =========================================
   프로젝트 데이터
   - 여기만 수정하면 Work 섹션 카드와 상세 모달이 자동으로 바뀝니다.
   - category: "branding" | "uiux" | "graphic"  (index.html 필터 버튼의 data-filter와 동일해야 함)
   - thumb: 카드 썸네일 / image: 모달 큰 이미지 (img/projects/ 폴더에 넣기)
   - link: 비핸스·노션 등 상세 페이지 주소 (없으면 "" 로 두면 버튼이 숨겨짐)
   ========================================= */
const PROJECTS = [
  {
    id: "aurora",
    title: "Aurora Coffee 브랜딩",
    category: "branding",
    categoryLabel: "Branding",
    year: "2025",
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
    year: "2025",
    client: "FitLog (Startup)",
    role: "Product Design · Design System",
    thumb: "img/projects/project-02.svg",
    image: "img/projects/project-02.svg",
    desc: "사용자 인터뷰 12건을 바탕으로 기록 플로우를 5단계에서 2단계로 줄였습니다. 컴포넌트 80여 개 규모의 디자인 시스템을 함께 구축했습니다.",
    tags: ["UX Research", "Figma", "Prototype", "Design System"],
    link: "https://www.behance.net/"
  },
  {
    id: "seoul-type",
    title: "서울 타이포그래피 포스터 展",
    category: "graphic",
    categoryLabel: "Graphic",
    year: "2024",
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
    year: "2024",
    client: "Green Market",
    role: "Rebranding · Signage",
    thumb: "img/projects/project-04.svg",
    image: "img/projects/project-04.svg",
    desc: "동네 유기농 마켓의 리브랜딩. 매장 사인물, 장바구니, SNS 템플릿까지 오프라인과 온라인 접점을 하나의 언어로 정리했습니다.",
    tags: ["Rebranding", "Signage", "SNS Template"],
    link: "https://www.behance.net/"
  },
  {
    id: "banking",
    title: "모바일 뱅킹 리디자인",
    category: "uiux",
    categoryLabel: "UI/UX",
    year: "2023",
    client: "XYZ Agency (Concept)",
    role: "UI Design · Usability Test",
    thumb: "img/projects/project-05.svg",
    image: "img/projects/project-05.svg",
    desc: "송금 화면의 정보 위계를 재정리하고 사용성 테스트로 검증했습니다. 송금 완료까지 걸리는 시간이 평균 18초 단축되었습니다.",
    tags: ["UI", "Usability Test", "Fintech"],
    link: ""
  },
  {
    id: "zine",
    title: "독립 매거진 〈Slow〉",
    category: "graphic",
    categoryLabel: "Graphic",
    year: "2023",
    client: "Slow Magazine",
    role: "Editorial Design",
    thumb: "img/projects/project-06.svg",
    image: "img/projects/project-06.svg",
    desc: "느리게 사는 사람들의 이야기를 담은 독립 매거진 2호의 편집 디자인. 그리드 시스템과 표지 디자인을 맡았습니다.",
    tags: ["Editorial", "InDesign", "Grid"],
    link: ""
  }
];
