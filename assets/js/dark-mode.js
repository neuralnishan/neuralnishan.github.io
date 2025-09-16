document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
  
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateToggleText(currentTheme);
  
  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
      ? 'light' 
      : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateToggleText(newTheme);
  });
  
  function updateToggleText(theme) {
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.textContent = theme === 'dark' ? 'Turn Light Mode!' : 'Turn Dark Mode!';
  }
});