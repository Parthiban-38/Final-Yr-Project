import { speakText } from "./speech";

export function speakFullPage() {
  setTimeout(() => {
    const text = document.body.innerText;
    speakText(text);
  }, 1000); // wait for translation to apply
}