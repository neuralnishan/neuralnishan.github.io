/* ===================================================================
   ACCESSIBILITY CONTROLS - Text Size and Visual Modes
   - Font size adjustment (normal, large, extra-large)
   - Dyslexia-friendly mode
   - Persistent localStorage settings
   =================================================================== */

(function () {
  const STORAGE_KEY_TEXT_SIZE = 'text-size';
  const STORAGE_KEY_TEXT_MODE = 'text-mode';
  const STORAGE_KEY_HIGH_CONTRAST = 'a11y-high-contrast';
  const STORAGE_KEY_GRAYSCALE = 'a11y-grayscale';
  const STORAGE_KEY_REDUCED_MOTION = 'a11y-reduced-motion';
  const STORAGE_KEY_READABLE_FONT = 'a11y-readable-font';
  const STORAGE_KEY_COLORBLIND_PROTANOPIA = 'a11y-colorblind-protanopia';
  const STORAGE_KEY_COLORBLIND_DEUTERANOPIA = 'a11y-colorblind-deuteranopia';
  const STORAGE_KEY_COLORBLIND_TRITANOPIA = 'a11y-colorblind-tritanopia';
  const STORAGE_KEY_LETTER_SPACING = 'a11y-letter-spacing';
  const STORAGE_KEY_BOLD_TEXT = 'a11y-bold-text';

  const DEFAULT_TEXT_SIZE = 'normal';
  const DEFAULT_TEXT_MODE = 'default';

  /**
   * Initialize accessibility controls on page load
   */
  function initAccessibilityControls() {
    createAccessibilityPanel();
    restoreSettings();
    attachEventListeners();
  }

  /**
   * Create the accessibility controls panel
   */
  function createAccessibilityPanel() {
    const panel = document.createElement('div');
    panel.id = 'accessibility-controls';
    panel.className = 'accessibility-controls';
    panel.setAttribute('aria-label', 'Accessibility Controls');

    panel.innerHTML = `
      <details>
        <summary class="accessibility-toggle" aria-expanded="false" aria-controls="accessibility-menu">
          <span class="accessibility-icon">♿</span>
          <span class="accessibility-label">Accessibility</span>
        </summary>
        <div id="accessibility-menu" class="accessibility-menu">
          <div class="accessibility-section">
            <h3>Text Size</h3>
            <div class="button-group">
              <button class="text-size-btn" data-size="normal" type="button" aria-pressed="true" title="Normal text size">
                Normal
              </button>
              <button class="text-size-btn" data-size="large" type="button" aria-pressed="false" title="Large text size">
                Large (A+)
              </button>
              <button class="text-size-btn" data-size="extra-large" type="button" aria-pressed="false" title="Extra large text size">
                Extra Large (A++)
              </button>
            </div>
          </div>

          <div class="accessibility-section">
            <h3>Display Mode</h3>
            <div class="button-group">
              <button class="text-mode-btn" data-mode="default" type="button" aria-pressed="true" title="Default display mode">
                Default
              </button>
              <button class="text-mode-btn" data-mode="dyslexia-friendly" type="button" aria-pressed="false" title="Dyslexia-friendly mode with OpenDyslexic font">
                Dyslexia-Friendly
              </button>
            </div>
          </div>

          <div class="accessibility-section">
            <h3>Enterprise Modes</h3>
            <div class="button-group">
              <button class="mode-btn" data-pref="high-contrast" type="button" aria-pressed="false" title="High contrast mode for low vision">
                High Contrast
              </button>
              <button class="mode-btn" data-pref="grayscale" type="button" aria-pressed="false" title="Grayscale mode">
                Grayscale
              </button>
              <button class="mode-btn" data-pref="reduced-motion" type="button" aria-pressed="false" title="Reduce motion/animations">
                Reduced Motion
              </button>
              <button class="mode-btn" data-pref="readable-font" type="button" aria-pressed="false" title="Readable font for enterprise legibility">
                Readable Font
              </button>
            </div>
          </div>

          <div class="accessibility-section">
            <h3>Color Blind Modes</h3>
            <div class="button-group">
              <button class="mode-btn" data-pref="colorblind-protanopia" type="button" aria-pressed="false" title="Red-blind color vision simulation">
                Protanopia
              </button>
              <button class="mode-btn" data-pref="colorblind-deuteranopia" type="button" aria-pressed="false" title="Green-blind color vision simulation">
                Deuteranopia
              </button>
              <button class="mode-btn" data-pref="colorblind-tritanopia" type="button" aria-pressed="false" title="Blue-yellow color blindness simulation">
                Tritanopia
              </button>
            </div>
          </div>

          <div class="accessibility-section">
            <h3>Text Enhancement</h3>
            <div class="button-group">
              <button class="mode-btn" data-pref="letter-spacing" type="button" aria-pressed="false" title="Increase letter spacing for better readability">
                Letter Spacing
              </button>
              <button class="mode-btn" data-pref="bold-text" type="button" aria-pressed="false" title="Increase text weight for better visibility">
                Bold Text
              </button>
            </div>
          </div>

          <div class="accessibility-section">
            <p class="accessibility-info">
              <strong>Tip:</strong> Use your browser's built-in zoom (Ctrl/Cmd + Plus/Minus) for additional text size control.
            </p>
          </div>

          <div class="accessibility-section">
            <button id="reset-accessibility" type="button" class="reset-btn" title="Reset all accessibility settings to defaults">
              Reset All Settings
            </button>
          </div>
        </div>
      </details>
    `;

    document.body.insertBefore(panel, document.body.firstChild);
  }

  /**
   * Restore saved accessibility settings from localStorage
   */
  function restoreSettings() {
    try {
      const savedTextSize = localStorage.getItem(STORAGE_KEY_TEXT_SIZE) || DEFAULT_TEXT_SIZE;
      const savedTextMode = localStorage.getItem(STORAGE_KEY_TEXT_MODE) || DEFAULT_TEXT_MODE;

      const highContrast = localStorage.getItem(STORAGE_KEY_HIGH_CONTRAST) === 'true';
      const grayscale = localStorage.getItem(STORAGE_KEY_GRAYSCALE) === 'true';
      const reducedMotion = localStorage.getItem(STORAGE_KEY_REDUCED_MOTION) === 'true';
      const readableFont = localStorage.getItem(STORAGE_KEY_READABLE_FONT) === 'true';
      const protanopia = localStorage.getItem(STORAGE_KEY_COLORBLIND_PROTANOPIA) === 'true';
      const deuteranopia = localStorage.getItem(STORAGE_KEY_COLORBLIND_DEUTERANOPIA) === 'true';
      const tritanopia = localStorage.getItem(STORAGE_KEY_COLORBLIND_TRITANOPIA) === 'true';
      const letterSpacing = localStorage.getItem(STORAGE_KEY_LETTER_SPACING) === 'true';
      const boldText = localStorage.getItem(STORAGE_KEY_BOLD_TEXT) === 'true';

      applyTextSize(savedTextSize);
      applyTextMode(savedTextMode);
      applyHighContrast(highContrast);
      applyGrayscale(grayscale);
      applyReducedMotion(reducedMotion);
      applyReadableFont(readableFont);
      if (protanopia) applyColorblindMode('protanopia', true);
      if (deuteranopia) applyColorblindMode('deuteranopia', true);
      if (tritanopia) applyColorblindMode('tritanopia', true);
      applyLetterSpacing(letterSpacing);
      applyBoldText(boldText);

      updateButtonStates(savedTextSize, savedTextMode, { highContrast, grayscale, reducedMotion, readableFont, protanopia, deuteranopia, tritanopia, letterSpacing, boldText });
    } catch (e) {
      console.warn('Could not restore accessibility settings:', e);
    }
  }

  /**
   * Apply text size setting to document
   */
  function applyTextSize(size) {
    const html = document.documentElement;

    // Remove all text size attributes
    html.removeAttribute('data-text-size');

    // Apply new size if not normal
    if (size !== DEFAULT_TEXT_SIZE) {
      html.setAttribute('data-text-size', size);
    }

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY_TEXT_SIZE, size);
    } catch (e) {
      console.warn('Could not save text size setting:', e);
    }

    // Announce change to screen readers
    announceChange(`Text size changed to ${size}`);
  }

  /**
   * Apply text mode (dyslexia-friendly, etc.)
   */
  function applyTextMode(mode) {
    const html = document.documentElement;

    // Remove all text mode attributes
    html.removeAttribute('data-text-mode');

    // Apply new mode if not default
    if (mode !== DEFAULT_TEXT_MODE) {
      html.setAttribute('data-text-mode', mode);
    }

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY_TEXT_MODE, mode);
    } catch (e) {
      console.warn('Could not save text mode setting:', e);
    }

    // Announce change to screen readers
    const modeLabel = mode === 'dyslexia-friendly' ? 'Dyslexia-friendly mode' : 'Default mode';
    announceChange('Display mode changed to ' + modeLabel);
  }

  /**
   * Enterprise-mode toggles
   */
  function applyHighContrast(enabled) {
    const html = document.documentElement;
    try {
      if (enabled) {
        html.classList.add('a11y-high-contrast');
        localStorage.setItem(STORAGE_KEY_HIGH_CONTRAST, 'true');
      } else {
        html.classList.remove('a11y-high-contrast');
        localStorage.removeItem(STORAGE_KEY_HIGH_CONTRAST);
      }
      announceChange(enabled ? 'High contrast enabled' : 'High contrast disabled');
    } catch (e) { console.warn(e); }
  }

  function applyGrayscale(enabled) {
    const html = document.documentElement;
    try {
      if (enabled) {
        html.classList.add('a11y-grayscale');
        localStorage.setItem(STORAGE_KEY_GRAYSCALE, 'true');
      } else {
        html.classList.remove('a11y-grayscale');
        localStorage.removeItem(STORAGE_KEY_GRAYSCALE);
      }
      announceChange(enabled ? 'Grayscale mode enabled' : 'Grayscale mode disabled');
    } catch (e) { console.warn(e); }
  }

  function applyReducedMotion(enabled) {
    const html = document.documentElement;
    try {
      if (enabled) {
        html.classList.add('a11y-reduced-motion');
        localStorage.setItem(STORAGE_KEY_REDUCED_MOTION, 'true');
      } else {
        html.classList.remove('a11y-reduced-motion');
        localStorage.removeItem(STORAGE_KEY_REDUCED_MOTION);
      }
      announceChange(enabled ? 'Reduced motion enabled' : 'Reduced motion disabled');
    } catch (e) { console.warn(e); }
  }

  function applyReadableFont(enabled) {
    const html = document.documentElement;
    try {
      if (enabled) {
        html.classList.add('a11y-readable-font');
        localStorage.setItem(STORAGE_KEY_READABLE_FONT, 'true');
      } else {
        html.classList.remove('a11y-readable-font');
        localStorage.removeItem(STORAGE_KEY_READABLE_FONT);
      }
      announceChange(enabled ? 'Readable font enabled' : 'Readable font disabled');
    } catch (e) { console.warn(e); }
  }

  function applyColorblindMode(type, enabled) {
    const html = document.documentElement;
    const classMap = {
      'protanopia': 'a11y-colorblind-protanopia',
      'deuteranopia': 'a11y-colorblind-deuteranopia',
      'tritanopia': 'a11y-colorblind-tritanopia'
    };
    const storageMap = {
      'protanopia': STORAGE_KEY_COLORBLIND_PROTANOPIA,
      'deuteranopia': STORAGE_KEY_COLORBLIND_DEUTERANOPIA,
      'tritanopia': STORAGE_KEY_COLORBLIND_TRITANOPIA
    };
    const className = classMap[type];
    const storageKey = storageMap[type];
    try {
      if (enabled) {
        // Remove other colorblind modes first
        Object.values(classMap).forEach(cls => html.classList.remove(cls));
        html.classList.add(className);
        Object.values(storageMap).forEach(key => localStorage.removeItem(key));
        localStorage.setItem(storageKey, 'true');
      } else {
        html.classList.remove(className);
        localStorage.removeItem(storageKey);
      }
      const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
      announceChange(enabled ? `${typeLabel} mode enabled` : `${typeLabel} mode disabled`);
    } catch (e) { console.warn(e); }
  }

  function applyLetterSpacing(enabled) {
    const html = document.documentElement;
    try {
      if (enabled) {
        html.classList.add('a11y-letter-spacing');
        localStorage.setItem(STORAGE_KEY_LETTER_SPACING, 'true');
      } else {
        html.classList.remove('a11y-letter-spacing');
        localStorage.removeItem(STORAGE_KEY_LETTER_SPACING);
      }
      announceChange(enabled ? 'Letter spacing enabled' : 'Letter spacing disabled');
    } catch (e) { console.warn(e); }
  }

  function applyBoldText(enabled) {
    const html = document.documentElement;
    try {
      if (enabled) {
        html.classList.add('a11y-bold-text');
        localStorage.setItem(STORAGE_KEY_BOLD_TEXT, 'true');
      } else {
        html.classList.remove('a11y-bold-text');
        localStorage.removeItem(STORAGE_KEY_BOLD_TEXT);
      }
      announceChange(enabled ? 'Bold text enabled' : 'Bold text disabled');
    } catch (e) { console.warn(e); }
  }

  /**
   * Update button pressed states in the UI
   */
  function updateButtonStates(textSize, textMode) {
    // Update text size buttons
    document.querySelectorAll('.text-size-btn').forEach(btn => {
      const isPressed = btn.getAttribute('data-size') === textSize;
      btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    });

    // Update text mode buttons
    document.querySelectorAll('.text-mode-btn').forEach(btn => {
      const isPressed = btn.getAttribute('data-mode') === textMode;
      btn.setAttribute('aria-pressed', isPressed ? 'true' : 'false');
    });
    // Update enterprise mode buttons (if provided via saved flags)
    document.querySelectorAll('.mode-btn').forEach(btn => {
      const pref = btn.getAttribute('data-pref');
      let pressed = 'false';
      try {
        if (pref === 'high-contrast') pressed = (localStorage.getItem(STORAGE_KEY_HIGH_CONTRAST) === 'true') ? 'true' : 'false';
        if (pref === 'grayscale') pressed = (localStorage.getItem(STORAGE_KEY_GRAYSCALE) === 'true') ? 'true' : 'false';
        if (pref === 'reduced-motion') pressed = (localStorage.getItem(STORAGE_KEY_REDUCED_MOTION) === 'true') ? 'true' : 'false';
        if (pref === 'readable-font') pressed = (localStorage.getItem(STORAGE_KEY_READABLE_FONT) === 'true') ? 'true' : 'false';
        if (pref === 'colorblind-protanopia') pressed = (localStorage.getItem(STORAGE_KEY_COLORBLIND_PROTANOPIA) === 'true') ? 'true' : 'false';
        if (pref === 'colorblind-deuteranopia') pressed = (localStorage.getItem(STORAGE_KEY_COLORBLIND_DEUTERANOPIA) === 'true') ? 'true' : 'false';
        if (pref === 'colorblind-tritanopia') pressed = (localStorage.getItem(STORAGE_KEY_COLORBLIND_TRITANOPIA) === 'true') ? 'true' : 'false';
        if (pref === 'letter-spacing') pressed = (localStorage.getItem(STORAGE_KEY_LETTER_SPACING) === 'true') ? 'true' : 'false';
        if (pref === 'bold-text') pressed = (localStorage.getItem(STORAGE_KEY_BOLD_TEXT) === 'true') ? 'true' : 'false';
      } catch (e) {
        pressed = 'false';
      }
      btn.setAttribute('aria-pressed', pressed);
    });
  }

  /**
   * Announce changes to screen reader users
   */
  function announceChange(message) {
    const announcer = document.getElementById('accessibility-live-region') || createAnnouncer();
    announcer.textContent = message;

    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1500);
  }

  /**
   * Create live region for screen reader announcements
   */
  function createAnnouncer() {
    const region = document.createElement('div');
    region.id = 'accessibility-live-region';
    region.className = 'sr-only';
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    document.body.appendChild(region);
    return region;
  }

  /**
   * Attach event listeners to accessibility controls
   */
  function attachEventListeners() {
    // Text size buttons
    document.querySelectorAll('.text-size-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const size = this.getAttribute('data-size');
        const currentSize = localStorage.getItem(STORAGE_KEY_TEXT_SIZE) || DEFAULT_TEXT_SIZE;
        const currentMode = localStorage.getItem(STORAGE_KEY_TEXT_MODE) || DEFAULT_TEXT_MODE;

        applyTextSize(size);
        updateButtonStates(size, currentMode);
      });
    });

    // Text mode buttons
    document.querySelectorAll('.text-mode-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const mode = this.getAttribute('data-mode');
        const currentSize = localStorage.getItem(STORAGE_KEY_TEXT_SIZE) || DEFAULT_TEXT_SIZE;
        const currentMode = localStorage.getItem(STORAGE_KEY_TEXT_MODE) || DEFAULT_TEXT_MODE;

        applyTextMode(mode);
        updateButtonStates(currentSize, mode);
      });
    });

    // Reset button
    const resetBtn = document.getElementById('reset-accessibility');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        applyTextSize(DEFAULT_TEXT_SIZE);
        applyTextMode(DEFAULT_TEXT_MODE);
        applyHighContrast(false);
        applyGrayscale(false);
        applyReducedMotion(false);
        applyReadableFont(false);
        applyColorblindMode('protanopia', false);
        applyColorblindMode('deuteranopia', false);
        applyColorblindMode('tritanopia', false);
        applyLetterSpacing(false);
        applyBoldText(false);
        updateButtonStates(DEFAULT_TEXT_SIZE, DEFAULT_TEXT_MODE);
        announceChange('All accessibility settings have been reset to default');
      });
    }

    // Enterprise mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const pref = this.getAttribute('data-pref');
        // toggle stored flag
        try {
          if (pref === 'high-contrast') {
            const current = localStorage.getItem(STORAGE_KEY_HIGH_CONTRAST) === 'true';
            applyHighContrast(!current);
          }
          if (pref === 'grayscale') {
            const current = localStorage.getItem(STORAGE_KEY_GRAYSCALE) === 'true';
            applyGrayscale(!current);
          }
          if (pref === 'reduced-motion') {
            const current = localStorage.getItem(STORAGE_KEY_REDUCED_MOTION) === 'true';
            applyReducedMotion(!current);
          }
          if (pref === 'readable-font') {
            const current = localStorage.getItem(STORAGE_KEY_READABLE_FONT) === 'true';
            applyReadableFont(!current);
          }
          if (pref === 'colorblind-protanopia') {
            const current = localStorage.getItem(STORAGE_KEY_COLORBLIND_PROTANOPIA) === 'true';
            applyColorblindMode('protanopia', !current);
          }
          if (pref === 'colorblind-deuteranopia') {
            const current = localStorage.getItem(STORAGE_KEY_COLORBLIND_DEUTERANOPIA) === 'true';
            applyColorblindMode('deuteranopia', !current);
          }
          if (pref === 'colorblind-tritanopia') {
            const current = localStorage.getItem(STORAGE_KEY_COLORBLIND_TRITANOPIA) === 'true';
            applyColorblindMode('tritanopia', !current);
          }
          if (pref === 'letter-spacing') {
            const current = localStorage.getItem(STORAGE_KEY_LETTER_SPACING) === 'true';
            applyLetterSpacing(!current);
          }
          if (pref === 'bold-text') {
            const current = localStorage.getItem(STORAGE_KEY_BOLD_TEXT) === 'true';
            applyBoldText(!current);
          }
        } catch (e) {
          console.warn('Could not toggle mode', e);
        }

        // refresh pressed states
        const currentSize = localStorage.getItem(STORAGE_KEY_TEXT_SIZE) || DEFAULT_TEXT_SIZE;
        const currentMode = localStorage.getItem(STORAGE_KEY_TEXT_MODE) || DEFAULT_TEXT_MODE;
        updateButtonStates(currentSize, currentMode);
      });
    });

    // Handle details element for better accessibility
    const detailsElement = document.querySelector('.accessibility-controls details');
    if (detailsElement) {
      detailsElement.addEventListener('toggle', function () {
        const summary = this.querySelector('summary');
        if (summary) {
          summary.setAttribute('aria-expanded', this.open);
        }
      });
    }
  }

  /**
   * Initialize when DOM is ready
   */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAccessibilityControls);
  } else {
    initAccessibilityControls();
  }
})();
