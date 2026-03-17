import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Recommender from "./pages/Recommender";

function App() {
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