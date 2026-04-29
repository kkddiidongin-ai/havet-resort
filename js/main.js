/* =====================================================
   HAVET RESORT — main.js
   공통 JavaScript: 네비게이션, 슬라이더, 스크롤 애니메이션
   ===================================================== */

(function() {
  'use strict';

  /* ===== PAGE TRANSITION ===== */
  document.addEventListener('DOMContentLoaded', function() {
    var pt = document.getElementById('page-transition');
    if (pt) {
      pt.style.opacity = '0';
      setTimeout(function() { pt.style.display = 'none'; }, 600);
    }
  });

  // 페이지 이동 시 트랜지션
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:') || link.target === '_blank') return;
    e.preventDefault();
    var pt = document.getElementById('page-transition');
    if (pt) {
      pt.style.display = 'block';
      pt.style.opacity = '1';
    }
    setTimeout(function() { window.location.href = href; }, 350);
  });

  /* ===== NAVIGATION ===== */
  var nav = document.getElementById('nav');
  var hamburger = document.getElementById('nav-hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  var mobileOverlay = document.getElementById('mobile-nav-overlay');
  var mobileClose = document.getElementById('mobile-nav-close');

  // Scroll 이벤트 — nav 스타일 변경
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Floating book button
    var floatingBook = document.getElementById('floatingBook');
    if (floatingBook) {
      if (window.scrollY > 300) {
        floatingBook.classList.add('visible');
      } else {
        floatingBook.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile nav open
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      if (mobileNav) mobileNav.classList.add('open');
      if (mobileOverlay) mobileOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  // Mobile nav close
  function closeMobileNav() {
    if (mobileNav) mobileNav.classList.remove('open');
    if (mobileOverlay) mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobileNav);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileNav);

  /* ===== FADE-UP SCROLL ANIMATION ===== */
  function initFadeUp() {
    var elements = document.querySelectorAll('.fade-up');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) {
      observer.observe(el);
    });
  }

  document.addEventListener('DOMContentLoaded', initFadeUp);

  /* ===== ROOM SLIDER (room_*.html) ===== */
  function initRoomSlider() {
    var track = document.querySelector('.room-slider-track');
    if (!track) return;

    var slides = track.querySelectorAll('.room-slide');
    var dots = document.querySelectorAll('.room-slider-dot');
    var prevBtn = document.querySelector('.room-slider-prev');
    var nextBtn = document.querySelector('.room-slider-next');
    var current = 0;
    var total = slides.length;
    var autoTimer = null;

    function goTo(idx) {
      if (idx < 0) idx = total - 1;
      if (idx >= total) idx = 0;
      current = idx;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    function startAuto() {
      autoTimer = setInterval(function() { goTo(current + 1); }, 5000);
    }

    function stopAuto() {
      clearInterval(autoTimer);
    }

    if (prevBtn) prevBtn.addEventListener('click', function() { stopAuto(); goTo(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function() { stopAuto(); goTo(current + 1); startAuto(); });

    dots.forEach(function(dot, i) {
      dot.addEventListener('click', function() { stopAuto(); goTo(i); startAuto(); });
    });

    // Touch/swipe
    var touchStartX = 0;
    var sliderEl = document.querySelector('.room-slider');
    if (sliderEl) {
      sliderEl.addEventListener('touchstart', function(e) { touchStartX = e.touches[0].clientX; }, { passive: true });
      sliderEl.addEventListener('touchend', function(e) {
        var diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
          stopAuto();
          goTo(diff > 0 ? current + 1 : current - 1);
          startAuto();
        }
      }, { passive: true });
    }

    goTo(0);
    startAuto();
  }

  document.addEventListener('DOMContentLoaded', initRoomSlider);

  /* ===== LIGHTBOX ===== */
  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    var lightboxImg = lightbox.querySelector('.lightbox-img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var galleryItems = document.querySelectorAll('.room-gallery-item');
    var currentIdx = 0;

    function openLightbox(idx) {
      currentIdx = idx;
      var src = galleryItems[idx].getAttribute('data-src') || galleryItems[idx].querySelector('img').src;
      lightboxImg.src = src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    galleryItems.forEach(function(item, i) {
      item.addEventListener('click', function() { openLightbox(i); });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) closeLightbox();
    });

    if (prevBtn) prevBtn.addEventListener('click', function() {
      currentIdx = (currentIdx - 1 + galleryItems.length) % galleryItems.length;
      var src = galleryItems[currentIdx].getAttribute('data-src') || galleryItems[currentIdx].querySelector('img').src;
      lightboxImg.src = src;
    });

    if (nextBtn) nextBtn.addEventListener('click', function() {
      currentIdx = (currentIdx + 1) % galleryItems.length;
      var src = galleryItems[currentIdx].getAttribute('data-src') || galleryItems[currentIdx].querySelector('img').src;
      lightboxImg.src = src;
    });

    document.addEventListener('keydown', function(e) {
      if (!lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
    });
  }

  document.addEventListener('DOMContentLoaded', initLightbox);

  /* ===== GALLERY PAGE LIGHTBOX ===== */
  function initGalleryLightbox() {
    var lightbox = document.getElementById('lightbox');
    if (!lightbox) return;
    var galleryGrid = document.querySelector('.gallery-grid');
    if (!galleryGrid) return;

    var lightboxImg = lightbox.querySelector('.lightbox-img');
    var closeBtn = lightbox.querySelector('.lightbox-close');
    var prevBtn = lightbox.querySelector('.lightbox-prev');
    var nextBtn = lightbox.querySelector('.lightbox-next');
    var items = galleryGrid.querySelectorAll('.gallery-item');
    var currentIdx = 0;

    function open(idx) {
      currentIdx = idx;
      var img = items[idx].querySelector('img');
      if (img) lightboxImg.src = img.src;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    items.forEach(function(item, i) {
      item.style.cursor = 'pointer';
      item.addEventListener('click', function() { open(i); });
    });

    if (closeBtn) closeBtn.addEventListener('click', close);
    lightbox.addEventListener('click', function(e) { if (e.target === lightbox) close(); });
    if (prevBtn) prevBtn.addEventListener('click', function() { open((currentIdx - 1 + items.length) % items.length); });
    if (nextBtn) nextBtn.addEventListener('click', function() { open((currentIdx + 1) % items.length); });
  }

  document.addEventListener('DOMContentLoaded', initGalleryLightbox);

  /* ===== MAIN PAGE — EXPLORE CARDS HOVER ===== */
  function initExploreCards() {
    var cards = document.querySelectorAll('.explore-card');
    cards.forEach(function(card) {
      card.addEventListener('mouseenter', function() {
        cards.forEach(function(c) { c.classList.remove('hovered'); });
        card.classList.add('hovered');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initExploreCards);

  /* ===== MAIN PAGE — ROOMS SLIDER ===== */
  function initMainRoomsSlider() {
    var track = document.querySelector('.rooms-slider-track');
    if (!track) return;

    var cards = track.querySelectorAll('.rooms-slider-card');
    var prevBtn = document.querySelector('.rooms-slider-prev');
    var nextBtn = document.querySelector('.rooms-slider-next');
    var current = 0;
    var cardWidth = 0;
    var visibleCount = 1;

    function getVisibleCount() {
      if (window.innerWidth >= 1200) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function updateSlider() {
      visibleCount = getVisibleCount();
      var containerWidth = track.parentElement.offsetWidth;
      cardWidth = containerWidth / visibleCount;
      cards.forEach(function(card) { card.style.minWidth = cardWidth + 'px'; });
      var maxIdx = Math.max(0, cards.length - visibleCount);
      if (current > maxIdx) current = maxIdx;
      track.style.transform = 'translateX(-' + (current * cardWidth) + 'px)';
    }

    if (prevBtn) prevBtn.addEventListener('click', function() {
      if (current > 0) { current--; updateSlider(); }
    });

    if (nextBtn) nextBtn.addEventListener('click', function() {
      var maxIdx = Math.max(0, cards.length - getVisibleCount());
      if (current < maxIdx) { current++; updateSlider(); }
    });

    window.addEventListener('resize', updateSlider);
    updateSlider();
  }

  document.addEventListener('DOMContentLoaded', initMainRoomsSlider);

  /* ===== SPECIAL OFFERS SLIDER ===== */
  function initSpecialSlider() {
    var track = document.querySelector('.special-track');
    if (!track) return;

    var cards = track.querySelectorAll('.special-card');
    var prevBtn = document.querySelector('.special-prev');
    var nextBtn = document.querySelector('.special-next');
    var current = 0;

    function getVisible() {
      if (window.innerWidth >= 1200) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }

    function update() {
      var visible = getVisible();
      var containerWidth = track.parentElement.offsetWidth;
      var cardW = containerWidth / visible;
      cards.forEach(function(c) { c.style.minWidth = cardW + 'px'; });
      var maxIdx = Math.max(0, cards.length - visible);
      if (current > maxIdx) current = maxIdx;
      track.style.transform = 'translateX(-' + (current * cardW) + 'px)';
    }

    if (prevBtn) prevBtn.addEventListener('click', function() { if (current > 0) { current--; update(); } });
    if (nextBtn) nextBtn.addEventListener('click', function() {
      var maxIdx = Math.max(0, cards.length - getVisible());
      if (current < maxIdx) { current++; update(); }
    });

    window.addEventListener('resize', update);
    update();
  }

  document.addEventListener('DOMContentLoaded', initSpecialSlider);

  /* ===== RESERVATION PAGE — ROOM PHOTO SLIDER ===== */
  function initReservationSlider() {
    var track = document.querySelector('.res-slider-track');
    if (!track) return;

    var slides = track.querySelectorAll('.res-slide');
    var dots = document.querySelectorAll('.res-dot');
    var prevBtn = document.querySelector('.res-prev');
    var nextBtn = document.querySelector('.res-next');
    var current = 0;
    var total = slides.length;

    function goTo(idx) {
      if (idx < 0) idx = total - 1;
      if (idx >= total) idx = 0;
      current = idx;
      track.style.transform = 'translateX(-' + (current * 100) + '%)';
      dots.forEach(function(d, i) { d.classList.toggle('active', i === current); });
    }

    if (prevBtn) prevBtn.addEventListener('click', function() { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function() { goTo(current + 1); });
    dots.forEach(function(dot, i) { dot.addEventListener('click', function() { goTo(i); }); });

    setInterval(function() { goTo(current + 1); }, 4000);
    goTo(0);
  }

  document.addEventListener('DOMContentLoaded', initReservationSlider);

  /* ===== ENJOY PAGE — SEASON TOGGLE ===== */
  function initSeasonToggle() {
    var toggleBtns = document.querySelectorAll('.season-toggle-btn');
    if (!toggleBtns.length) return;

    toggleBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        var target = btn.getAttribute('data-target');
        if (target) window.location.href = target;
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initSeasonToggle);

  /* ===== GALLERY PAGE — FILTER ===== */
  function initGalleryFilter() {
    var filterBtns = document.querySelectorAll('.gallery-filter-btn');
    if (!filterBtns.length) return;

    var items = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
        filterBtns.forEach(function(b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');
        items.forEach(function(item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  document.addEventListener('DOMContentLoaded', initGalleryFilter);

  /* ===== SMOOTH SCROLL FOR ANCHOR LINKS ===== */
  document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = link.getAttribute('href').slice(1);
    if (!id) return;
    var target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

})();
