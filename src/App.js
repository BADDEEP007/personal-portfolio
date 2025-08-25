import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import MainHomePage from "./pages/HomePage.js";
import AboutPage from "./pages/AboutPage.js";
import ExpertisePage from "./pages/ExpertisePage.js";

import ContactForm from "./pages/Contactform.js";
import AdminPanel from "./pages/AdminPanel.js";
import NotFound from "./pages/NotFound.js";

function App() {
  return (
    <Router>
      <Navbar />

      {/* Optimized Global Ash Effect - High Performance */}
      <div className="global-ash-container">
        <div className="global-ash-particle"></div>
        <div className="global-ash-particle"></div>
        <div className="global-ash-particle"></div>
        <div className="global-ash-particle"></div>
        <div className="global-ash-particle"></div>
        <div className="global-ash-particle"></div>
        <div className="global-ash-particle"></div>
        <div className="global-ash-particle"></div>
      </div>

      <Routes>
        <Route path="/" element={<MainHomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/expertise" element={<ExpertisePage />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route
          path="/drive-download"
          element={<div>Drive Download - Coming Soon</div>}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
