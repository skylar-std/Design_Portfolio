# Design Portfolio

브랜드 · UI/UX · 그래픽 디자이너 포트폴리오 웹사이트입니다.

## 📁 폴더 구조

```
portfolio/
├── index.html          # 메인 페이지
├── css/
│   ├── reset.css       # 브라우저 기본 스타일 초기화
│   ├── style.css       # 메인 스타일 (맨 위 :root 에서 색상/폰트 변경)
│   └── responsive.css  # 태블릿·모바일 대응
├── js/
│   ├── projects.js     # ⭐ 프로젝트 데이터 (여기만 고치면 작업물 카드가 바뀜)
│   └── main.js         # 필터, 모달, 메뉴, 스크롤 애니메이션
├── img/
│   ├── favicon.svg     # 브라우저 탭 아이콘
│   ├── og-image.svg    # 링크 공유 미리보기 이미지
│   ├── profile.svg     # 프로필 사진
│   └── projects/       # 작업물 이미지
├── files/
│   └── resume.pdf      # 이력서
└── .nojekyll           # GitHub Pages 설정용 (지우지 마세요)
```

## ✏️ 내 정보로 바꾸기

1. **이름·소개·이메일** → `index.html`에서 `홍길동`, `HONG`, `hello@example.com` 검색해서 수정
2. **작업물** → `img/projects/`에 이미지 넣고, `js/projects.js`에서 제목·설명·이미지 경로 수정
   - 프로젝트를 늘리거나 줄이려면 `{ ... },` 블록을 복사/삭제
   - `date: "2025-08"` → Archive 섹션의 **연도 → 월별** 보기가 이 값으로 자동 생성됩니다
   - `featured: true` → 상단 Selected Work 카드에도 노출 / `false` → Archive에만 노출
3. **프로필 사진** → `img/profile.jpg`로 넣고 `index.html`의 `img/profile.svg`를 `img/profile.jpg`로 변경
4. **이력서** → `files/resume.pdf`를 내 파일로 교체
5. **색상** → `css/style.css` 맨 위 `--accent` 값 변경

> 💡 이미지는 가로 1200px 정도, 장당 500KB 이하로 줄여서 올리면 사이트가 빨리 열립니다.

## 🚀 GitHub Pages로 배포하기

1. GitHub에서 **New repository** 생성
   - 이름을 `내아이디.github.io` 로 하면 → `https://내아이디.github.io` 주소가 됩니다
   - 다른 이름(예: `portfolio`)이면 → `https://내아이디.github.io/portfolio`
2. **Add file → Upload files** 에서 이 폴더 **안의 내용 전부**를 끌어다 놓고 Commit
   - `index.html`이 저장소 맨 바깥(루트)에 있어야 합니다
3. **Settings → Pages** → Source: `Deploy from a branch`, Branch: `main` / `/ (root)` → Save
4. 1~2분 뒤 상단에 표시되는 주소로 접속하면 완성 🎉

## ⚠️ 주의

- 파일·폴더 이름은 **영문 소문자**로 (GitHub Pages는 대소문자를 구분합니다. `Profile.JPG` ≠ `profile.jpg`)
- 링크 미리보기(카카오톡 등)를 확실히 띄우려면 `og-image`를 **JPG/PNG**로 바꾸고, `index.html`의 `og:image` 값을 전체 주소(`https://내아이디.github.io/img/og-image.jpg`)로 적어주세요.
