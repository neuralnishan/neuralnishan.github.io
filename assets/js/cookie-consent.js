// cookie-consent.js
// Strict consent gate: accept required before continuing
(function(){
  if (window.__cookieConsentIncluded) return;
  window.__cookieConsentIncluded = true;

  var KEY = 'analytics_consent';
  var LEGACY_KEY = 'analytics-consent';
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');

  function hasGrantedConsent(){
    try {
      return localStorage.getItem(KEY) === 'granted' || localStorage.getItem(LEGACY_KEY) === 'granted';
    } catch(e) {
      return false;
    }
  }

  function lockSite(){
    if (banner) banner.classList.add('cookie-banner--show');
  }

  function unlockSite(){
    if (banner) banner.classList.remove('cookie-banner--show');
  }

  function loadAdvancedAnalytics(){
    if (window._advancedAnalyticsLoaded) return;
    var s = document.createElement('script');
    s.src = (window.base_path || '') + '/assets/js/advanced-analytics.js';
    s.async = true;
    s.onload = function(){ window._advancedAnalyticsLoaded = true; };
    document.head.appendChild(s);
  }

  function setConsentGranted(){
    try {
      localStorage.setItem(KEY, 'granted');
      localStorage.setItem(LEGACY_KEY, 'granted');

      var meta = document.querySelector('meta[name="ga-id"]');
      var gaId = meta ? meta.getAttribute('content') : null;

      if (typeof window.initGtag === 'function') {
        try { window.initGtag(gaId); } catch(e) {}
        try { gtag('consent', 'update', { 'analytics_storage': 'granted' }); } catch(e) {}
      } else if (gaId && !window.gtagLoaded) {
        window.dataLayer = window.dataLayer || [];
        function gtag(){ window.dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('consent', 'default', { 'analytics_storage': 'denied' });

        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
        document.head.appendChild(s);
        s.onload = function(){
          try {
            gtag('consent', 'update', { 'analytics_storage': 'granted' });
            gtag('config', gaId, { 'anonymize_ip': true });
          } catch(e) {}
        };
      }

      loadAdvancedAnalytics();
    } catch (e) {
      // keep UX usable even if storage/analytics fails
    } finally {
      unlockSite();
    }
  }

  function init(){
    unlockSite();

    if (!banner || !acceptBtn) return;

    if (hasGrantedConsent()) {
      if (window.gtag) {
        try { gtag('consent', 'update', { 'analytics_storage': 'granted' }); } catch(e) {}
      }
      loadAdvancedAnalytics();
      return;
    }

    lockSite();
    acceptBtn.addEventListener('click', setConsentGranted);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
