// import { useEffect } from "react";

// export default function GoogleTranslate() {

//   useEffect(() => {

//     // Prevent duplicate script
//     if (window.google && window.google.translate) {
//       initTranslate();
//       return;
//     }

//     const script = document.createElement("script");
//     script.src = "https://translate.google.com/translate_a/element.js";
//     script.async = true;

//     script.onload = () => {
//       initTranslate();
//     };

//     document.body.appendChild(script);

//     function initTranslate() {
//       if (!window.google || !window.google.translate) return;

//       new window.google.translate.TranslateElement(
//         {
//           pageLanguage: "en",
//           includedLanguages: "en,ta",
//           autoDisplay: false,
//         },
//         "google_translate_element"
//       );
//     }

//     // Fix layout shift
//     const interval = setInterval(() => {
//       document.body.style.top = "0px";
//     }, 100);

//     return () => clearInterval(interval);

//   }, []);

//   return <div id="google_translate_element" style={{ display: "none" }}></div>;
// }