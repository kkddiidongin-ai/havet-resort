# 하벳 리조트 사이트 — 작업 이력 & 롤백 가이드

> 최종 업데이트: 2026-05-29  
> GitHub 저장소: https://github.com/kkddiidongin-ai/havet-resort  
> 실제 사이트: https://kkddiidongin-ai.github.io/havet-resort/

---

## 롤백 방법

특정 시점으로 되돌리고 싶을 때 아래와 같이 요청하세요.

### 요청 예시

> **"[커밋명]으로 롤백해줘"**

예시:
- `"객실 상세 페이지 수정 전으로 롤백해줘"` → `8743b6f` 로 롤백
- `"restaurant 이미지 경로 변경 전으로 롤백해줘"` → `8743b6f` 로 롤백
- `"커밋 9b48810으로 롤백해줘"` → 해당 커밋으로 롤백

---

## 전체 커밋 이력 (최신순)

| 커밋 해시 | 날짜 | 작업 내용 | 영향 파일 |
|---|---|---|---|
| `1d15061` | 2026-05-29 | **enjoy_winter**: 히어로 1.jpg, 섹션 5개 2~6.jpg 적용, 불필요 섹션 제거 | enjoy_winter.html |
| `af448dc` | 2026-05-29 | enjoy_winter: 사진 6개 exterior/winter/1~6.jpg 경로 적용, 6번째 섹션 추가 | enjoy_winter.html |
| `9fef8e2` | 2026-05-29 | **객실 상세 페이지**: 슬라이더 95vh, 갤러리 썸네일 제거, Other Rooms 하단 전체 섹션 확장 | room_royal/grand/ocean_a/b/skyloft_a/b.html, css/style.css |
| `88a77d0` | 2026-05-29 | restaurant.html: Restaurant Gallery 사진 번호 1~8.jpg 로 수정 | restaurant.html |
| `c752a25` | 2026-05-29 | restaurant.html: Food Gallery 경로 /food/, 운영안내 좌측 정렬 | restaurant.html |
| `18251d3` | 2026-05-29 | restaurant.html: Food Gallery(8장), 운영안내 배경 4.jpg, CTA 제거 후 Restaurant Gallery(8장) 신설 | restaurant.html |
| `1f0d904` | 2026-05-29 | restaurant.html: 이미지 경로 /havet/restaurant/ 폴더로 변경, Gallery 8장→12장 확장 | restaurant.html |
| `8743b6f` | 2026-05-28 | fix: 이미지 서버 경로 /havet/final/ → /havet/ 일괄 교체 | 전체 |
| `11ac744` | 2026-05-28 | feat: enjoy 페이지 주변 관광지 섹션 추가 (7곳, 모바일 줄바꿈 적용) | enjoy_summer/winter.html |
| `48cd903` | 2026-05-27 | 콘텐츠 보강: 업주 방향성 반영 텍스트 수정 (Welcome·Rooms·Verde·Eat&Drink) | index.html, restaurant.html |
| `75b9427` | 2026-05-27 | 전체 사이트 폰트 세리프 변경: Cormorant Garamond(영문) + Noto Serif KR(한글) | css/style.css, 전체 |
| `9b48810` | 2026-05-14 ⭐ | **체크포인트**: Welcome 섹션 텍스트 삭제 (tag: checkpoint-2026-0514) | index.html |
| `a084ce9` | 2026-05-14 | 히어로 영상 video 태그 CSS·JS 호환 수정 | index.html |
| `5369e8f` | 2026-05-14 | 히어로 영상 iframe→video 태그 교체, 자동재생·무한반복·음소거 적용 | index.html |
| `3137351` | 2026-05-14 | 히어로 영상 자동재생·무한반복·음소거 파라미터 추가 | index.html |
| `4441c4d` | 2026-05-14 | 히어로 영상 src 교체 (CDN 링크 변경) | index.html |
| `287c221` | 2026-05-13 | Signature Menu 음식 이름 띄어쓰기 적용 | restaurant.html |
| `2ec171b` | 2026-05-13 | Signature Menu 카테고리 텍스트 삭제 및 설명 글자 크기 확대 | restaurant.html |
| `d3cfc1e` | 2026-05-13 | Signature Menu 음식 이름·설명 텍스트 업주 제공 내용으로 교체 | restaurant.html |
| `27756ec` | 2026-05-13 | Signature Menu 이미지 3장 교체 (업주 제공 음식 사진) | restaurant.html |
| `e452e5b` | 2026-05-13 | 영문 폰트 Raleway 전체 적용 | css/style.css |
| `6101c28` | 2026-05-12 | 사이트 전체 영문 폰트 Cormorant Garamond → Playfair Display 변경 | css/style.css |
| `261e20b` | 2026-05-12 | access.html 지도 중심 좌표 정확한 하벳 리조트 위치로 수정 | access.html |
| `41c3815` | 2026-05-12 | 전체 페이지 헤더 LOCATION 메뉴 추가 | 전체 |
| `2c620e6` | 2026-05-11 | index.html weather-widget 전체 제거 | index.html |
| `6b49c31` | 2026-05-11 | WELCOME 섹션 본문 텍스트 3줄 요약 + 환대 문구 교체 | index.html |
| `b65463a` | 2026-05-11 | 한글 폰트 Noto Sans KR 통일 | css/style.css, index.html |
| `99a8497` | 2026-05-10 | index.html EXPLORE, Verde Story, NEWSLETTER 섹션 3개 삭제 | index.html |
| `42cf813` | 2026-05-07 ⭐ | **복원 체크포인트**: enjoy toggle + special images + all pages | 전체 |

---

## 주요 서버 이미지 경로 정리

| 섹션 | 서버 경로 |
|---|---|
| 객실 사진 | `havet/room/{방번호}/{번호}.jpg` (1=Royal, 2=Grand, 3=OceanA, 4=OceanB, 5=SkyLoftA, 6=SkyLoftB) |
| 레스토랑 히어로/섹션 | `havet/restaurant/0~4.jpg` |
| Food Gallery | `havet/restaurant/food/1~8.jpg` |
| Restaurant Gallery | `havet/restaurant/gallery/1~8.jpg` |
| 겨울 페이지 | `havet/exterior/winter/1~6.jpg` |
| 외관 사진 | `havet/exterior/{번호}.jpg` |

---

## 롤백 시 Manus에게 요청하는 방법

```
"[작업명]으로 롤백해줘"
또는
"커밋 [해시 7자리]로 롤백해줘"
```

**예시:**
- `"객실 상세 페이지 수정 전으로 롤백해줘"` → 커밋 `8743b6f`
- `"restaurant 작업 전 상태로 롤백해줘"` → 커밋 `8743b6f`
- `"체크포인트 2026-0514로 롤백해줘"` → 커밋 `9b48810`
- `"커밋 42cf813으로 롤백해줘"` → 전체 복원 체크포인트

> ⚠️ 롤백 시 해당 시점 이후의 모든 변경사항이 사라집니다. 롤백 전 현재 상태를 별도로 저장하고 싶다면 먼저 말씀해 주세요.
