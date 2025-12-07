// cookie-consent.js
// Injects a small banner to request analytics consent and controls analytics.init
(function(){
  if (window.__cookieConsentIncluded) return;
  window.__cookieConsentIncluded = true;

  var css = '\n  #cookie-consent-banner{position:fixed;left:20px;right:20px;bottom:20px;z-index:10000;display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:12px;background:rgba(0,0,0,0.8);color:#fff;box-shadow:0 8px 24px rgba(0,0,0,0.4);font-size:14px}\n  #cookie-consent-banner button{background:transparent;border:0;padding:8px 12px;border-radius:8px;cursor:pointer;font-weight:600}\n  #cookie-consent-banner .accept{background:linear-gradient(90deg,#00ff00,#00ffaa);color:#001;box-shadow:0 6px 18px rgba(0,255,0,0.08);border:none}\n  #cookie-consent-banner .decline{background:transparent;border:1px solid rgba(255,255,255,0.12);color:#fff}\n  @media(max-width:480px){#cookie-consent-banner{left:12px;right:12px;bottom:12px;flex-direction:column;align-items:stretch}}\n';
  var style = document.createElement('style'); style.textContent = css; document.head.appendChild(style);

  function createBanner(){
    if (localStorage.getItem('analytics_consent')) return; // already set
    var banner = document.createElement('div'); banner.id = 'cookie-consent-banner';
    banner.innerHTML = '<div style="flex:1">This site uses analytics to improve the experience. Do you allow anonymous analytics?</div>' +
      '<div style="display:flex;gap:8px"><button class="decline">Decline</button><button class="accept">Allow analytics</button></div>';
    document.body.appendChild(banner);
    banner.querySelector('.accept').addEventListener('click', function(){
      try { localStorage.setItem('analytics_consent','granted'); } catch(e){}
      // initialize analytics
      if (window.analytics && typeof window.analytics.init === 'function') {
        // attempt to use GA id from Liquid-inserted meta or global var
        var meta = document.querySelector('meta[name="ga-id"]');
        var id = meta ? meta.getAttribute('content') : (window.__GA_MEASUREMENT_ID__ || null);
        window.analytics.init(id);
      }
      // track consent event
      if (window.analytics && typeof window.analytics.trackEvent === 'function') window.analytics.trackEvent('consent', {granted: true});
      banner.remove();
    });
    banner.querySelector('.decline').addEventListener('click', function(){
      try { localStorage.setItem('analytics_consent','denied'); } catch(e){}
      if (window.analytics && typeof window.analytics.trackEvent === 'function') window.analytics.trackEvent('consent', {granted: false});
      banner.remove();
    });
  }

  // Defer creation until DOM ready
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createBanner);
  else createBanner();
})();
