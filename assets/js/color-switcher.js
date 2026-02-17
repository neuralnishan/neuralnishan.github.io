/* ===================================================================
   COLOR THEME SWITCHER - Simplified Version
   Handles color theme selection and persistence
   =================================================================== */

(function () {
  const STORAGE_KEY = 'color-theme';
  const DEFAULT_THEME = 'default';

  // Color theme definitions
  const colorThemes = {
    default: {
      primary: '#52adc8',
      secondary: '#7a8288',
      accent: '#f89406',
      light: '#62c462',
      danger: '#ee5f5b',
      name: 'Default'
    },
    'purple-pink': {
      primary: '#a78bfa',
      secondary: '#f06595',
      accent: '#c084fc',
      light: '#e879f9',
      danger: '#ec4899',
      name: 'Purple-Pink'
    },
    'red-green': {
      primary: '#ff6b6b',
      secondary: '#51cf66',
      accent: '#ff6b6b',
      light: '#51cf66',
      danger: '#ff6b6b',
      name: 'Red-Green'
    },
    ocean: {
      primary: '#00d4ff',
      secondary: '#0095ff',
      accent: '#00d4ff',
      light: '#00d4ff',
      danger: '#0095ff',
      name: 'Ocean'
    },
    sunset: {
      primary: '#ff6b6b',
      secondary: '#ffa500',
      accent: '#ff6b6b',
      light: '#ffa500',
      danger: '#ff6b6b',
      name: 'Sunset'
    },
    forest: {
      primary: '#51cf66',
      secondary: '#1e7e3d',
      accent: '#51cf66',
      light: '#51cf66',
      danger: '#1e7e3d',
      name: 'Forest'
    },
    vibrant: {
      primary: '#ff00ff',
      secondary: '#00ffff',
      accent: '#ff00ff',
      light: '#00ffff',
      danger: '#ff00ff',
      name: 'Vibrant'
    },
    cherry: {
      primary: '#e74c3c',
      secondary: '#c0392b',
      accent: '#e74c3c',
      light: '#e74c3c',
      danger: '#c0392b',
      name: 'Cherry'
    },
    mint: {
      primary: '#1abc9c',
      secondary: '#16a085',
      accent: '#1abc9c',
      light: '#1abc9c',
      danger: '#16a085',
      name: 'Mint'
    },
    lavender: {
      primary: '#9b59b6',
      secondary: '#8e44ad',
      accent: '#9b59b6',
      light: '#9b59b6',
      danger: '#8e44ad',
      name: 'Lavender'
    },
    gold: {
      primary: '#f39c12',
      secondary: '#d68910',
      accent: '#f39c12',
      light: '#f39c12',
      danger: '#d68910',
      name: 'Gold'
    },
    coral: {
      primary: '#ff7675',
      secondary: '#ff5252',
      accent: '#ff7675',
      light: '#ff7675',
      danger: '#ff5252',
      name: 'Coral'
    },
    cyan: {
      primary: '#00bcd4',
      secondary: '#0097a7',
      accent: '#00838f',
      light: '#4dd0e1',
      danger: '#00838f',
      name: 'Cyan'
    },
    neon: {
      primary: '#39ff14',
      secondary: '#ff10f0',
      accent: '#00ffff',
      light: '#7fff00',
      danger: '#ff1493',
      name: 'Neon'
    },
    electric: {
      primary: '#00ff00',
      secondary: '#00ffff',
      accent: '#ff00ff',
      light: '#00ff00',
      danger: '#ff0000',
      name: 'Electric'
    },
    modern: {
      primary: '#6366f1',
      secondary: '#8b5cf6',
      accent: '#d946ef',
      light: '#a78bfa',
      danger: '#ef4444',
      name: 'Modern'
    },
    'sunset-glow': {
      primary: '#ff6b35',
      secondary: '#f7931e',
      accent: '#fdb833',
      light: '#ffa502',
      danger: '#ff4500',
      name: 'Sunset Glow'
    },
    'deep-space': {
      primary: '#0f3460',
      secondary: '#16213e',
      accent: '#e94560',
      light: '#533483',
      danger: '#e94560',
      name: 'Deep Space'
    },
    tropical: {
      primary: '#00d4d4',
      secondary: '#00ffa3',
      accent: '#ff006e',
      light: '#00f5ff',
      danger: '#ff006e',
      name: 'Tropical'
    }
  };

  /**
   * Apply color theme to document
   */
  function applyColorTheme(themeName) {
    const theme = colorThemes[themeName];
    
    if (!theme) {
      console.error('Theme not found:', themeName);
      return;
    }
    
    const root = document.documentElement;

    // Set CSS custom properties
    root.style.setProperty('--color-primary', theme.primary);
    root.style.setProperty('--color-secondary', theme.secondary);
    root.style.setProperty('--color-accent', theme.accent);
    root.style.setProperty('--color-light', theme.light);
    root.style.setProperty('--color-danger', theme.danger);

    // Update dynamic styles
    updateLinkColors(theme);

    // Store preference
    try {
      localStorage.setItem(STORAGE_KEY, themeName);
      console.log('Theme saved:', themeName);
    } catch (e) {
      console.error('Error saving theme preference:', e);
    }
  }

  /**
   * Update link and text colors dynamically
   */
  function updateLinkColors(theme) {
    // Create or update style element for dynamic colors
    let styleEl = document.getElementById('dynamic-color-styles');
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'dynamic-color-styles';
      document.head.appendChild(styleEl);
      console.log('Created dynamic-color-styles element');
    }

    // Lighten colors for better dark mode contrast
    const lightPrimary = lightenColor(theme.primary, 30);
    const lightSecondary = lightenColor(theme.secondary, 30);
    const lightAccent = lightenColor(theme.accent, 30);
    const lightLight = lightenColor(theme.light, 30);
    const lightDanger = lightenColor(theme.danger, 30);

    const styles = `
      :root {
        --color-primary: ${theme.primary};
        --color-secondary: ${theme.secondary};
        --color-accent: ${theme.accent};
        --color-light: ${theme.light};
        --color-danger: ${theme.danger};
      }

      a {
        color: ${theme.primary} !important;
      }

      a:hover {
        color: ${theme.secondary} !important;
      }

      /* Bold text styling */
      b, strong, .bold, [style*="font-weight: bold"], [style*="font-weight:bold"] {
        color: ${theme.primary} !important;
        font-weight: 700 !important;
      }

      /* Heading styling */
      h1, h2, h3, h4, h5, h6 {
        color: ${theme.primary} !important;
      }

      h1 strong, h1 b,
      h2 strong, h2 b,
      h3 strong, h3 b,
      h4 strong, h4 b,
      h5 strong, h5 b,
      h6 strong, h6 b {
        color: ${theme.primary};
      }

      /* Page heading */
      .page__content h2 {
        color: ${theme.secondary};
      }

      .page__content h2 strong,
      .page__content h2 b {
        color: ${theme.secondary};
      }

      .archive__item-title {
        color: ${theme.primary};
      }

      .archive__item-title a {
        color: ${theme.primary} !important;
      }

      .archive__item-title a:hover {
        color: ${theme.secondary} !important;
      }

      .archive__item-title strong,
      .archive__item-title b {
        color: ${theme.primary};
      }

      .sidebar .widget-title {
        color: ${theme.primary};
      }

      .sidebar .widget-title strong,
      .sidebar .widget-title b {
        color: ${theme.primary};
      }

      /* Button styling */
      .btn--info {
        background-color: ${theme.primary};
      }

      .btn--success {
        background-color: ${theme.light};
      }

      .btn--warning {
        background-color: ${theme.accent};
      }

      .btn--danger {
        background-color: ${theme.danger};
      }

      /* General button and link styling */
      button, .btn, input[type="button"], input[type="submit"] {
        background-color: ${theme.primary};
        color: #fff;
        border-color: ${theme.primary};
      }

      button:hover, .btn:hover, input[type="button"]:hover, input[type="submit"]:hover {
        background-color: ${theme.secondary};
        border-color: ${theme.secondary};
      }

      /* Table header styling */
      table th {
        color: ${theme.primary} !important;
        font-weight: 700 !important;
        background: rgba(${theme.primary}, 0.08) !important;
        border-color: rgba(${theme.primary}, 0.3) !important;
      }

      /* Social share buttons */
      .share-btn, .social-share a {
        color: ${theme.primary} !important;
        border-color: ${theme.primary} !important;
      }

      .share-btn:hover, .social-share a:hover {
        background-color: ${theme.primary} !important;
        color: #fff !important;
      }

      /* Paragraph bold text */
      p strong, p b {
        color: ${theme.primary};
      }

      /* List bold text */
      li strong, li b {
        color: ${theme.primary};
      }

      /* Blockquote styling */
      blockquote strong, blockquote b {
        color: ${theme.secondary};
      }

      /* Mark/highlight styling */
      mark {
        background-color: rgba(${theme.primary}, 0.2);
        color: ${theme.primary};
      }

      /* Light mode navigation styling */
      .masthead__menu-item a {
        color: ${theme.primary};
      }

      .masthead__menu-item a:hover {
        color: ${theme.secondary};
      }

      .greedy-nav a:hover {
        color: ${theme.primary};
      }

      .nav__list a {
        color: ${theme.primary};
      }

      .nav__list a:hover {
        background: rgba(${theme.primary}, 0.1);
        color: ${theme.secondary};
        box-shadow: -2px 0 0 ${theme.primary};
      }

      .nav__list .active {
        color: ${theme.primary};
        box-shadow: 0 4px 12px ${theme.primary}40;
      }

      .nav__list .active:hover {
        color: ${theme.secondary};
      }

      .sidebar .nav__list a {
        color: ${theme.primary};
      }

      .sidebar .nav__list a:hover {
        background: rgba(${theme.primary}, 0.1);
        color: ${theme.secondary};
        box-shadow: -2px 0 0 ${theme.primary};
      }

      /* Light mode sidebar styling */
      .sidebar {
        border-color: rgba(${theme.primary}, 0.2);
      }

      .sidebar:hover {
        border-color: rgba(${theme.primary}, 0.3);
        box-shadow: 0 12px 40px rgba(${theme.primary}, 0.15);
      }

      .author__name {
        color: ${theme.primary};
      }

      .sidebar:hover .author__name,
      .author__name:hover {
        color: ${theme.secondary};
      }

      .author__bio {
        color: #666;
      }

      .sidebar:hover .author__bio {
        color: ${theme.primary};
      }

      .sidebar h3 {
        color: ${theme.primary};
      }

      .sidebar h3:before {
        background: linear-gradient(90deg, ${theme.primary}, ${theme.secondary});
      }

      .author__urls a {
        background: rgba(${theme.primary}, 0.08);
        color: ${theme.primary};
        border-color: rgba(${theme.primary}, 0.2);
      }

      .author__urls a:hover {
        background: linear-gradient(135deg, ${theme.primary}, ${theme.secondary});
        color: #fff;
        border-color: ${theme.primary};
      }

      /* Light mode text styling */
      .page__content {
        color: #333;
      }

      .page__content strong,
      .page__content b {
        color: ${theme.primary};
        font-weight: 700;
      }

      .sidebar strong,
      .sidebar b {
        color: ${theme.primary};
        font-weight: 700;
      }

      table {
        color: #333;
      }

      table strong,
      table b,
      table td strong,
      table td b,
      table th strong,
      table th b {
        color: ${theme.primary} !important;
        font-weight: 700 !important;
      }

      /* Light mode table bold text */
      table strong, 
      table b,
      table td strong,
      table td b,
      table th strong,
      table th b {
        color: ${theme.primary} !important;
        font-weight: 700 !important;
      }

      /* Control buttons theme styling */
      .color-switcher-toggle {
        border-color: ${theme.primary} !important;
        color: #000 !important;
        background: linear-gradient(135deg, rgba(${theme.primary}, 0.1) 0%, rgba(${theme.primary}, 0.05) 100%) !important;
        box-shadow: 0 6px 18px rgba(${theme.primary}, 0.15) !important;
      }

      .color-switcher-toggle:hover {
        background: linear-gradient(135deg, rgba(${theme.primary}, 0.2) 0%, rgba(${theme.primary}, 0.1) 100%) !important;
        box-shadow: 0 4px 12px rgba(${theme.primary}, 0.25) !important;
      }

      .accessibility-toggle {
        border-color: ${theme.primary} !important;
        color: #000 !important;
        background: linear-gradient(135deg, rgba(${theme.primary}, 0.1) 0%, rgba(${theme.primary}, 0.05) 100%) !important;
        box-shadow: 0 6px 18px rgba(${theme.primary}, 0.15) !important;
      }

      .accessibility-toggle:hover {
        background: linear-gradient(135deg, rgba(${theme.primary}, 0.2) 0%, rgba(${theme.primary}, 0.1) 100%) !important;
        box-shadow: 0 4px 12px rgba(${theme.primary}, 0.25) !important;
      }

      .theme-toggle-float {
        border-color: ${theme.primary} !important;
        color: #000 !important;
        background: linear-gradient(135deg, rgba(${theme.primary}, 0.1) 0%, rgba(${theme.primary}, 0.05) 100%) !important;
        box-shadow: 0 6px 18px rgba(${theme.primary}, 0.15) !important;
      }

      .theme-toggle-float:hover {
        background: linear-gradient(135deg, rgba(${theme.primary}, 0.2) 0%, rgba(${theme.primary}, 0.1) 100%) !important;
        box-shadow: 0 4px 12px rgba(${theme.primary}, 0.25) !important;
      }

      /* DARK MODE STYLING */
      html.dark a {
        color: ${lightPrimary};
      }

      html.dark a:hover {
        color: ${lightSecondary};
      }

      /* Dark mode bold text - lighter colors for contrast */
      html.dark b,
      html.dark strong,
      html.dark .bold,
      html.dark [style*="font-weight: bold"],
      html.dark [style*="font-weight:bold"] {
        color: ${lightPrimary};
        font-weight: 700;
      }

      /* Dark mode headings */
      html.dark h1,
      html.dark h2,
      html.dark h3,
      html.dark h4,
      html.dark h5,
      html.dark h6 {
        color: ${lightPrimary};
      }

      html.dark h1 strong, html.dark h1 b,
      html.dark h2 strong, html.dark h2 b,
      html.dark h3 strong, html.dark h3 b,
      html.dark h4 strong, html.dark h4 b,
      html.dark h5 strong, html.dark h5 b,
      html.dark h6 strong, html.dark h6 b {
        color: ${lightPrimary};
      }

      /* Dark mode page heading */
      html.dark .page__content h2 {
        color: ${lightSecondary};
      }

      html.dark .page__content h2 strong,
      html.dark .page__content h2 b {
        color: ${lightSecondary};
      }

      html.dark .archive__item-title {
        color: ${lightPrimary};
      }

      html.dark .archive__item-title a {
        color: ${lightPrimary} !important;
      }

      html.dark .archive__item-title a:hover {
        color: ${lightSecondary} !important;
      }

      html.dark .archive__item-title strong,
      html.dark .archive__item-title b {
        color: ${lightPrimary};
      }

      html.dark .sidebar .widget-title {
        color: ${lightPrimary};
      }

      html.dark .sidebar .widget-title strong,
      html.dark .sidebar .widget-title b {
        color: ${lightPrimary};
      }

      /* Dark mode button styling */
      html.dark .btn--info {
        background-color: ${lightPrimary};
        color: #000;
      }

      html.dark .btn--success {
        background-color: ${lightLight};
        color: #000;
      }

      html.dark .btn--warning {
        background-color: ${lightAccent};
        color: #000;
      }

      html.dark .btn--danger {
        background-color: ${lightDanger};
        color: #000;
      }

      /* General dark mode button styling */
      html.dark button, 
      html.dark .btn, 
      html.dark input[type="button"], 
      html.dark input[type="submit"] {
        background-color: ${lightPrimary};
        color: #000;
        border-color: ${lightPrimary};
      }

      html.dark button:hover, 
      html.dark .btn:hover, 
      html.dark input[type="button"]:hover, 
      html.dark input[type="submit"]:hover {
        background-color: ${lightSecondary};
        border-color: ${lightSecondary};
      }

      /* Dark mode table header styling */
      html.dark table th {
        color: ${lightPrimary} !important;
        font-weight: 700 !important;
        background: rgba(${lightPrimary}, 0.15) !important;
        border-color: rgba(${lightPrimary}, 0.4) !important;
      }

      /* Dark mode social share buttons */
      html.dark .share-btn, 
      html.dark .social-share a {
        color: ${lightPrimary} !important;
        border-color: ${lightPrimary} !important;
      }

      html.dark .share-btn:hover, 
      html.dark .social-share a:hover {
        background-color: ${lightPrimary} !important;
        color: #000 !important;
      }

      /* Dark mode paragraph bold text */
      html.dark p strong,
      html.dark p b {
        color: ${lightPrimary};
      }

      /* Dark mode list bold text */
      html.dark li strong,
      html.dark li b {
        color: ${lightPrimary};
      }

      /* Dark mode blockquote styling */
      html.dark blockquote strong,
      html.dark blockquote b {
        color: ${lightSecondary};
      }

      /* Dark mode mark/highlight styling */
      html.dark mark {
        background-color: rgba(${lightPrimary}, 0.2);
        color: ${lightPrimary};
      }

      /* Dark mode page content */
      html.dark .page__content {
        color: #e8f4f8;
      }

      html.dark .page__content strong,
      html.dark .page__content b {
        color: ${lightPrimary};
        font-weight: 700;
      }

      /* Dark mode table styling */
      html.dark table {
        background: #000 !important;
        border-collapse: collapse;
      }

      html.dark thead {
        background: #0a0a0a !important;
      }

      html.dark thead th {
        background: #000 !important;
        color: ${lightPrimary} !important;
        border: 1px solid rgba(${lightPrimary}, 0.3) !important;
      }

      html.dark tbody td {
        color: #e8f4f8 !important;
        border: 1px solid rgba(${lightPrimary}, 0.2) !important;
        background: #0a0a0a !important;
      }

      html.dark tbody tr:hover td {
        background: rgba(${lightPrimary}, 0.08) !important;
      }

      html.dark tbody tr:nth-child(even) td {
        background: #050505 !important;
      }

      html.dark tbody tr:nth-child(even):hover td {
        background: rgba(${lightPrimary}, 0.08) !important;
      }

      html.dark table caption {
        color: ${lightPrimary} !important;
      }

      html.dark table strong,
      html.dark table b,
      html.dark table td strong,
      html.dark table td b,
      html.dark table th strong,
      html.dark table th b {
        color: ${lightPrimary} !important;
        font-weight: 700 !important;
      }

      html.dark table em {
        color: ${lightSecondary} !important;
      }

      html.dark table i {
        color: ${lightSecondary} !important;
      }

      /* Dark mode navigation styling */
      html.dark .masthead__menu-item a {
        color: ${lightPrimary};
      }

      html.dark .masthead__menu-item a:hover {
        color: ${lightSecondary};
      }

      html.dark .greedy-nav a:hover {
        color: ${lightPrimary};
      }

      html.dark .nav__list a {
        color: ${lightSecondary};
      }

      html.dark .nav__list a:hover {
        background: rgba(${lightPrimary}, 0.15);
        color: ${lightPrimary};
        box-shadow: -2px 0 0 ${lightPrimary};
      }

      html.dark .nav__list .active {
        color: ${lightPrimary};
        box-shadow: 0 4px 12px rgba(${lightPrimary}, 0.3);
      }

      html.dark .nav__list .active:hover {
        color: ${lightSecondary};
      }

      /* Dark mode sidebar styling */
      html.dark .sidebar {
        background: rgba(30, 30, 30, 0.6);
        border-color: rgba(${lightPrimary}, 0.15);
      }

      html.dark .sidebar:hover {
        background: rgba(40, 40, 40, 0.7);
        border-color: rgba(${lightPrimary}, 0.25);
      }

      html.dark .author__avatar img {
        border-color: rgba(${lightPrimary}, 0.2);
      }

      html.dark .sidebar:hover .author__avatar .avatar-spin img {
        box-shadow: 0 12px 32px rgba(${lightPrimary}, 0.25);
      }

      html.dark .author__name {
        color: ${lightPrimary} !important;
        text-shadow: 0 0 10px ${lightPrimary}99, 0 0 20px ${lightPrimary}55 !important;
        font-weight: 800 !important;
        -webkit-text-fill-color: ${lightPrimary} !important;
      }

      html.dark .sidebar:hover .author__name {
        text-shadow: 0 0 15px ${lightPrimary}dd, 0 0 30px ${lightPrimary}99 !important;
      }

      html.dark .author__bio {
        color: #e8f4f8;
      }

      html.dark .sidebar h3 {
        color: ${lightPrimary};
      }

      html.dark .sidebar h3:before {
        background: linear-gradient(90deg, ${lightPrimary}, ${lightenColor(lightPrimary, -15)});
      }

      html.dark .sidebar .widget-title {
        color: ${lightPrimary};
      }

      html.dark .sidebar .widget-title strong,
      html.dark .sidebar .widget-title b {
        color: ${lightPrimary};
      }

      html.dark .author__urls a {
        background: ${lightPrimary}14;
        color: ${lightPrimary};
        border-color: ${lightPrimary}33;
      }

      html.dark .author__urls a:hover {
        background: linear-gradient(135deg, ${lightPrimary}, ${lightenColor(lightPrimary, -20)});
        color: #fff;
        border-color: ${lightPrimary};
        box-shadow: 0 8px 16px ${lightPrimary}66;
      }

      html.dark .author__urls-wrapper .btn {
        background: linear-gradient(135deg, ${lightPrimary}, ${lightenColor(lightPrimary, -20)});
        color: #fff;
        border-color: ${lightPrimary};
      }

      html.dark .author__urls-wrapper .btn:hover {
        box-shadow: 0 8px 16px ${lightPrimary}66;
      }

      html.dark .sidebar .nav__list a {
        color: ${lightSecondary};
      }

      html.dark .sidebar .nav__list a:hover {
        background: rgba(${lightPrimary}, 0.15);
        color: ${lightPrimary};
        box-shadow: -2px 0 0 ${lightPrimary};
      }

      html.dark .sidebar strong,
      html.dark .sidebar b {
        color: ${lightPrimary};
      }

      /* Dark mode control buttons theme styling */
      html.dark .color-switcher-toggle {
        border-color: ${lightPrimary} !important;
        color: #fff !important;
        background: linear-gradient(135deg, rgba(${lightPrimary}, 0.2) 0%, rgba(${lightPrimary}, 0.1) 100%) !important;
        box-shadow: 0 6px 18px rgba(${lightPrimary}, 0.25) !important;
      }

      html.dark .color-switcher-toggle:hover {
        background: linear-gradient(135deg, rgba(${lightPrimary}, 0.3) 0%, rgba(${lightPrimary}, 0.2) 100%) !important;
        box-shadow: 0 4px 12px rgba(${lightPrimary}, 0.35) !important;
      }

      html.dark .accessibility-toggle {
        border-color: ${lightPrimary} !important;
        color: #fff !important;
        background: linear-gradient(135deg, rgba(${lightPrimary}, 0.2) 0%, rgba(${lightPrimary}, 0.1) 100%) !important;
        box-shadow: 0 6px 18px rgba(${lightPrimary}, 0.25) !important;
      }

      html.dark .accessibility-toggle:hover {
        background: linear-gradient(135deg, rgba(${lightPrimary}, 0.3) 0%, rgba(${lightPrimary}, 0.2) 100%) !important;
        box-shadow: 0 4px 12px rgba(${lightPrimary}, 0.35) !important;
      }

      html.dark .theme-toggle-float {
        border-color: ${lightPrimary} !important;
        color: #fff !important;
        background: linear-gradient(135deg, rgba(${lightPrimary}, 0.2) 0%, rgba(${lightPrimary}, 0.1) 100%) !important;
        box-shadow: 0 6px 18px rgba(${lightPrimary}, 0.25) !important;
      }

      html.dark .theme-toggle-float:hover {
        background: linear-gradient(135deg, rgba(${lightPrimary}, 0.3) 0%, rgba(${lightPrimary}, 0.2) 100%) !important;
        box-shadow: 0 4px 12px rgba(${lightPrimary}, 0.35) !important;
      }
    `;

    styleEl.textContent = styles;
    console.log('Styles applied to dynamic-color-styles element. Theme primary color:', theme.primary);
  }

  /**
   * Lighten a hex color by a given percentage
   */
  function lightenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = Math.min(255, (num >> 16) + amt);
    const G = Math.min(255, (num >> 8 & 0x00FF) + amt);
    const B = Math.min(255, (num & 0x0000FF) + amt);
    return "#" + (0x1000000 + R * 0x10000 + G * 0x100 + B).toString(16).slice(1);
  }

  /**
   * Initialize color switcher
   */
  function initColorSwitcher() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    console.log('Initializing color switcher... Found', colorOptions.length, 'buttons');
    
    if (colorOptions.length === 0) {
      console.log('No color buttons found, retrying...');
      setTimeout(initColorSwitcher, 100);
      return;
    }

    // Get stored theme or use default
    let savedTheme = DEFAULT_THEME;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && colorThemes[stored]) {
        savedTheme = stored;
      }
    } catch (e) {
      console.error('Error reading theme preference:', e);
    }

    console.log('Applying saved theme:', savedTheme);
    
    // Apply saved theme on load
    applyColorTheme(savedTheme);
    
    // Mark the current theme button
    colorOptions.forEach(btn => {
      const themeName = btn.dataset.theme;
      btn.setAttribute('aria-pressed', themeName === savedTheme ? 'true' : 'false');
    });

    // Add click handlers to each button
    colorOptions.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const themeName = btn.dataset.theme;
        
        console.log('Color button clicked:', themeName);
        
        if (!colorThemes[themeName]) {
          console.error('Theme not found:', themeName);
          return;
        }
        
        // Update button states
        colorOptions.forEach(b => {
          b.setAttribute('aria-pressed', 'false');
        });
        btn.setAttribute('aria-pressed', 'true');
        
        // Apply the new theme
        applyColorTheme(themeName);
        
        console.log('Theme applied:', themeName);
      });
    });
    
    console.log('Color switcher initialized successfully');
  }

  /**
   * Announce theme change to screen readers
   */
  function announceThemeChange(themeName) {
    const announcement = document.createElement('div');
    announcement.className = 'sr-only';
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.textContent = 'Color theme changed to ' + themeName;

    document.body.appendChild(announcement);

    setTimeout(() => {
      announcement.remove();
    }, 1000);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColorSwitcher);
  } else {
    initColorSwitcher();
  }
})();
