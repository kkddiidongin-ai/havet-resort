/* ============================================================
   HAVET RESORT — Main JavaScript
   Features: Navigation, Scroll Animations, Gallery Slider,
             Room Slider, Weather Widget, Page Transitions,
             Mobile Menu, Lightbox
   ============================================================ */

'use strict';

/* ============================================================
   PAGE TRANSITION
   ============================================================ */
const PageTransition = {
  overlay: null,

  init() {
    this.overlay = document.getElementById('page-transition');
    if (!this.overlay) return;

    // Fade in on load
    window.addEventListener('load', () => {
      this.overlay.style.opacity = '0';
    });

    // Intercept internal links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || href.startsWith('http') || link.target === '_blank') return;
      e.preventDefault();
      this.overlay.style.opacity = '1';
      this.overlay.style.pointerEvents = 'all';
      setTimeout(() => {
        window.location.href = href;
      }, 450);
    });
  }
};

/* ============================================================
   NAVIGATION
   ============================================================ */
const Nav = {
  nav: null,
  hamburger: null,
  mobileNav: null,
  overlay: null,
  closeBtn: null,

  init() {
    this.nav = document.getElementById('nav');
    this.hamburger = document.getElementById('nav-hamburger');
    this.mobileNav = document.getElementById('mobile-nav');
    this.overlay = document.getElementById('mobile-nav-overlay');
    this.closeBtn = document.getElementById('mobile-nav-close');

    if (!this.nav) return;

    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.openMobile());
    }
    if (this.overlay) {
      this.overlay.addEventListener('click', () => this.closeMobile());
    }
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.closeMobile());
    }
  },

  handleScroll() {
    if (!this.nav) return;
    const isHero = document.querySelector('.hero');
    if (isHero) {
      if (window.scrollY > 80) {
        this.nav.classList.add('scrolled');
        this.nav.classList.remove('transparent');
      } else {
        this.nav.classList.remove('scrolled');
        this.nav.classList.add('transparent');
      }
    } else {
      this.nav.classList.add('scrolled');
    }
  },

  openMobile() {
    if (this.mobileNav) this.mobileNav.classList.add('open');
    if (this.overlay) this.overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeMobile() {
    if (this.mobileNav) this.mobileNav.classList.remove('open');
    if (this.overlay) this.overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
};

/* ============================================================
   SCROLL ANIMATIONS
   ============================================================ */
const ScrollAnimations = {
  observer: null,

  init() {
    const elements = document.querySelectorAll('.fade-up, .fade-in');
    if (!elements.length) return;

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          this.observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => this.observer.observe(el));
  }
};

/* ============================================================
   GALLERY SLIDER (Main page)
   ============================================================ */
const GallerySlider = {
  track: null,
  slides: null,
  prevBtn: null,
  nextBtn: null,
  currentIndex: 0,
  autoplayTimer: null,
  slideWidth: 402, // 400px + 2px gap

  init() {
    this.track = document.querySelector('.gallery-track');
    if (!this.track) return;

    this.slides = this.track.querySelectorAll('.gallery-slide');
    this.prevBtn = document.querySelector('.gallery-btn-prev');
    this.nextBtn = document.querySelector('.gallery-btn-next');

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    this.startAutoplay();

    // Touch support
    let startX = 0;
    this.track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    this.track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });
  },

  getVisibleCount() {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 3;
  },

  next() {
    const max = this.slides.length - this.getVisibleCount();
    this.currentIndex = Math.min(this.currentIndex + 1, max);
    this.update();
    this.resetAutoplay();
  },

  prev() {
    this.currentIndex = Math.max(this.currentIndex - 1, 0);
    this.update();
    this.resetAutoplay();
  },

  update() {
    const slideW = this.slides[0] ? this.slides[0].offsetWidth + 2 : this.slideWidth;
    this.track.style.transform = `translateX(-${this.currentIndex * slideW}px)`;
  },

  startAutoplay() {
    this.autoplayTimer = setInterval(() => {
      const max = this.slides.length - this.getVisibleCount();
      if (this.currentIndex >= max) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.update();
    }, 4000);
  },

  resetAutoplay() {
    clearInterval(this.autoplayTimer);
    this.startAutoplay();
  }
};

