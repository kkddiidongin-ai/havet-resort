/**
 * HAVET RESORT × DIGITALNOW PMS 연동 모듈
 * 디지털나우 공개 API를 통해 객실 정보, 요금, 스페셜 오퍼를 실시간으로 불러옵니다.
 *
 * 사용된 공개 API 엔드포인트:
 *   - /booking/basicTypeListOnlyData/{user_id}  → 객실 타입 목록 + 스페셜 오퍼
 *   - /booking/calendarRoomList (POST)           → 타입별 객실 목록 + 요금
 *   - /booking/isRvAbleDt (POST)                 → 예약 가능 날짜
 *   - /booking/holidayList/{user_id}             → 공휴일/휴무일 목록
 */

(function () {
  'use strict';

  const DINA = {
    BASE_URL: 'https://digitalnow.co.kr',
    USER_ID: 'havet',
    IMG_BASE: 'https://digitalnow.co.kr/web/roomimg/havet/',

    // 객실 타입 목록 + 스페셜 오퍼 가져오기
    fetchRoomTypes: function () {
      return fetch(`${this.BASE_URL}/booking/basicTypeListOnlyData/${this.USER_ID}`)
        .then(res => res.json())
        .then(data => data.BASIC_TYPE_LIST ? data.BASIC_TYPE_LIST.LIST : [])
        .catch(err => { console.warn('[DINA] fetchRoomTypes error:', err); return []; });
    },

    // 특정 타입의 객실 목록 + 요금 가져오기 (POST)
    fetchRoomsByType: function (typeIdx, checkIn, checkOut) {
      const params = new URLSearchParams({
        TYPE_IDX: typeIdx,
        SKIN_TYPE: 'ROOM',
        USER_ID: this.USER_ID,
        CHECK_IN_DT: checkIn || '',
        CHECK_OUT_DT: checkOut || ''
      });
      return fetch(`${this.BASE_URL}/booking/calendarRoomList`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      })
        .then(res => res.text())
        .catch(err => { console.warn('[DINA] fetchRoomsByType error:', err); return ''; });
    },

    // 공휴일/특별 요금 날짜 가져오기
    fetchHolidays: function () {
      return fetch(`${this.BASE_URL}/booking/holidayList/${this.USER_ID}`)
        .then(res => res.json())
        .catch(err => { console.warn('[DINA] fetchHolidays error:', err); return []; });
    },

    // 이미지 URL 생성
    getImgUrl: function (filename) {
      if (!filename) return '';
      return `${this.IMG_BASE}${filename}`;
    }
  };

  // ─────────────────────────────────────────────────────────────────────────
  // 1. RESERVATION 페이지 요금표 자동 업데이트
  // ─────────────────────────────────────────────────────────────────────────
  function updateReservationRates() {
    const ratesContainer = document.getElementById('dina-room-rates');
    const tabsContainer = document.getElementById('dina-room-tabs');
    if (!ratesContainer || !tabsContainer) return;

    DINA.fetchRoomTypes().then(types => {
      if (!types || types.length === 0) return;

      // 탭 생성
      tabsContainer.innerHTML = '';
      types.forEach((type, idx) => {
        const tab = document.createElement('button');
        tab.className = 'rate-tab' + (idx === 0 ? ' active' : '');
        tab.textContent = type.TYPE_CONTENT || type.TYPE_NAME;
        tab.dataset.typeIdx = type.TYPE_IDX;
        tab.addEventListener('click', function () {
          document.querySelectorAll('.rate-tab').forEach(t => t.classList.remove('active'));
          this.classList.add('active');
          showRatePanel(type.TYPE_IDX, type.TYPE_CONTENT || type.TYPE_NAME);
        });
        tabsContainer.appendChild(tab);
      });

      // 첫 번째 탭 요금 표시
      if (types[0]) {
        showRatePanel(types[0].TYPE_IDX, types[0].TYPE_CONTENT || types[0].TYPE_NAME);
      }
    });
  }

  function showRatePanel(typeIdx, typeName) {
    const ratesContainer = document.getElementById('dina-room-rates');
    if (!ratesContainer) return;

    ratesContainer.innerHTML = '<p class="dina-loading">요금 정보를 불러오는 중...</p>';

    // 비수기/준성수기/성수기 날짜 샘플로 요금 조회
    const today = new Date();
    const fmt = d => d.toISOString().slice(0, 10).replace(/-/g, '');

    // 비수기 (현재 날짜 기준 평일)
    const offPeakIn = fmt(today);
    const offPeakOut = fmt(new Date(today.getTime() + 86400000));

    DINA.fetchRoomsByType(typeIdx, offPeakIn, offPeakOut).then(html => {
      // HTML 응답에서 요금 데이터 파싱
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      const roomItems = doc.querySelectorAll('.listBox');

      if (roomItems.length === 0) {
        ratesContainer.innerHTML = `
          <div class="dina-rate-notice">
            <p>정확한 요금은 실시간 예약 시스템에서 확인하세요.</p>
            <a href="https://digitalnow.co.kr/booking/stepA1/havet" target="_blank" class="btn-book-inline">실시간 요금 확인</a>
          </div>`;
        return;
      }

      let tableHTML = `
        <div class="dina-rate-table-wrap">
          <p class="dina-rate-note">※ 요금은 디지털나우 PMS와 실시간 연동됩니다.</p>
          <table class="dina-rate-table">
            <thead>
              <tr>
                <th>객실명</th>
                <th>기준 인원</th>
                <th>최대 인원</th>
                <th>요금</th>
                <th>예약</th>
              </tr>
            </thead>
            <tbody>`;

      roomItems.forEach(item => {
        const name = item.querySelector('strong') ? item.querySelector('strong').textContent.trim() : '';
        const priceEl = item.querySelector('.price strong');
        const price = priceEl ? priceEl.textContent.trim() : '문의';
        const persons = item.querySelector('.names span') ? item.querySelector('.names span').textContent.trim() : '';
        const roomCode = item.querySelector('.roomSelect') ? item.querySelector('.roomSelect').dataset.roomcode : '';

        tableHTML += `
              <tr>
                <td>${name}</td>
                <td colspan="2">${persons}</td>
                <td class="price-cell">${price}</td>
                <td><a href="https://digitalnow.co.kr/booking/stepA1/havet" target="_blank" class="btn-rate-book">예약</a></td>
              </tr>`;
      });

      tableHTML += `
            </tbody>
          </table>
        </div>`;

      ratesContainer.innerHTML = tableHTML;
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 2. 스페셜 오퍼 카드 자동 업데이트 (메인 페이지)
  // ─────────────────────────────────────────────────────────────────────────
  function updateSpecialOffers() {
    const container = document.getElementById('dina-special-offers');
    if (!container) return;

    DINA.fetchRoomTypes().then(types => {
      if (!types || types.length === 0) return;

      // 스페셜 오퍼가 있는 타입만 필터
      const offerTypes = types.filter(t => t.EVENT_TYPE_NM_YN === 'Y' && t.EVENT_TYPE_NAME);
      if (offerTypes.length === 0) return;

      // 중복 오퍼명 제거 (같은 이름의 오퍼는 하나만)
      const seen = new Set();
      const uniqueOffers = offerTypes.filter(t => {
        if (seen.has(t.EVENT_TYPE_NAME)) return false;
        seen.add(t.EVENT_TYPE_NAME);
        return true;
      });

      // 카드 생성
      let cardsHTML = '';
      uniqueOffers.slice(0, 6).forEach((offer, idx) => {
        const imgUrl = offer.TYPE_IMG ? DINA.getImgUrl(offer.TYPE_IMG) : '';
        const content = offer.EVENT_TYPE_CONTENT
          ? offer.EVENT_TYPE_CONTENT.replace(/<br\s*\/?>/gi, ' · ').replace(/<[^>]+>/g, '')
          : '';

        cardsHTML += `
          <div class="offer-card dina-offer-card fade-in-up" style="animation-delay:${idx * 0.1}s">
            <div class="offer-card-img" style="background-image:url('${imgUrl}')">
              <div class="offer-card-overlay"></div>
            </div>
            <div class="offer-card-body">
              <span class="offer-tag">SPECIAL OFFER</span>
              <h3 class="offer-title">${offer.EVENT_TYPE_NAME}</h3>
              <p class="offer-room">${offer.TYPE_CONTENT || offer.TYPE_NAME}</p>
              <p class="offer-desc">${content}</p>
              <a href="https://digitalnow.co.kr/booking/stepA1/havet" target="_blank" class="offer-btn">자세히 보기</a>
            </div>
          </div>`;
      });

      if (cardsHTML) {
        container.innerHTML = cardsHTML;
      }
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 3. 객실 목록 페이지 자동 업데이트
  // ─────────────────────────────────────────────────────────────────────────
  function updateRoomListings() {
    const container = document.getElementById('dina-room-listings');
    if (!container) return;

    DINA.fetchRoomTypes().then(types => {
      if (!types || types.length === 0) return;

      types.forEach(type => {
        // 기존 객실 카드에서 매칭되는 항목 찾아서 업데이트
        const typeContent = (type.TYPE_CONTENT || '').toLowerCase().replace(/\s/g, '');
        const cards = document.querySelectorAll('.room-card[data-room]');

        cards.forEach(card => {
          const cardRoom = (card.dataset.room || '').toLowerCase().replace(/\s/g, '');
          if (typeContent.includes(cardRoom) || cardRoom.includes(typeContent)) {
            // 스페셜 오퍼 배지 추가
            if (type.EVENT_TYPE_NM_YN === 'Y' && type.EVENT_TYPE_NAME) {
              const badge = card.querySelector('.offer-badge') || document.createElement('span');
              badge.className = 'offer-badge';
              badge.textContent = type.EVENT_TYPE_NAME;
              if (!card.querySelector('.offer-badge')) {
                const imgEl = card.querySelector('.room-card-img');
                if (imgEl) imgEl.appendChild(badge);
              }
            }
          }
        });
      });
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // 초기화 - DOM 로드 후 실행
  // ─────────────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    updateReservationRates();
    updateSpecialOffers();
    updateRoomListings();
  });

  // 전역 노출 (필요 시 수동 호출 가능)
  window.DINA = DINA;
  window.DINA.refresh = function () {
    updateReservationRates();
    updateSpecialOffers();
    updateRoomListings();
  };

})();
