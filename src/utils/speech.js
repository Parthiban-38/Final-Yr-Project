export function speak(text, lang) {
  const msg = new SpeechSynthesisUtterance(text);

  msg.lang = lang === "ta" ? "ta-IN" : "en-US";

  window.speechSynthesis.speak(msg);
}