/* ============================================================
   ROOM SLIDER (room detail pages)
   ============================================================ */
const RoomSlider = {
  track: null,
  slides: null,
  dots: null,
  prevBtn: null,
  nextBtn: null,
  currentIndex: 0,

  init() {
    this.track = document.querySelector('.room-slider-track');
    if (!this.track) return;

    this.slides = this.track.querySelectorAll('.room-slide');
    this.dots = document.querySelectorAll('.room-slider-dot');
    this.prevBtn = document.querySelector('.room-slider-prev');
    this.nextBtn = document.querySelector('.room-slider-next');

    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());

    this.dots.forEach((dot, i) => {
      dot.addEventListener('click', () => this.goTo(i));
    });

    // Touch support
    let startX = 0;
    this.track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    this.track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) diff > 0 ? this.next() : this.prev();
    }, { passive: true });

    // Keyboard
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  },

  next() {
    this.goTo((this.currentIndex + 1) % this.slides.length);
  },

  prev() {
    this.goTo((this.currentIndex - 1 + this.slides.length) % this.slides.length);
  },

  goTo(index) {
    this.currentIndex = index;
    this.track.style.transform = `translateX(-${index * 100}%)`;
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  }
};

/* ============================================================
   WEATHER WIDGET
   ============================================================ */
