/* HAVET image safety: no replacements, cache-busters, eager loading or normal-image probes. */
(function () {
  'use strict';
  if (window.__havetImageSafetyStarted) return;
  window.__havetImageSafetyStarted = true;

  var RETRY_DELAY = 1500, DEADLINE = 20000, THROTTLE = 200, MAX_URLS = 128;
  var images = new WeakMap(), backgrounds = new WeakMap(), ownStyles = new WeakMap();
  var urls = new Map(), queue = [], active = 0, scheduled = false, lastScan = 0;
  var running = false, observer;

  function absolute(value) {
    try {
      var url = new URL(value, document.baseURI);
      return /^(https?:|data:|blob:)$/.test(url.protocol) ? url.href : '';
    } catch (_) { return ''; }
  }
  function record(url) {
    if (!url) return null;
    if (!urls.has(url)) {
      if (urls.size >= MAX_URLS) return null;
      urls.set(url, { url: url, status: 'unknown', attempts: 0, failedAt: 0 });
    }
    return urls.get(url);
  }
  function source(img) {
    var src = img.getAttribute('src') || '', set = img.getAttribute('srcset') || '';
    if (!src.trim() && !set.trim()) return null; // Empty lightbox / unstarted data-src.
    if (img.hasAttribute('data-src')) return null; // Existing lazy loader owns promotion.
    var picture = img.parentElement && img.parentElement.tagName === 'PICTURE' ?
      Array.prototype.map.call(img.parentElement.querySelectorAll('source'), function (s) {
        return ['srcset', 'sizes', 'media', 'type'].map(function (a) { return s.getAttribute(a); }).join('|');
      }).join(';') : '';
    var url = absolute(img.currentSrc || (set.trim() ? '' : src));
    return { key: [src, set, img.getAttribute('sizes'), picture, url].join('\n'), url: url,
      src: src, set: set };
  }
  function current(img, state) {
    var now = source(img);
    return img.isConnected && images.get(img) === state && now && now.key === state.key;
  }
  function restore(el, state) {
    if (!state.notice) return;
    Object.keys(state.notice).forEach(function (name) {
      var saved = state.notice[name];
      if (el.getAttribute(name) !== saved.written) return; // Respect later application edits.
      if (saved.original === null) el.removeAttribute(name);
      else el.setAttribute(name, saved.original);
    });
    state.notice = null;
  }
  function notice(el, state, pending) {
    var label = (el.getAttribute('alt') || el.getAttribute('title') || '').replace(/\s+/g, ' ').trim();
    if (state.notice && state.notice.title) label = state.label || '';
    state.label = label.slice(0, 48);
    var message = (state.label ? state.label + ' · ' : '') +
      (pending ? '이미지 로딩 확인 중' : '이미지를 불러오지 못했습니다');
    if (!state.notice) state.notice = {};
    ['title', 'aria-label'].forEach(function (name) {
      var old = state.notice[name];
      if (old && el.getAttribute(name) !== old.written) return;
      if (!old) old = state.notice[name] = { original: el.getAttribute(name) };
      old.written = message;
      el.setAttribute(name, message);
    });
    // Retain native alt, styles, width/height and intrinsic box; no overlay or extra DOM.
  }
  function exposed(el, margin) {
    if (!el.isConnected || !el.getClientRects().length) return false;
    var rect = el.getBoundingClientRect();
    var left = -margin, right = window.innerWidth + margin;
    var top = -margin, bottom = window.innerHeight + margin;
    if (rect.width <= 0 || rect.height <= 0) return false;
    for (var node = el; node && node.nodeType === 1; node = node.parentElement) {
      var css = window.getComputedStyle(node);
      if (node.hidden || css.display === 'none' || css.visibility === 'hidden' ||
          css.visibility === 'collapse' || css.contentVisibility === 'hidden' ||
          node.getAttribute('aria-hidden') === 'true') return false;
      if (node.matches('.lightbox, .floorplan-overlay') &&
          !node.classList.contains('open') && !node.classList.contains('active')) return false;
      if (node.matches('.main-hero-slide, .fac-slide, .resv-slide') &&
          !node.classList.contains('active')) return false;
      // A video-only fallback is intentionally hidden, unlike opacity:0 scroll fades.
      if (node.id === 'heroSlides' && Number(css.opacity) === 0) return false;
      if (node !== el) {
        var clip = node.getBoundingClientRect();
        if (/^(hidden|clip|scroll|auto)$/.test(css.overflowX)) {
          left = Math.max(left, clip.left); right = Math.min(right, clip.right);
        }
        if (/^(hidden|clip|scroll|auto)$/.test(css.overflowY)) {
          top = Math.max(top, clip.top); bottom = Math.min(bottom, clip.bottom);
        }
      }
    }
    return rect.right > left && rect.left < right && rect.bottom > top && rect.top < bottom;
  }
  function invalidate(img, state) {
    if (!state) return;
    clearTimeout(state.timer); clearTimeout(state.deadline);
    restore(img, state);
    images.delete(img);
  }
  function imageState(img) {
    var now = source(img), state = images.get(img);
    if (!now || !state || state.key !== now.key) {
      invalidate(img, state);
      if (!now) return null;
      state = { key: now.key, url: now.url, src: now.src, set: now.set,
        phase: 'idle', attempts: 0, timer: 0, deadline: 0, notice: null };
      images.set(img, state);
    }
    return state;
  }
  function success(url) {
    var item = record(url);
    if (!item) return;
    if (item.status === 'unknown') item.status = 'healthy';
    else if (item.status === 'failed' || item.status === 'final' || item.status === 'pending') {
      item.status = 'healthy'; // A native load does not authorize CSS repainting.
    }
  }
  function failure(url) {
    var item = record(url);
    if (item && item.status !== 'probing' && item.status !== 'queued' && !item.attempts) {
      item.status = 'failed'; item.failedAt = Date.now();
    }
  }
  function imageLoaded(img) {
    var state = imageState(img);
    if (!state || !current(img, state) || !img.complete || img.naturalWidth <= 0) return;
    clearTimeout(state.timer); clearTimeout(state.deadline);
    state.timer = state.deadline = 0; state.phase = 'healthy';
    restore(img, state); success(state.url); schedule();
  }
  function imageFailed(img) {
    var state = imageState(img);
    if (!state || !state.url || !img.complete || img.naturalWidth !== 0) return;
    if (state.phase === 'healthy') state.phase = 'idle';
    if (state.phase === 'idle') {
      state.phase = 'failed'; state.failedAt = Date.now(); failure(state.url);
    } else if (state.phase === 'retrying' || state.phase === 'pending') {
      clearTimeout(state.deadline); state.deadline = 0; state.phase = 'final';
    }
    schedule();
  }
  function inspectImage(img) {
    var state = imageState(img);
    if (!state) return;
    if (img.complete && img.naturalWidth > 0) {
      if (state.phase !== 'healthy') imageLoaded(img);
      return;
    }
    if (state.phase === 'idle' && img.complete && img.naturalWidth === 0) imageFailed(img);
    if (!exposed(img, 0)) return; // Never retry hidden, clipped or unexposed slides/popups.
    if (state.phase === 'final') { notice(img, state, false); return; }
    if (state.phase === 'pending') { notice(img, state, true); return; }
    if (state.phase !== 'failed' || state.timer || state.attempts) return;
    state.timer = window.setTimeout(function () {
      state.timer = 0;
      if (!current(img, state) || state.phase !== 'failed' || !exposed(img, 0)) return;
      if (img.complete && img.naturalWidth > 0) { imageLoaded(img); return; }
      if (!img.complete) return; // Never cancel an already-pending normal download.
      state.attempts = 1; state.phase = 'retrying';
      // Reassign exactly the existing author attribute; never remove src/srcset or alter sizes.
      if (state.set.trim()) img.setAttribute('srcset', state.set);
      else img.setAttribute('src', state.src);
      state.deadline = window.setTimeout(function () {
        state.deadline = 0;
        if (!current(img, state) || state.phase !== 'retrying') return;
        if (img.complete && img.naturalWidth > 0) { imageLoaded(img); return; }
        // complete + zero width is actual completed failure, not merely a slow response.
        state.phase = img.complete && img.naturalWidth === 0 ? 'final' : 'pending';
        if (exposed(img, 0)) notice(img, state, state.phase === 'pending');
      }, DEADLINE);
    }, Math.max(0, RETRY_DELAY - (Date.now() - state.failedAt)));
  }
  function background(el) {
    var css = window.getComputedStyle(el).backgroundImage;
    // Single actual computed URL, optionally with gradients; do not touch multi-URL/image-set.
    var matches = css.match(/url\((?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|[^)]*)\)/g);
    if (!matches || matches.length !== 1 || /image-set\(/i.test(css)) return null;
    var value = matches[0].slice(4, -1).trim();
    if (value[0] === '"' || value[0] === "'") value = value.slice(1, -1);
    if (value.indexOf('\\') !== -1) return null; // Conservative CSS escape handling.
    var url = absolute(value);
    return url ? { url: url, css: css } : null;
  }
  function repaint(el, state, actual) {
    var hadStyle = el.hasAttribute('style');
    var value = el.style.getPropertyValue('background-image');
    var priority = el.style.getPropertyPriority('background-image');
    try {
      el.style.setProperty('background-image', 'none', 'important');
      void window.getComputedStyle(el).backgroundImage;
      el.style.setProperty('background-image', actual.css, 'important');
      void window.getComputedStyle(el).backgroundImage;
    } finally {
      if (value) el.style.setProperty('background-image', value, priority);
      else el.style.removeProperty('background-image');
      if (!hadStyle && !el.style.length) el.removeAttribute('style');
      ownStyles.set(el, el.getAttribute('style'));
    }
    state.repainted = true; restore(el, state);
  }
  function inspectBackground(el) {
    var state = backgrounds.get(el), actual = background(el);
    if (!actual || (state && state.url !== actual.url)) {
      if (state) restore(el, state);
      backgrounds.delete(el); state = null;
    }
    if (!actual) return;
    if (!state) { state = { url: actual.url, repainted: false, notice: null }; backgrounds.set(el, state); }
    if (!exposed(el, 160)) return;
    var item = record(actual.url);
    if (!item) return;
    if (item.status === 'recovered' && !state.repainted) { repaint(el, state, actual); return; }
    if (item.status === 'healthy') { restore(el, state); return; }
    if (item.status === 'final') { notice(el, state, false); return; }
    if (item.status === 'pending') { notice(el, state, true); return; }
    // CSS exposes no native load/error event. Only verified errors authorize a probe.
    // Unknown/normal URLs therefore generate ZERO additional image requests.
    if (item.status === 'failed' && !item.attempts) {
      item.status = 'queued'; queue.push({ item: item, element: el });
    }
  }
  function drain() {
    if (!queue.length || active >= 2) return;
    var count = queue.length;
    while (count-- > 0 && queue.length && active < 2) {
      var job = queue.shift(), item = job.item, actual = background(job.element);
      if (item.status !== 'queued') continue;
      if (!actual || actual.url !== item.url || !exposed(job.element, 160)) {
        item.status = 'failed'; continue;
      }
      var delay = RETRY_DELAY - (Date.now() - item.failedAt);
      if (delay > 0) {
        queue.push(job);
        if (!item.wake) item.wake = window.setTimeout(function () { schedule(); }, delay);
        continue;
      }
      probe(item);
    }
  }
  function probe(item) {
    item.attempts = 1; item.status = 'probing'; active++;
    var probeImage = new Image(), settled = false, released = false;
    function release() {
      if (released) return;
      released = true; active--;
      probeImage.onload = probeImage.onerror = null;
      schedule();
    }
    function finish(status, ended) {
      if (released) return;
      if (!settled || (ended && item.status === 'pending')) {
        settled = true; clearTimeout(timer); item.status = status; schedule();
      }
      // A real late load/error may resolve pending; a timeout never cancels the download.
      if (ended) release();
    }
    probeImage.onload = function () { finish(probeImage.naturalWidth > 0 ? 'recovered' : 'final', true); };
    probeImage.onerror = function () { finish('final', true); };
    var timer = window.setTimeout(function () { finish('pending', false); }, DEADLINE);
    // Keep a timed-out request in its slot until it ends: never >2 active probes or abort loops.
    probeImage.src = item.url;
  }
  function resourceErrors(entries) {
    entries.forEach(function (entry) {
      // No TAO / cached / responseStatus:0 is ambiguous, NOT failure evidence.
      if (entry.initiatorType === 'css' && Number(entry.responseStatus) >= 400) failure(absolute(entry.name));
    });
  }
  function scan() {
    lastScan = Date.now();
    document.querySelectorAll('img').forEach(inspectImage);
    document.querySelectorAll('div').forEach(inspectBackground);
    drain();
  }
  function schedule() {
    if (!running || scheduled) return;
    scheduled = true;
    window.setTimeout(function () {
      window.requestAnimationFrame(function () { scheduled = false; scan(); });
    }, Math.max(0, THROTTLE - (Date.now() - lastScan)));
  }
  document.addEventListener('error', function (event) {
    if (event.target && event.target.tagName === 'IMG') imageFailed(event.target);
  }, true);
  document.addEventListener('load', function (event) {
    if (event.target && event.target.tagName === 'IMG') imageLoaded(event.target);
  }, true);
  function boot() {
    if (running) return;
    running = true;
    if (window.performance && performance.getEntriesByType) resourceErrors(performance.getEntriesByType('resource'));
    if (window.PerformanceObserver) {
      try {
        new PerformanceObserver(function (list) { resourceErrors(list.getEntries()); schedule(); })
          .observe({ type: 'resource', buffered: true });
      } catch (_) { /* Unsupported timing API: native image events still work. */ }
    }
    if (window.MutationObserver) {
      observer = new MutationObserver(function (mutations) {
        var changed = false, own = new Set();
        mutations.forEach(function (mutation) {
          var target = mutation.target;
          if (mutation.type === 'attributes' && mutation.attributeName === 'style' &&
              ownStyles.has(target) && ownStyles.get(target) === target.getAttribute('style')) {
            own.add(target); return;
          }
          if (mutation.type === 'attributes' && target.tagName === 'IMG' &&
              /^(src|srcset|sizes|data-src)$/.test(mutation.attributeName)) {
            // Also invalidate A -> removed/B -> A within one observer delivery.
            // Our exact same-value retry has oldValue === current value and is not reset.
            if (mutation.oldValue !== target.getAttribute(mutation.attributeName)) {
              invalidate(target, images.get(target));
            }
            imageState(target);
          }
          changed = true;
        });
        own.forEach(function (el) { ownStyles.delete(el); });
        if (changed) schedule();
      });
      observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true,
        attributeOldValue: true, attributeFilter:
          ['src', 'srcset', 'sizes', 'data-src', 'media', 'type', 'style', 'hidden', 'class', 'aria-hidden'] });
    }
    ['scroll', 'resize', 'pageshow'].forEach(function (name) {
      window.addEventListener(name, schedule, { passive: true });
    });
    // One bounded follow-up catches transformed slider positions after transitions, not polling.
    document.addEventListener('transitionend', schedule, true);
    schedule();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
}());
