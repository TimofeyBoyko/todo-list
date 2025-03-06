// This script ensures the site always uses dark theme
import Cookies from 'js-cookie';

export function forceDarkTheme() {
  // Set dark theme in cookie with 365-day expiration
  Cookies.set('theme', 'dark', { expires: 365, path: '/' });
  
  // Add dark class to html element
  document.documentElement.classList.add('dark');
  
  // Remove light class if it exists
  document.documentElement.classList.remove('light');
  
  // Set data-theme attribute for components that might use it
  document.documentElement.setAttribute('data-theme', 'dark');
}

// Run immediately to ensure dark theme is applied as soon as possible
if (typeof window !== 'undefined') {
  forceDarkTheme();
}
