import { getCurrentLanguage } from "./language";

export function speakText(text) {
  const lang = getCurrentLanguage();

  const speech = new SpeechSynthesisUtterance(text);

  if (lang === "en") {
    speech.lang = "en-US";
  } else {
    speech.lang = "ta-IN";
  }

  // 🔍 DEBUG HERE
  let voices = window.speechSynthesis.getVoices();
  console.log("Voices:", voices);

  if (!voices.length) {
    window.speechSynthesis.onvoiceschanged = () => {
      voices = window.speechSynthesis.getVoices();
      console.log("Voices after load:", voices); // 🔍 important
      setVoiceAndSpeak(voices, speech);
    };
  } else {
    setVoiceAndSpeak(voices, speech);
  }
}

function setVoiceAndSpeak(voices, speech) {
  const selectedVoice = voices.find(v =>
    v.lang.toLowerCase().includes(speech.lang.toLowerCase())
  );

  if (selectedVoice) {
    console.log("Using voice:", selectedVoice);
    speech.voice = selectedVoice;
  } else {
    console.warn("⚠️ No matching voice found for", speech.lang);
  }

  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}