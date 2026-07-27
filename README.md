# HAVET RESORT 홈페이지 프로젝트

본 저장소는 동해안 럭셔리 리조트 **하벳(HAVET)** 의 공식 홈페이지 소스 코드를 관리합니다. 
다양한 업주의 피드백 반영, 디지털나우(PMS) 연동, 잦은 디자인 변경 요청에 대응하기 위해 체계적인 히스토리 관리와 버전 관리를 목적으로 구성되었습니다.

## 1. 프로젝트 개요

- **프로젝트명**: 하벳 리조트 공식 홈페이지 리뉴얼 및 유지보수
- **배포 환경**: GitHub Pages (`https://kkddiidongin-ai.github.io/havet-resort/`)
- **주요 기술 스택**: HTML5, CSS3, Vanilla JavaScript
- **외부 연동**: 디지털나우(DigitalNow) PMS 예약 시스템 연동 예정

## 2. 파일 구조

```text
/
├── index.html              # 메인 페이지
├── about.html              # 리조트 소개
├── rooms.html              # 전체 객실 목록
├── room_*.html             # 개별 객실 상세 페이지 (6개)
├── restaurant.html         # 레스토랑 베르데
├── enjoy_summer.html       # 여름 시즌 안내
├── enjoy_winter.html       # 겨울 시즌 안내
├── facility.html           # 부대시설
├── reservation.html        # 예약 안내 및 PMS 연동 페이지
├── gallery.html            # 갤러리
├── community.html          # 공지사항/커뮤니티
├── access.html             # 오시는 길
├── css/
│   ├── style.css           # 메인 스타일시트
│   └── digitalnow.css      # PMS 연동 관련 스타일
├── js/
│   ├── main.js             # 공통 UI 스크립트 (네비게이션, 슬라이더 등)
│   └── digitalnow.js       # PMS 연동 스크립트
├── images/                 # 이미지 에셋
└── docs/                   # 작업 히스토리 및 기획 문서 (Markdown)
```

## 3. 작업 히스토리 관리 원칙 (중요)

잦은 디자인 변경과 피드백 반영 과정에서 **작업 내역 유실을 방지**하고 **안전한 롤백**을 보장하기 위해 다음 원칙을 준수합니다. (상세 내용은 `agents.md` 참고)

1. **최신 버전 기반 작업**: 작업 전 반드시 최신 파일 상태를 확인합니다.
2. **요청 범위 엄수**: 사용자가 지시하지 않은 코드나 디자인은 절대 임의로 수정하지 않습니다.
3. **히스토리 기록**: 완료된 작업은 `docs/CHANGELOG.md`에 상세히 기록합니다.
4. **실수 및 이슈 기록**: 작업 중 발견된 실수나 문제는 즉시 `.md` 파일에 추가합니다.
5. **문서화 우선**: 코드 작업 전 관련된 `.md` 문서를 먼저 작성하거나 업데이트합니다.
6. **에이전트 수칙 준수**: 모든 작업 전 `agents.md`의 원칙을 숙지하고 따릅니다.
7. **강제 푸시(Force Push) 금지**: 히스토리 유실 방지를 위해 `git push -f` 사용을 엄격히 금지합니다.

## 4. 문서(Docs) 디렉토리 안내

작업 히스토리와 기획 문서는 `docs/` 디렉토리에서 관리됩니다.

- `CHANGELOG.md`: 전체 프로젝트의 버전별 변경 이력
- `ROADMAP.md`: 향후 개발 계획 및 PMS 연동 일정
- `FEEDBACK.md`: 업주 및 고객 피드백 수집 및 반영 현황
- `templates/`: 작업 지시서 등 각종 문서 템플릿

---
*본 문서는 하벳 리조트 홈페이지의 안정적인 장기 운영을 위해 작성되었습니다.*
