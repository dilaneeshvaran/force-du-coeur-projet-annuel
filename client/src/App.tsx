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
  const [isChatBotVisible, setChatBotVisible] = useState(false);
  const [chatHistory, setChatHistory] = useState([]); // Chat history state

  const toggleChatBot = () => {
    setChatBotVisible(prev => !prev);
  };

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