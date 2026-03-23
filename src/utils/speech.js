import { getCurrentLanguage } from "./language";

export function speakText(text) {
  if (!text) {
    console.warn("⚠️ No text to speak");
    return;
  }

  const lang = getCurrentLanguage();

  const speech = new SpeechSynthesisUtterance(text);

  speech.lang = lang === "ta" ? "ta-IN" : "en-US";

  let voices = window.speechSynthesis.getVoices();

  if (!voices.length) {
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      setVoiceAndSpeak(voices, speech);
    };
  } else {
    setVoiceAndSpeak(voices, speech);
  }
}

function setVoiceAndSpeak(voices, speech) {
  // ✅ Better matching
  const selectedVoice = voices.find(v =>
    v.lang.toLowerCase().startsWith(speech.lang.toLowerCase())
  );

  if (selectedVoice) {
    speech.voice = selectedVoice;
  } else {
    console.warn("⚠️ No matching voice found for", speech.lang);
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}