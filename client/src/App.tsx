import { BrowserRouter, Route, Routes } from 'react-router-dom';
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


function App() {
  return (
    <BrowserRouter>
      <Navbar className="navContainer" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/evenements" element={<Evenements />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/soutenir" element={<Soutenir />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/equipes" element={<Equipes />} />
          <Route path="/rejoindre" element={<Rejoindre />} />
          <Route path="/espaceMembres" element={<EspaceMembres />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;