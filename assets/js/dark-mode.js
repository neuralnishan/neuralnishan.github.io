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
    // Update icon + label inside the button when present
    var icon = btn.querySelector('.toggle-icon');
    var label = btn.querySelector('.toggle-label');
    var live = document.getElementById('theme-live-region');
    if (icon) {
      // Use Font Awesome classes: sun for light indicator, moon for dark indicator
      // We show the CURRENT mode (as requested) so class reflects current mode.
      icon.className = isDark ? 'fa fa-sun toggle-icon' : 'fa fa-moon toggle-icon';
      icon.setAttribute('aria-hidden', 'true');
    }
    if (label) {
      // Show current mode rather than the action
      label.textContent = isDark ? 'Dark Mode' : 'Light Mode';
    }
    if (live) {
      // Announce to screen readers when the theme changes
      live.textContent = isDark ? 'Dark mode activated' : 'Light mode activated';
      // Clear the message shortly after so repeated toggles re-announce
      setTimeout(function () { live.textContent = ''; }, 1200);
    }
    btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
    btn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  function applyThemeFromStorage(btn) {
    var stored = null;
    try { stored = localStorage.getItem(storageKey); } catch (e) { stored = null; }
    // If the user has a stored preference, apply it. Otherwise leave the server
    // rendered default alone (we default to dark server-side).
    if (stored === 'dark') {
      document.documentElement.classList.add(darkClass);
      setButtonState(btn, true);
    } else if (stored === 'light') {
      document.documentElement.classList.remove(darkClass);
      setButtonState(btn, false);
    } else {
      // No stored preference: respect server default (which is dark by default now).
      var currentlyDark = document.documentElement.classList.contains(darkClass);
      setButtonState(btn, currentlyDark);
    }
    // Update meta theme-color to match current class
    var themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      var isDarkNow = document.documentElement.classList.contains(darkClass);
      themeMeta.setAttribute('content', isDarkNow ? '#000000' : '#ffffff');
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('dark-toggle-float');
    if (!btn) return;
    applyThemeFromStorage(btn);
    btn.addEventListener('click', function () {
      // Add a helper class to enable transitions during the swap
      document.documentElement.classList.add('theme-transition');
      // toggle dark
      var isDark = document.documentElement.classList.toggle(darkClass);
      try { localStorage.setItem(storageKey, isDark ? 'dark' : 'light'); } catch (e) {}
      setButtonState(btn, isDark);
      // Track theme toggle (if analytics consent granted)
      try {
        if (window.analytics && typeof window.analytics.trackEvent === 'function') {
          window.analytics.trackEvent('toggle_theme', { mode: isDark ? 'dark' : 'light' });
        }
      } catch (e) {}
      var themeMeta = document.querySelector('meta[name="theme-color"]');
      if (themeMeta) themeMeta.setAttribute('content', isDark ? '#000000' : '#ffffff');
      // remove transition helper after a short delay
      window.setTimeout(function () {
        document.documentElement.classList.remove('theme-transition');
      }, 320);
    });
  });
})();
