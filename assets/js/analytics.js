// analytics.js
// Small analytics loader + event queue to support deferred loading (consent-driven)
(function(){
  window.analytics = window.analytics || {};
  var queue = [];
  var initialized = false;
  var gaId = (function(){
    try {
      // Pull GA id from a meta tag injected server-side for safety, or fall back to config via Liquid
      var meta = document.querySelector('meta[name="ga-id"]');
      return meta ? meta.getAttribute('content') : null;
    } catch (e) { return null; }
  })();

  function flushQueue() {
    if (!initialized) return;
    while (queue.length) {
      var item = queue.shift();
      if (window.gtag) {
        window.gtag('event', item.name, item.params || {});
      } else if (window.dataLayer) {
        window.dataLayer.push(['event', item.name, item.params || {}]);
      }
    }
  }

  window.analytics.trackEvent = function(name, params) {
    try {
      var consent = localStorage.getItem('analytics_consent');
      if (consent !== 'granted') {
        // do not record analytics if consent not granted
        return;
      }
    } catch (e) {}
    if (initialized && window.gtag) {
      window.gtag('event', name, params || {});
    } else if (initialized && window.dataLayer) {
      window.dataLayer.push(['event', name, params || {}]);
    } else {
      queue.push({name: name, params: params});
    }
  };

  window.analytics.init = function(id) {
    if (initialized) return;
    initialized = true;
    var called = false;
    function tryCalls() {
      if (window.initGtag && (id || gaId)) {
        try { window.initGtag(id || gaId); called = true; } catch (e) {}
      }
      if (window.initGtm && (id || gaId)) {
        try { window.initGtm(id || gaId); called = true; } catch (e) {}
      }
      return called;
    }
    if (!tryCalls()) {
      // retry for a short time until provider include defines init functions
      var attempts = 0;
      var maxAttempts = 12;
      var t = setInterval(function(){
        attempts++;
        if (tryCalls() || attempts > maxAttempts) {
          clearInterval(t);
          // flush queue after a short delay
          setTimeout(flushQueue, 600);
        }
      }, 250);
      return;
    }
    // small delay to allow gtag to be defined
    setTimeout(flushQueue, 600);
  };

  // Auto-init if consent already granted
  try {
    var consent = localStorage.getItem('analytics_consent');
    if (consent === 'granted') {
      // init with gaId — the include sets a Liquid meta tag; fallback to existing global
      // The provider include (google-gtag.html) defines window.initGtag but may appear
      // after this script in the DOM. Retry a few times until initGtag is available.
      (function tryInit(attemptsLeft){
        var id = window.__GA_MEASUREMENT_ID__ || null;
        if (window.initGtag || window.initGtm) {
          window.analytics.init(id);
          return;
        }
        if (attemptsLeft <= 0) return;
        setTimeout(function(){ tryInit(attemptsLeft - 1); }, 150);
      })(10);
    }
  } catch (e) {}

  // Outbound link tracking
  document.addEventListener('click', function(e){
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a || !a.href) return;
    try {
      var url = new URL(a.href, location.href);
      if (url.hostname !== location.hostname) {
        window.analytics.trackEvent('outbound_click', { destination: a.href });
      }
    } catch (err) {}
  }, true);

  // Form submission tracking — catches broad cases; forms can opt-out by data-track="false"
  document.addEventListener('submit', function(e){
    var form = e.target;
    if (!form || form.dataset && form.dataset.track === 'false') return;
    var id = form.id || form.name || form.action || 'anonymous-form';
    window.analytics.trackEvent('form_submit', { form_id: id });
  }, true);

  // Expose a small helper for toggles/events
  window.analytics._flush = flushQueue;
})();
