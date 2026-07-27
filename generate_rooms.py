#!/usr/bin/env python3
"""Generate room detail pages for HAVET Resort"""

rooms = [
    {
        "file": "room_grand.html",
        "title": "GRAND OCEAN SUITE",
        "title_ko": "그랜드 오션 스위트",
        "type": "Ocean View Suite",
        "meta_desc": "하벳 그랜드 오션 스위트 — 파노라마 동해 오션뷰와 대형 히노끼탕을 갖춘 프리미엄 스위트.",
        "img_base": "2",
        "img_count": 11,
        "desc1": "광활한 동해를 파노라마로 품은 프리미엄 스위트. 대형 히노끼탕에서 바다를 바라보며 즐기는 입욕의 시간. 넓은 독립 거실과 함께 가족 여행에도 완벽한 공간입니다.",
        "desc2": "동해의 수평선이 창 너머로 펼쳐지는 파노라마 뷰는 그랜드 오션 스위트만의 특권입니다. 이집트 써니베이지 스톤의 따뜻한 질감과 대형 히노끼탕의 향기가 어우러진 공간에서 완전한 휴식을 경험하세요.",
        "area": "약 95㎡",
        "bed": "킹 베드 1개 + 소파베드",
        "view": "파노라마 동해 오션뷰",
        "bath": "대형 히노끼탕 + 샤워부스",
        "max_guests": "4인 (기준 2인)",
        "features": ["파노라마 오션뷰", "대형 히노끼탕", "독립 거실", "발코니"],
        "other_rooms": [
            ("room_royal.html", "1", "Royal Suite", "로얄 스위트"),
            ("room_ocean_a.html", "3", "Ocean Suite A", "오션 스위트 A"),
            ("room_skyloft_a.html", "5", "Sky Loft Suite A", "스카이 로프트 A"),
        ]
    },
    {
        "file": "room_ocean_a.html",
        "title": "OCEAN SUITE A",
        "title_ko": "오션 스위트 A",
        "type": "Ocean View Suite",
        "meta_desc": "하벳 오션 스위트 A — 동해 오션뷰와 히노끼탕이 있는 럭셔리 스위트.",
        "img_base": "3",
        "img_count": 9,
        "desc1": "동해의 푸른 바다를 창 너머로 바라보며 즐기는 오션 스위트. 히노끼탕의 따뜻한 온기와 함께하는 하벳만의 특별한 휴식 공간입니다.",
        "desc2": "이집트 써니베이지 스톤의 따뜻한 색감과 히노끼 원목의 향기가 가득한 오션 스위트 A. 동해의 파도 소리를 들으며 히노끼탕에 몸을 담그는 순간, 일상의 모든 피로가 사라집니다.",
        "area": "약 75㎡",
        "bed": "킹 베드 1개",
        "view": "동해 오션뷰",
        "bath": "히노끼탕 + 샤워부스",
        "max_guests": "2인 (기준 2인)",
        "features": ["오션뷰", "히노끼탕", "테라스", "풀옵션 주방"],
        "other_rooms": [
            ("room_royal.html", "1", "Royal Suite", "로얄 스위트"),
            ("room_grand.html", "2", "Grand Ocean Suite", "그랜드 오션 스위트"),
            ("room_ocean_b.html", "4", "Ocean Suite B", "오션 스위트 B"),
        ]
    },
    {
        "file": "room_ocean_b.html",
        "title": "OCEAN SUITE B",
        "title_ko": "오션 스위트 B",
        "type": "Ocean View Suite",
        "meta_desc": "하벳 오션 스위트 B — 동해 오션뷰와 히노끼탕이 있는 커플 최적화 스위트.",
        "img_base": "4",
        "img_count": 9,
        "desc1": "Ocean Suite A와 같은 감성의 공간이지만, 각기 다른 레이아웃과 뷰 각도로 구성된 또 다른 오션 스위트. 커플 여행에 최적화된 아늑한 공간입니다.",
        "desc2": "동해의 청정한 바람이 테라스를 가득 채우는 오션 스위트 B. 히노끼탕에서 바라보는 동해의 노을은 하벳에서만 경험할 수 있는 특별한 순간입니다.",
        "area": "약 75㎡",
        "bed": "킹 베드 1개",
        "view": "동해 오션뷰",
        "bath": "히노끼탕 + 샤워부스",
        "max_guests": "2인 (기준 2인)",
        "features": ["오션뷰", "히노끼탕", "테라스", "풀옵션 주방"],
        "other_rooms": [
            ("room_royal.html", "1", "Royal Suite", "로얄 스위트"),
            ("room_grand.html", "2", "Grand Ocean Suite", "그랜드 오션 스위트"),
            ("room_ocean_a.html", "3", "Ocean Suite A", "오션 스위트 A"),
        ]
    },
    {
        "file": "room_skyloft_a.html",
        "title": "SKY LOFT SUITE A",
        "title_ko": "스카이 로프트 스위트 A",
        "type": "Loft Suite",
        "meta_desc": "하벳 스카이 로프트 스위트 A — 복층 구조와 루프탑 테라스에서 바라보는 동해 파노라마 뷰.",
        "img_base": "5",
        "img_count": 13,
        "desc1": "하늘과 바다를 동시에 품는 복층 로프트 스위트. 1층의 아늑한 거실과 2층의 침실, 그리고 루프탑 테라스에서 바라보는 동해의 파노라마 뷰는 하벳에서만 경험할 수 있는 특별함입니다.",
        "desc2": "스카이 로프트 스위트 A는 하벳의 가장 높은 위치에서 동해를 내려다보는 특권을 제공합니다. 복층 구조의 넓은 공간과 루프탑 테라스에서 즐기는 별빛 아래의 밤은 평생 기억에 남을 경험이 됩니다.",
        "area": "약 110㎡ (복층)",
        "bed": "킹 베드 1개 + 2층 침실",
        "view": "동해 파노라마 뷰 + 스카이뷰",
        "bath": "히노끼탕 + 샤워부스",
        "max_guests": "4인 (기준 2인)",
        "features": ["복층 구조", "루프탑 테라스", "히노끼탕", "파노라마 뷰"],
        "other_rooms": [
            ("room_royal.html", "1", "Royal Suite", "로얄 스위트"),
            ("room_grand.html", "2", "Grand Ocean Suite", "그랜드 오션 스위트"),
            ("room_skyloft_b.html", "6", "Sky Loft Suite B", "스카이 로프트 B"),
        ]
    },
    {
        "file": "room_skyloft_b.html",
        "title": "SKY LOFT SUITE B",
        "title_ko": "스카이 로프트 스위트 B",
        "type": "Loft Suite",
        "meta_desc": "하벳 스카이 로프트 스위트 B — 복층 구조와 루프탑 테라스, 가족 여행에 최적화된 넓은 공간.",
        "img_base": "6",
        "img_count": 10,
        "desc1": "Sky Loft A와 같은 복층 구조이지만 다른 방향의 뷰와 독특한 인테리어로 구성된 스카이 로프트 스위트 B. 가족 여행과 소규모 그룹에 최적화된 넓은 공간을 제공합니다.",
        "desc2": "스카이 로프트 스위트 B의 루프탑 테라스에서 바라보는 동해의 일출은 하벳 최고의 경험 중 하나입니다. 복층의 넓은 공간에서 온 가족이 함께 즐기는 하벳의 시간은 특별한 추억이 됩니다.",
        "area": "약 110㎡ (복층)",
        "bed": "킹 베드 1개 + 2층 침실",
        "view": "동해 파노라마 뷰 + 스카이뷰",
        "bath": "히노끼탕 + 샤워부스",
        "max_guests": "4인 (기준 2인)",
        "features": ["복층 구조", "루프탑 테라스", "히노끼탕", "파노라마 뷰"],
        "other_rooms": [
            ("room_royal.html", "1", "Royal Suite", "로얄 스위트"),
            ("room_grand.html", "2", "Grand Ocean Suite", "그랜드 오션 스위트"),
            ("room_skyloft_a.html", "5", "Sky Loft Suite A", "스카이 로프트 A"),
        ]
    },
]

