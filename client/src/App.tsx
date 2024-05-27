import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/home'
import Contact from './pages/contact';
import Soutenir from './pages/soutenir';
import Evenements from './pages/evenements';
import Missions from './pages/missions';
import Equipes from './pages/equipes';
import Rejoindre from './pages/rejoindre';
import EspaceMembres from './pages/espaceMembres';
import { useState } from 'react';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    navigate('/espaceMembres');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <BrowserRouter>
      <Navbar className="navContainer" isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/soutenir" element={<Soutenir />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/rejoindre" element={<Rejoindre />} />
        <Route path="/espaceMembres" element={<EspaceMembres isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;