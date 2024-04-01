import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Home from './pages/home'
import Contact from './pages/contact';
import Participer from './pages/participer';

function App() {
  return (
    <BrowserRouter>
      <Navbar className="navContainer" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/participer" element={<Participer />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;