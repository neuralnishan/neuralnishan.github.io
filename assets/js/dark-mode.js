/* Small dark mode toggler.
   - Adds/removes `html.dark`
   - Persists selection to localStorage
   - Respects `prefers-color-scheme` if no saved preference
*/
(function () {
  var storageKey = 'theme';
  var darkClass = 'dark';

  function setButtonState(btn, isDark) {
    if (!btn) return;
    var icon = btn.querySelector('.toggle-icon');
    var label = btn.querySelector('.toggle-label');
    var live = document.getElementById('theme-live-region');
    if (icon) {
      icon.className = isDark ? 'fa fa-sun toggle-icon' : 'fa fa-moon toggle-icon';
      icon.setAttribute('aria-hidden', 'true');
    }
    if (label) {
      label.textContent = isDark ? 'Dark Mode' : 'Light Mode';
    }
    if (live) {
      live.textContent = isDark ? 'Dark mode activated' : 'Light mode activated';
      setTimeout(function () { live.textContent = ''; }, 1200);
    }
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  function applyThemeFromStorageToButtons(buttons) {
    var stored = null;
    try { stored = localStorage.getItem(storageKey); } catch (e) { stored = null; }
    if (stored === 'dark') {
      document.documentElement.classList.add(darkClass);
    } else if (stored === 'light') {
      document.documentElement.classList.remove(darkClass);
    }
    var currentlyDark = document.documentElement.classList.contains(darkClass);
    // update all buttons passed
    buttons.forEach(function (b) { setButtonState(b, currentlyDark); });
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', currentlyDark ? '#000000' : '#ffffff');
  }

  function toggleThemeAndSync(buttons) {
    document.documentElement.classList.add('theme-transition');
    var isDark = document.documentElement.classList.toggle(darkClass);
    try { localStorage.setItem(storageKey, isDark ? 'dark' : 'light'); } catch (e) {}
    buttons.forEach(function (b) { setButtonState(b, isDark); });
    try {
      if (window.analytics && typeof window.analytics.trackEvent === 'function') {
        window.analytics.trackEvent('toggle_theme', { mode: isDark ? 'dark' : 'light' });
      }
    } catch (e) {}
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) themeMeta.setAttribute('content', isDark ? '#000000' : '#ffffff');
    window.setTimeout(function () { document.documentElement.classList.remove('theme-transition'); }, 320);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var floatBtn = document.getElementById('dark-toggle-float');
    var navBtn = document.getElementById('dark-toggle-nav');
    var allButtons = [];
    if (floatBtn) allButtons.push(floatBtn);
    if (navBtn) allButtons.push(navBtn);
    // Also add any other nav toggles (support multiple)
    var extraNavs = document.querySelectorAll('.theme-toggle-nav');
    extraNavs.forEach(function (b) { if (allButtons.indexOf(b) === -1) allButtons.push(b); });

    if (allButtons.length === 0) return;
    applyThemeFromStorageToButtons(allButtons);

    // Attach click handlers to all toggles
    allButtons.forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.preventDefault();
        toggleThemeAndSync(allButtons);
      });
    });
  });
})();
