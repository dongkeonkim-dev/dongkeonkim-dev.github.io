# Next.js 블로그 프로젝트

개발 서버 실행:

```bash
npm run dev
```


GitHub Pages 배포 방법:

```bash
npm run build
npm run deploy
```

## 폴더 구조 및 정의
```
src/app/pages/
├── Tech/                    # 기술 문서
│   ├── Backend/            # 백엔드 관련 기술
│   │   ├── Node.js/       # Node.js 관련 내용
│   │   ├── Database/      # DB 설계, 쿼리 최적화 등
│   │   └── Architecture/  # 시스템 설계, 아키텍처 패턴
│   ├── Frontend/          # 프론트엔드 기술
│   │   ├── React/        # React 관련 내용
│   │   ├── Next.js/      # Next.js 관련 내용
│   │   └── CSS/          # CSS, 스타일링 관련
│   ├── DevOps/           # 개발 운영 기술
│   │   ├── Docker/       # 컨테이너화, 배포 환경
│   │   ├── AWS/          # 클라우드 서비스 활용
│   │   └── CI-CD/        # 지속적 통합/배포
│   └── CS/               # 컴퓨터 과학 기초
│       ├── Algorithm/    # 알고리즘 학습, 문제 풀이
│       ├── DataStructure/# 자료구조 이론, 구현
│       └── Network/      # 네트워크 프로토콜, 보안
├── Projects/             # 프로젝트 문서
│   └── [프로젝트명]/     # 각 프로젝트별 문서화
│       ├── Overview/     # 프로젝트 개요
│       ├── Architecture/ # 설계 문서
│       └── Issues/       # 트러블슈팅
├── TIL/                  # Today I Learned
│   └── [연도-월]/        # 일일 학습 기록
└── About/               # 자기소개
    ├── Resume/          # 이력서
    └── Portfolio/       # 포트폴리오
```

1. **Tech/**
   - 기술 학습 내용 정리
   - 실제 적용 사례 포함
   - 코드 예제 필수
   - 참고 자료 출처 명시

2. **Projects/**
   - 프로젝트 목적과 개요
   - 사용 기술 스택
   - 아키텍처 설계도
   - 구현 과정 및 의도
   - 발생한 문제와 해결 과정
   - 회고 및 개선 사항

3. **TIL/**
   - 일일 학습 내용 기록
   - 날짜별로 구분
   - 키워드 중심의 간단한 정리
   - 향후 자세한 포스팅이 필요한 내용 표시
