# 변경 이력 (Changelog)

모든 주요 변경 사항은 이 파일에 기록됩니다.
버전 관리는 [유의적 버전(Semantic Versioning)](https://semver.org/lang/ko/) 형식을 따릅니다.

## [Unreleased]

### 추가됨 (Added)
- AI 에이전트 작업 수칙 문서 (`agents.md`) 신규 생성

---

## [2026-04-29] index.html rooms-section 위치 이동

### 변경됨 (Changed)
- `index.html` `.rooms-section` 블록을 `.seasonal-banner` 바로 아래로 이동
- 변경 전 순서: seasonal-banner → EXPLORE → SPECIAL OFFERS → VERDE → **ROOMS** → EAT&DRINK
- 변경 후 순서: seasonal-banner → **ROOMS** → EXPLORE → SPECIAL OFFERS → VERDE → EAT&DRINK
- 수정 파일: `index.html` 단 1개 / 코드 내용 변경 없음 (블록 순서만 이동)

---

## [2026-04-29] index.html 시즌 오픈 배너 높이 수정

### 변경됨 (Changed)
- `index.html` `.seasonal-banner` 세로 높이 수정: `height: 60vh` → `height: 80vh`, `min-height: 400px` → `min-height: 500px`
- `.verde-hero`와 동일한 세로 높이로 맞춤 (`height: 80vh`, `min-height: 500px`)
- 수정 파일: `index.html` 단 1개 / 수정 라인: 242~243줄
- 디지털나우(PMS) 연동 스크립트 (`js/digitalnow.js`) 및 스타일 (`css/digitalnow.css`) 초기 구조
- `enjoy_summer.html` 및 `enjoy_winter.html` 간의 시즌 토글 버튼 기능
- 스페셜 오퍼 6개 카드 이미지 로컬 파일 교체 (`images/special/`)

### 변경됨 (Changed)
- 메인 페이지(`index.html`) 스페셜 오퍼 섹션 이미지 경로 업데이트
- 예약 페이지(`reservation.html`) PMS 연동 준비 구조로 개편

### 수정됨 (Fixed)
- 4월 28일 작업 중 강제 푸시로 유실되었던 17개 HTML 페이지 전체 복구 완료
- `js/main.js` 누락으로 인한 네비게이션 및 슬라이더 애니메이션 오류 해결
- `images/winter_hero.webp` 누락 이미지 복구

---

## [1.0.0] - 2026-04-06

### 추가됨 (Added)
- 하벳 리조트 공식 홈페이지 최초 배포
- 전체 17개 HTML 페이지 구조 완성 (메인, 객실, 레스토랑, 부대시설 등)
- 반응형 웹 디자인 적용 (모바일, 태블릿, 데스크탑)
- 공통 UI 스크립트 (`js/main.js`) 및 스타일 (`css/style.css`) 적용
- 객실 상세 페이지 6종 (로얄 스위트, 그랜드 오션 스위트, 오션 스위트 A/B, 스카이 로프트 A/B)

---
*이 파일은 하벳 리조트 홈페이지의 안정적인 장기 운영을 위해 작성되었습니다.*
