document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use system preference
  const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleIcon(currentTheme);
  
  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
      ? 'light' 
      : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleIcon(newTheme);
  });
  
  function updateToggleIcon(theme) {
    const toggleIcon = document.getElementById('theme-toggle-icon');
    toggleIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
});