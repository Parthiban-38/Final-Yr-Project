import { speakText } from "./speech";

export function speakFullPage() {
  setTimeout(() => {
    const walker = document.createTreeWalker(
      document.getElementById("root"),
      NodeFilter.SHOW_TEXT,
      null,
      false
    );

    let text = "";
    let node;

    while (node = walker.nextNode()) {
      const value = node.nodeValue.trim();

      if (value) {
        text += value + " ";
      }
    }

    speakText(text);
  }, 1500);
}