NAV_HTML = '''<nav id="nav" class="scrolled">
  <div class="nav-logo">
    <a href="index.html"><span class="nav-logo-text">HAVET<span>RESORT · YEONGDEOK</span></span></a>
  </div>
  <ul class="nav-menu">
    <li><a href="about.html">ABOUT</a></li>
    <li><a href="rooms.html">ROOMS</a>
      <ul class="nav-dropdown">
        <li><a href="rooms.html">All Rooms</a></li>
        <li><a href="room_royal.html">Royal Suite</a></li>
        <li><a href="room_grand.html">Grand Ocean Suite</a></li>
        <li><a href="room_ocean_a.html">Ocean Suite A</a></li>
        <li><a href="room_ocean_b.html">Ocean Suite B</a></li>
        <li><a href="room_skyloft_a.html">Sky Loft A</a></li>
        <li><a href="room_skyloft_b.html">Sky Loft B</a></li>
      </ul>
    </li>
    <li><a href="restaurant.html">RESTAURANT</a></li>
    <li><a href="enjoy_summer.html">ENJOY</a>
      <ul class="nav-dropdown">
        <li><a href="enjoy_summer.html">Summer</a></li>
        <li><a href="enjoy_winter.html">Winter</a></li>
      </ul>
    </li>
    <li><a href="facility.html">FACILITY</a></li>
    <li><a href="reservation.html">RESERVATION</a></li>
    <li><a href="gallery.html">GALLERY</a></li>
  </ul>
  <div class="nav-right">
    <span class="nav-tel">+82-054-732-0200</span>
    <a href="reservation.html" class="btn-book-nav">BOOK NOW</a>
    <button class="nav-hamburger" id="nav-hamburger"><span></span><span></span><span></span></button>
  </div>
</nav>

<div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
<div class="mobile-nav" id="mobile-nav">
  <button class="mobile-nav-close" id="mobile-nav-close">✕</button>
  <ul>
    <li><a href="about.html">ABOUT</a></li>
    <li><a href="rooms.html">ROOMS</a></li>
    <li><a href="restaurant.html">RESTAURANT</a></li>
    <li><a href="enjoy_summer.html">ENJOY — SUMMER</a></li>
    <li><a href="enjoy_winter.html">ENJOY — WINTER</a></li>
    <li><a href="facility.html">FACILITY</a></li>
    <li><a href="reservation.html">RESERVATION</a></li>
    <li><a href="gallery.html">GALLERY</a></li>
  </ul>
  <a href="reservation.html" class="mobile-nav-book">BOOK NOW</a>
  <a href="tel:+82054732020" class="mobile-nav-tel">+82-054-732-0200</a>
</div>'''

