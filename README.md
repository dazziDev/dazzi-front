# Dazzi Frontend Project

## 프로젝트 설정

### test 3

### 1. Node.js 및 Yarn 설치

- **Node.js**: 이 프로젝트는 Node.js 20.17.0 버전을 권장합니다. `nvm` 사용을 권장하며, `.nvmrc` 파일을 통해 자동으로 Node.js 버전을 설정할 수 있습니다.

  ```bash
  nvm use
  Yarn: 이 프로젝트는 Yarn을 사용하여 의존성을 관리합니다. Yarn이 설치되어 있지 않은 경우, 다음 명령어로 설치하세요.
  ```

```
npm install -g yarn
```

2. 프로젝트 클론 및 의존성 설치
   프로젝트를 클론하고 필요한 의존성을 설치합니다.

```
git clone git@github.com:dazziDev/dazzi-front.git
cd dazzi-front
yarn install
```

3. 환경 변수 설정
   .env.development 및 .env.production 파일을 생성하여 필요한 환경 변수를 설정하세요. 기본 템플릿으로 제공되는 env.development.sample 및 env.production.sample 파일을 참고하세요.

```
cp env.development.sample .env.development
cp env.production.sample .env.production
```

4. 개발 서버 실행
   다음 명령어로 로컬 개발 서버를 실행합니다.

```
yarn dev
```

주요 명령어

- 개발 서버 시작: yarn dev
- 프로덕션 빌드: yarn build
- 프로덕션 서버 시작: yarn start
- 코드 린팅: yarn lint --fix
- 코드 포맷팅: yarn format

# 프로젝트 구조

```
/src
├── /app
│   ├── /api                              # API 라우트 폴더 (app 폴더 외부에 위치)
│   │   ├── /articles
│   │   │   └── route.ts                  # 기사 관련 API 라우트
│   │   ├── /authors
│   │   │   └── route.ts                  # 작성자(에디터) 관련 API 라우트
│   │   ├── /categories
│   │   │   └── route.ts                  # 카테고리 관련 API 라우트
│   │   └── /comments
│   │       └── route.ts                  # 댓글 관련 API 라우트
│   ├── layout.tsx                        # 공통 레이아웃 파일 (Header, Footer 등)
│   ├── globals.css                       # 전역 스타일 파일 (Tailwind 초기화 및 글로벌 스타일)
│   ├── page.tsx                          # 루트 홈 페이지 (URL: /)
│   ├── /home                             # 홈 페이지 관련 폴더
│   │   ├── page.tsx                      # 홈 페이지 (URL: /)
│   │   ├── /components                   # 홈 페이지 전용 컴포넌트 폴더
│   │       ├── CategorySection.tsx       # 각 카테고리 섹션 (문화, 음식, 여행 등)
│   │       ├── FeaturedArticle.tsx       # 메인 이미지 아래의 주요 기사
│   ├── /categories                       # 각 카테고리의 게시물 목록 페이지
│   │   ├── [category]                    # 동적 라우팅으로 카테고리별 페이지 처리 (URL: /categories/[category])
│   │       ├── page.tsx                  # 카테고리별 기사 목록 페이지
│   │       ├── /components               # 카테고리 페이지 전용 컴포넌트 폴더
│   │           ├── ArticleCard.tsx       # 개별 기사 카드 컴포넌트
│   │           ├── Pagination.tsx        # 페이지네이션 컴포넌트
│   │           ├── FilterBar.tsx         # 필터링 바
│   ├── /articles                         # 개별 기사 페이지 폴더
│   │   ├── [slug]                        # 개별 기사 상세 페이지 폴더 (URL: /articles/[slug])
│   │       ├── page.tsx                  # 개별 기사 페이지
│   │       ├── /components               # 기사 상세 페이지 전용 컴포넌트 폴더
│   │           ├── ArticleContent.tsx    # 기사 본문 컴포넌트
│   │           ├── AuthorInfo.tsx        # 작성자(에디터) 정보 컴포넌트
│   │           ├── RelatedArticles.tsx   # 관련 기사 컴포넌트
│   │           ├── CommentSection.tsx    # 댓글 섹션
│   │           ├── ShareButtons.tsx      # 공유 버튼
│   ├── /authors                          # 작성자(에디터) 페이지 폴더
│   │   ├── page.tsx                      # 작성자(에디터) 목록 페이지 (URL: /authors)
│   │   ├── [id]                          # 개별 작성자(에디터) 페이지 폴더 (URL: /authors/[id])
│   │       ├── page.tsx                  # 개별 작성자(에디터) 페이지
│   │       ├── /components               # 작성자(에디터) 페이지 전용 컴포넌트 폴더
│   │           ├── AuthorInfo.tsx        # 작성자(에디터) 정보 컴포넌트
│   │           ├── ArticleCard.tsx       # 작성자(에디터)가 작성한 기사 카드 컴포넌트
│   │           ├── FetchAuthors.ts       # 작성자(에디터) 목록을 가져오는 컴포넌트(더미)
├── /components                           # 공통 컴포넌트 폴더 (app 폴더 외부에 위치)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Sidebar.tsx
│   ├── Breadcrumb.tsx
│   ├── MobileMenu.tsx
│   └── ArticleCard.tsx
├── /store                            # 상태 관리 폴더 (app 폴더 외부에 위치)
│   ├── useAuthorStore.ts             # 작성자(에디터) 상태 관리 훅
│   ├── useMenuStore.ts               # 메뉴 상태 관리 훅
├── /public                           # 정적 파일 (이미지, 폰트 등)
│   ├── /fonts
│   ├── /img
├── /styles
│   ├── 0000.css                      # 추후 추가될 CSS 파일(emotion등)
│   ├── editor.css                    # 에디터 관련 CSS 파일 (태일윈드와 충돌방지 등)
│   ├── fonts.css                     # 폰트 관련 CSS 파일 (에디터 폰트 등)
├── next.config.mjs                   # Next.js 설정 파일
├── tailwind.config.ts                # TailwindCSS 설정 파일
├── tsconfig.json                     # TypeScript 설정 파일
└── package.json                      # 패키지 설정 파일
```

# 프로젝트 환경

- Framework: Next.js 14 (App Router 사용)
- Styling: TailwindCSS + 아마도 emotion
- Language: TypeScript
- State Management: 아마도 zustand
- Deployment: 추후 설정 예정

# husky 설정

- 이 프로젝트는 Husky를 사용하여 Git hooks을 설정합니다.
- 커밋 시 자동으로 yarn lint와 yarn format이 실행되어 코드 품질을 유지합니다.

# 현재 (2024.09.08)

![image](/public/img/dummy/NEXT.nav.png)

<!-- husky test -->
