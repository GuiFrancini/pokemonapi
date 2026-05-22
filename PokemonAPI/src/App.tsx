// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PokemonDetailsPage } from "@/pages/pokemon-details-page";
import { Home } from "./pages/home";

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetailsPage />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;