FOOTER_HTML = '''<footer id="footer">
  <div class="footer-inner">
    <div class="footer-top">
      <div>
        <div class="footer-logo">HAVET<span>RESORT · YEONGDEOK</span></div>
        <div class="footer-address">
          <strong>Address</strong>
          경북 영덕군 병곡면 흰돌로 46 (병곡리 360)<br><br>
          <strong>Contact</strong>
          TEL. +82-054-732-0200<br><br>
          <strong>Hours</strong>
          체크인 15:00 / 체크아웃 11:00
        </div>
      </div>
      <div>
        <p class="footer-nav-title">Rooms</p>
        <ul class="footer-nav-list">
          <li><a href="room_royal.html">Royal Suite</a></li>
          <li><a href="room_grand.html">Grand Ocean Suite</a></li>
          <li><a href="room_ocean_a.html">Ocean Suite A</a></li>
          <li><a href="room_ocean_b.html">Ocean Suite B</a></li>
          <li><a href="room_skyloft_a.html">Sky Loft Suite A</a></li>
          <li><a href="room_skyloft_b.html">Sky Loft Suite B</a></li>
        </ul>
      </div>
      <div>
        <p class="footer-nav-title">Information</p>
        <ul class="footer-nav-list">
          <li><a href="reservation.html">Reservation</a></li>
          <li><a href="gallery.html">Gallery</a></li>
          <li><a href="community.html">Community</a></li>
          <li><a href="access.html">Access</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">Copyright © HAVET Resort. All Rights Reserved.</p>
    </div>
  </div>
</footer>'''

