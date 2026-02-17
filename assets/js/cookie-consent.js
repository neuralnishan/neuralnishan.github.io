// cookie-consent.js
// GDPR-friendly consent banner and loader for analytics
(function(){
  if (window.__cookieConsentIncluded) return;
  window.__cookieConsentIncluded = true;

  // find banner elements inserted via footer include
  var KEY = 'analytics-consent';
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');

  function hideBanner(){ if(banner) banner.style.display='none'; }

  function loadAdvancedAnalytics(){
    if(window._advancedAnalyticsLoaded) return;
    var s = document.createElement('script');
    s.src = (window.base_path || '') + '/assets/js/advanced-analytics.js';
    s.async = true;
    s.onload = function(){ window._advancedAnalyticsLoaded = true; };
    document.head.appendChild(s);
  }

  function setConsent(value){
    try{ localStorage.setItem(KEY, value); } catch(e){}
    // initialize or update GA consent
    var meta = document.querySelector('meta[name="ga-id"]');
    var gaId = meta ? meta.getAttribute('content') : null;
    if(value === 'granted'){
      // Prefer initGtag (defined in analytics include). If absent, load gtag directly.
      if(typeof window.initGtag === 'function'){
        try{ window.initGtag(gaId); } catch(e){}
        try{ gtag('consent','update', { 'analytics_storage': 'granted' }); } catch(e){}
      } else if(gaId && !window.gtagLoaded){
        // Fallback: load gtag.js and config
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);} window.gtag = gtag;
        gtag('consent','default', {'analytics_storage':'denied'});
        var s = document.createElement('script'); s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + gaId;
        document.head.appendChild(s);
        s.onload = function(){ try{ gtag('consent','update', { 'analytics_storage': 'granted' }); gtag('config', gaId, { 'anonymize_ip': true }); } catch(e){} };
      }
      loadAdvancedAnalytics();
    } else {
      // denied
      if(typeof window.gtag === 'function'){
        try{ gtag('consent','update', { 'analytics_storage': 'denied' }); } catch(e){}
      }
    }
    hideBanner();
  }

  function init(){
    // Respect Do Not Track
    if(navigator.doNotTrack === '1' || navigator.msDoNotTrack === '1'){
      try{ localStorage.setItem(KEY, 'denied'); } catch(e){}
      hideBanner();
      return;
    }

    var saved = null;
    try{ saved = localStorage.getItem(KEY); } catch(e){}
    if(saved === 'granted'){
      if(window.gtag){ try{ gtag('consent','update', { 'analytics_storage': 'granted' }); } catch(e){} }
      loadAdvancedAnalytics(); hideBanner(); return;
    }
    if(saved === 'denied'){ if(window.gtag){ try{ gtag('consent','update', { 'analytics_storage': 'denied' }); } catch(e){} } hideBanner(); return; }

    // show banner
    if(banner) banner.style.display='block';
    acceptBtn && acceptBtn.addEventListener('click', function(){ setConsent('granted'); });
    rejectBtn && rejectBtn.addEventListener('click', function(){ setConsent('denied'); });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