const Weather = {
  // OpenWeatherMap API Key — 발급 방법:
  // 1. https://openweathermap.org/api 접속
  // 2. 회원가입 후 API Keys 탭에서 키 생성
  // 3. 아래 YOUR_API_KEY_HERE 를 발급받은 키로 교체
  API_KEY: 'YOUR_API_KEY_HERE',
  LAT: 36.4150,
  LON: 129.3647,

  weatherIcons: {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '⛅',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️',
  },

  weatherKo: {
    'Clear': '맑음', 'Clouds': '구름', 'Rain': '비',
    'Drizzle': '이슬비', 'Thunderstorm': '천둥번개',
    'Snow': '눈', 'Mist': '안개', 'Fog': '안개',
    'Haze': '연무', 'Dust': '황사', 'Sand': '황사',
  },

  async init() {
    const widget = document.getElementById('weather-widget');
    if (!widget) return;

    this.renderDate(widget);

    if (this.API_KEY === 'YOUR_API_KEY_HERE') {
      this.renderFallback(widget);
      return;
    }

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${this.LAT}&lon=${this.LON}&appid=${this.API_KEY}&units=metric&lang=kr`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      this.renderWeather(widget, data);
    } catch (e) {
      this.renderFallback(widget);
    }
  },

  renderDate(widget) {
    const dateEl = widget.querySelector('.weather-info');
    if (!dateEl) return;
    const now = new Date();
    const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    const months = now.getMonth() + 1;
    const date = now.getDate();
    const day = days[now.getDay()];
    const year = now.getFullYear();
    dateEl.textContent = `경북 영덕  ·  ${year}년 ${months}월 ${date}일 ${day}`;
  },

  renderWeather(widget, data) {
    const iconCode = data.weather[0].icon;
    const iconEl = widget.querySelector('.weather-icon');
    const tempEl = widget.querySelector('.weather-temp');
    const descEl = widget.querySelector('.weather-desc');

    if (iconEl) iconEl.textContent = this.weatherIcons[iconCode] || '🌤️';
    if (tempEl) tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    if (descEl) {
      const main = data.weather[0].main;
      descEl.textContent = this.weatherKo[main] || data.weather[0].description;
    }
  },

  renderFallback(widget) {
    const iconEl = widget.querySelector('.weather-icon');
    const tempEl = widget.querySelector('.weather-temp');
    const descEl = widget.querySelector('.weather-desc');
    if (iconEl) iconEl.textContent = '🌊';
    if (tempEl) tempEl.textContent = '동해';
    if (descEl) descEl.textContent = '경북 영덕';
  }
};

/* ============================================================
   LIGHTBOX (Gallery page)
   ============================================================ */
const Lightbox = {
  lightbox: null,
  img: null,
  images: [],
  currentIndex: 0,

  init() {
    this.lightbox = document.getElementById('lightbox');
    if (!this.lightbox) return;

    this.img = this.lightbox.querySelector('.lightbox-img');
    const closeBtn = this.lightbox.querySelector('.lightbox-close');
    const prevBtn = this.lightbox.querySelector('.lightbox-prev');
    const nextBtn = this.lightbox.querySelector('.lightbox-next');

    const galleryItems = document.querySelectorAll('.gallery-masonry-item img, .room-gallery-item img');
    galleryItems.forEach((imgEl, i) => {
      this.images.push(imgEl.src);
      imgEl.parentElement.addEventListener('click', () => this.open(i));
    });

    if (closeBtn) closeBtn.addEventListener('click', () => this.close());
    if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
    if (nextBtn) nextBtn.addEventListener('click', () => this.next());

    this.lightbox.addEventListener('click', (e) => {
      if (e.target === this.lightbox) this.close();
    });

    document.addEventListener('keydown', (e) => {
      if (!this.lightbox.classList.contains('open')) return;
      if (e.key === 'Escape') this.close();
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });
  },

  open(index) {
    this.currentIndex = index;
    if (this.img) this.img.src = this.images[index];
    this.lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  close() {
    this.lightbox.classList.remove('open');
    document.body.style.overflow = '';
  },

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    if (this.img) this.img.src = this.images[this.currentIndex];
  },

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    if (this.img) this.img.src = this.images[this.currentIndex];
  }
};

/* ============================================================
   COMMUNITY TABS
   ============================================================ */
const CommunityTabs = {
  init() {
    const tabs = document.querySelectorAll('.community-tab');
    if (!tabs.length) return;

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.tab;
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        document.querySelectorAll('.community-panel').forEach(panel => {
          panel.style.display = panel.dataset.panel === target ? 'block' : 'none';
        });
      });
    });
  }
};

/* ============================================================
   LAZY LOAD IMAGES
   ============================================================ */
const LazyLoad = {
  init() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (!lazyImages.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });

    lazyImages.forEach(img => observer.observe(img));
  }
};

/* ============================================================
   PARALLAX (subtle, for hero sections)
   ============================================================ */
const Parallax = {
  init() {
    const heroes = document.querySelectorAll('.page-hero-bg');
    if (!heroes.length) return;

    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      heroes.forEach(hero => {
        const rect = hero.closest('.page-hero').getBoundingClientRect();
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          hero.style.transform = `translateY(${scrollY * 0.3}px)`;
        }
      });
    }, { passive: true });
  }
};

/* ============================================================
   NEWSLETTER FORM
   ============================================================ */
const Newsletter = {
  init() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.newsletter-input');
      if (!input || !input.value.trim()) return;

      const btn = form.querySelector('.newsletter-btn');
      if (btn) {
        btn.textContent = '감사합니다!';
        btn.style.background = 'var(--color-accent)';
        setTimeout(() => {
          btn.textContent = 'SEND';
          btn.style.background = '';
          input.value = '';
        }, 3000);
      }
    });
  }
};

/* ============================================================
   INIT ALL
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  PageTransition.init();
  Nav.init();
  ScrollAnimations.init();
  GallerySlider.init();
  RoomSlider.init();
  Weather.init();
  Lightbox.init();
  CommunityTabs.init();
  LazyLoad.init();
  Parallax.init();
  Newsletter.init();
});
