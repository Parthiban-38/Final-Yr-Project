export function getCurrentLanguage() {
  const cookieMatch = document.cookie.match(/googtrans=\/\w+\/(\w+)/);

  if (cookieMatch) return cookieMatch[1];

  // fallback using HTML class
  if (document.documentElement.classList.contains("translated-ltr")) {
    return "en";
  }

  return "ta"; // default
}