def generate_slides(img_base, count):
    slides = []
    dots = []
    for i in range(1, min(count + 1, 9)):
        url = f"http://gonylab7.speedgabia.com/havet/final/room/{img_base}/{i}.jpg"
        slides.append(f'    <div class="room-slide" style="background-image: url(\'{url}\')"></div>')
        dots.append(f'    <button class="room-slider-dot{" active" if i == 1 else ""}"></button>')
    return "\n".join(slides), "\n".join(dots)

def generate_features(features):
    return "\n".join([f'        <span class="room-feature-tag">{f}</span>' for f in features])

def generate_gallery(img_base, count):
    items = []
    for i in range(min(count, 6), min(count, 6) + 6):
        if i > count:
            break
        url = f"http://gonylab7.speedgabia.com/havet/final/room/{img_base}/{i}.jpg"
        items.append(f'''      <div class="room-gallery-item">
        <img src="{url}" alt="객실 사진 {i}" loading="lazy" />
      </div>''')
    # Fallback to earlier images if not enough
    if len(items) < 6:
        for i in range(1, 7 - len(items)):
            url = f"http://gonylab7.speedgabia.com/havet/final/room/{img_base}/{i}.jpg"
            items.append(f'''      <div class="room-gallery-item">
        <img src="{url}" alt="객실 사진 {i}" loading="lazy" />
      </div>''')
    return "\n".join(items[:6])

def generate_other_rooms(other_rooms):
    items = []
    for href, img_n, title_en, title_ko in other_rooms:
        url = f"http://gonylab7.speedgabia.com/havet/final/room/{img_n}/1.jpg"
        items.append(f'''        <a href="{href}" style="display: flex; gap: 12px; align-items: center; padding: 12px; background: #1E1E1C; border: 1px solid var(--color-border); text-decoration: none;">
          <div style="width: 60px; height: 50px; background-image: url('{url}'); background-size: cover; background-position: center; flex-shrink: 0;"></div>
          <div>
            <p style="font-family: var(--font-sans-en); font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-secondary);">{title_en}</p>
            <p style="font-family: var(--font-sans-ko); font-size: 0.75rem; color: rgba(245,240,232,0.55);">{title_ko}</p>
          </div>
        </a>''')
    return "\n".join(items)

