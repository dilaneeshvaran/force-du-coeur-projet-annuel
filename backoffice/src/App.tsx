import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Menu from './components/Menu';

function App() {
  const [count, setCount] = useState(0)

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <BrowserRouter>
      <Menu className="navContainer" isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
      </Routes>
    </BrowserRouter>
  )
}

export default App
