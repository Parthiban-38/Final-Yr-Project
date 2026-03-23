export function getCurrentLanguage() {
  // ✅ 1. Check Google Translate cookie
  const cookieMatch = document.cookie.match(/googtrans=\/\w+\/(\w+)/);

  if (cookieMatch) {
    return cookieMatch[1]; // 'en' or 'ta'
  }

  // ✅ 2. Detect if page is translated
  const isTranslated =
    document.documentElement.classList.contains("translated-ltr") ||
    document.documentElement.classList.contains("translated-rtl");

  if (isTranslated) {
    return "ta"; // assume Tamil if translated
  }

  // ✅ 3. Default
  return "en";
}