import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Menu from './components/Menu';
import Inventory from './pages/inventory';
import Performance from './pages/performance';
import ContentManager from './pages/contentManager';
import UserManagement from './pages/userManagement';
import TaskManager from './pages/taskManage';
import FinanceInformation from './pages/financeInformation';
import Settings from './pages/settings';
import Alerts from './pages/alert';

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
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/performance" element={<Performance />} />
        <Route path="/contentManager" element={<ContentManager />} />
        <Route path="/userManagement" element={<UserManagement />} />
        <Route path="/taskManage" element={<TaskManager />} />
        <Route path="/financeInformation" element={<FinanceInformation />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/alert" element={<Alerts />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