for room in rooms:
    slides_html, dots_html = generate_slides(room["img_base"], room["img_count"])
    features_html = generate_features(room["features"])
    gallery_html = generate_gallery(room["img_base"], room["img_count"])
    other_rooms_html = generate_other_rooms(room["other_rooms"])

    html = f'''<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{room["title"]} — HAVET RESORT</title>
  <meta name="description" content="{room["meta_desc"]}" />
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>

<div id="page-transition"></div>

{NAV_HTML}

<!-- Room Slider -->
<div class="room-slider">
  <div class="room-slider-track">
{slides_html}
  </div>
  <div class="room-slider-dots">
{dots_html}
  </div>
  <div class="room-slider-nav">
    <button class="room-slider-btn room-slider-prev" aria-label="이전">←</button>
    <button class="room-slider-btn room-slider-next" aria-label="다음">→</button>
  </div>
</div>

<!-- Room Detail Content -->
<div class="room-detail-content">
  <div class="room-detail-main">
    <span class="room-type fade-up">{room["type"]}</span>
    <h1 class="room-name fade-up fade-up-delay-1">{room["title"]}</h1>
    <p class="room-name-ko fade-up fade-up-delay-1">{room["title_ko"]}</p>
    <div class="section-divider fade-up fade-up-delay-2"></div>

    <p class="section-desc fade-up fade-up-delay-2" style="max-width: 100%; margin-bottom: 24px;">
      {room["desc1"]}
    </p>
    <p class="section-desc fade-up fade-up-delay-3" style="max-width: 100%;">
      {room["desc2"]}
    </p>

    <!-- Room Info Table -->
    <table class="room-info-table fade-up" style="margin-top: 40px;">
      <tr>
        <td>최대 인원</td>
        <td>{room["max_guests"]}</td>
      </tr>
      <tr>
        <td>체크인</td>
        <td>15:00</td>
      </tr>
      <tr>
        <td>체크아웃</td>
        <td>11:00</td>
      </tr>
      <tr>
        <td>면적</td>
        <td>{room["area"]}</td>
      </tr>
      <tr>
        <td>침실 타입</td>
        <td>{room["bed"]}</td>
      </tr>
      <tr>
        <td>뷰</td>
        <td>{room["view"]}</td>
      </tr>
      <tr>
        <td>욕실</td>
        <td>{room["bath"]}</td>
      </tr>
    </table>

    <!-- Amenities -->
    <h3 class="fade-up" style="font-family: var(--font-sans-en); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-secondary); margin-top: 40px; margin-bottom: 20px;">Amenities</h3>
    <div class="amenities-grid fade-up">
      <div class="amenity-item"><span class="amenity-icon">🌊</span><span class="amenity-text">동해 오션뷰</span></div>
      <div class="amenity-item"><span class="amenity-icon">🛁</span><span class="amenity-text">히노끼탕</span></div>
      <div class="amenity-item"><span class="amenity-icon">🍳</span><span class="amenity-text">풀옵션 주방</span></div>
      <div class="amenity-item"><span class="amenity-icon">📺</span><span class="amenity-text">스마트 TV</span></div>
      <div class="amenity-item"><span class="amenity-icon">🅿️</span><span class="amenity-text">주차 가능</span></div>
      <div class="amenity-item"><span class="amenity-icon">⚡</span><span class="amenity-text">전기차 충전기</span></div>
      <div class="amenity-item"><span class="amenity-icon">🍽️</span><span class="amenity-text">조식 포함(선택)</span></div>
      <div class="amenity-item"><span class="amenity-icon">🏊</span><span class="amenity-text">공용풀 이용</span></div>
      <div class="amenity-item"><span class="amenity-icon">🔥</span><span class="amenity-text">캠프파이어</span></div>
    </div>

    <!-- Room Gallery -->
    <div class="room-gallery-grid fade-up" style="margin-top: 60px;">
{gallery_html}
    </div>
  </div>

  <!-- Sidebar -->
  <div class="room-detail-sidebar">
    <div class="booking-card fade-up">
      <h3 class="booking-card-title">{room["title"]}</h3>
      <p class="booking-card-sub">{room["title_ko"]} · {room["type"]}</p>
      <div class="booking-card-info">
        체크인: 15:00<br>
        체크아웃: 11:00<br>
        최대 인원: {room["max_guests"]}
      </div>
      <a href="tel:+82054732020" class="booking-card-tel">📞 +82-054-732-0200</a>
      <a href="reservation.html" class="btn btn-primary" style="width: 100%; text-align: center; display: block;">예약하기</a>
      <a href="tel:+82054732020" class="btn btn-outline" style="width: 100%; text-align: center; display: block; margin-top: 8px;">문의하기</a>
    </div>

    <div style="margin-top: 32px;">
      <p style="font-family: var(--font-sans-en); font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--color-secondary); margin-bottom: 16px;">Other Rooms</p>
      <div style="display: flex; flex-direction: column; gap: 2px;">
{other_rooms_html}
      </div>
    </div>
  </div>
</div>

<!-- Lightbox -->
<div class="lightbox" id="lightbox">
  <button class="lightbox-close">✕</button>
  <button class="lightbox-prev">←</button>
  <img class="lightbox-img" src="" alt="Gallery" />
  <button class="lightbox-next">→</button>
</div>

{FOOTER_HTML}

<a href="reservation.html" class="floating-book">예약하기</a>

<script src="js/main.js"></script>
</body>
</html>'''

    with open(f"/home/ubuntu/havet/{room['file']}", "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Generated: {room['file']}")

print("All room pages generated!")
