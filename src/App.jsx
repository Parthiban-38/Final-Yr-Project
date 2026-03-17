import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Recommender from "./pages/Recommender";

function App() {

  useEffect(() => {

    const removeGoogleBanner = () => {
      const iframe = document.querySelector(".goog-te-banner-frame");

      if (iframe) {
        iframe.style.display = "none";
      }

      // remove top gap added by Google
      document.body.style.top = "0px";
    };

    // run continuously (Google injects late)
    const interval = setInterval(removeGoogleBanner, 100);

    return () => clearInterval(interval);

  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/recommender" element={<Recommender />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;