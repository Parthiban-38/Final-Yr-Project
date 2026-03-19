import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import AppRoutes from "./routes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  useEffect(() => {
    const removeGoogleBanner = () => {
      const iframe = document.querySelector(".goog-te-banner-frame");
      if (iframe) {
        iframe.style.display = "none";
      }
      document.body.style.top = "0px";
    };

    const interval = setInterval(removeGoogleBanner, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;