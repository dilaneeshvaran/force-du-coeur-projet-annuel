import { RiShutDownLine } from "react-icons/ri";
import '../styles/logout.css';

interface LogoutProps {
  onLogout?: () => void;
}

const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userId');
    if (onLogout) {
      onLogout();
    }
  };
  return (
    <div className="logout-div">
      <a className="logout-btn" onClick={handleLogout}>
        <RiShutDownLine className="logout-logo" size={30} />
      </a>
    </div>
  );
};

export default Logout;