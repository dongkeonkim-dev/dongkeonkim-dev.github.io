# Next.js 블로그 프로젝트

[Next.js](https://nextjs.org/)로 제작된 블로그 프로젝트입니다.

## 시작하기

개발 서버 실행:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

[http://localhost:3000](http://localhost:3000)에서 결과를 확인할 수 있습니다.

`src/app/pages`내의 `.mdx` 파일을 수정하여 페이지를 편집할 수 있습니다. 페이지 편집을 완료한뒤, 빌드와 배포를 거치면 변경사항이 적용됩니다.

## GitHub Pages 배포 방법

변경사항을 GitHub Pages에 배포하는 방법:

1. 프로젝트 빌드:
```bash
npm run build
```

2. GitHub Pages에 배포:
```bash
npm run deploy
```

배포 프로세스:
- `/out` 디렉토리에 정적 파일 생성
- 생성된 파일을 자동으로 `gh-pages` 브랜치에 푸시
- GitHub Pages가 이 브랜치의 내용을 서비스

### 설정 파일

GitHub Pages 배포를 위한 주요 설정:

1. **next.config.mjs**:
- `output: 'export'` - 정적 파일 생성
- `trailingSlash: true` - GitHub Pages 호환성을 위한 후행 슬래시 추가
- `images.unoptimized: true` - GitHub Pages를 위한 이미지 최적화 비활성화

2. **package.json**:
- `"deploy": "gh-pages -d out"` - `/out` 디렉토리를 GitHub Pages에 배포

### 주의사항

- GitHub 저장소 설정에서 Pages 기능이 활성화되어 있어야 함
- 커스텀 도메인 사용 시 public 디렉토리에 CNAME 파일 추가 필요
- 이미지와 에셋은 상대 경로 사용
- 사이트는 `https://{username}.github.io/{repository}`에서 접근 가능

## 더 알아보기

Next.js에 대해 더 자세히 알아보기:

- [Next.js 문서](https://nextjs.org/docs)
- [Next.js 학습하기](https://nextjs.org/learn)
- [Next.js GitHub 저장소](https://github.com/vercel/next.js/)