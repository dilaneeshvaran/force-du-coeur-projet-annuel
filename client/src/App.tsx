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
import ManageAccount from './pages/manageAccount';
import ChatBot from './components/ChatBox';
import cb1 from './assets/chatbox3.png'
import { useLocation } from 'react-router-dom';
import PasswordReset from './components/PasswordReset';
import PasswordResetPage from './components/PasswordResetPage';

function Logout() {


  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [isChatBotVisible, setChatBotVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const toggleChatBot = () => {
    setChatBotVisible(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      <Navbar className="navContainer" isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/request-password-reset" element={<PasswordReset onClose={() => { }} />} />
        <Route path="/reset-password/:token" element={<PasswordResetPage />} />
        <Route path="/evenements" element={<Evenements />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/soutenir" element={<Soutenir isLoggedIn={isLoggedIn} />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/equipes" element={<Equipes />} />
        <Route path="/rejoindre" element={<Rejoindre />} />
        <Route path="/espaceMembres" element={<EspaceMembres isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/manageAccount/*" element={<ManageAccount />} />
      </Routes>

      <ChatBotButton toggleChatBot={toggleChatBot} isChatBotVisible={isChatBotVisible} />
      {isChatBotVisible && <ChatBot messageHistory={chatHistory} setChatHistory={setChatHistory} />}


    </BrowserRouter>
  );
}
interface ChatBotButtonProps {
  toggleChatBot: () => void;
  isChatBotVisible: boolean;
}
function ChatBotButton({ toggleChatBot, isChatBotVisible }: ChatBotButtonProps) {
  const [isActive, setIsActive] = useState(false);
  const location = useLocation();

  if (location.pathname === '/espaceMembres') {
    return null;
  }

  const handleClick = () => {
    toggleChatBot();
    setIsActive(!isActive);
  };

  return (
    location.pathname !== '/espaceMembres' && (
      <button className={`chatbot-btn ${isActive ? 'active' : ''}`} onClick={handleClick}>
        <img src={cb1} className={`chatbotlogo ${isActive ? 'active' : ''}`} alt='' />
        {isChatBotVisible ? 'Fermer' : 'Assistance Bot'}
      </button>
    )
  );
}

export default App;