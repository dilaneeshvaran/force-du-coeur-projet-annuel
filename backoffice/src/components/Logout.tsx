
import { RiShutDownLine } from "react-icons/ri";
import '../styles/logout.css';

interface LogoutProps {
    onLogout: () => void;
}

function Logout({ onLogout }: LogoutProps) {

    return (
        <div className="logout-div">
            <a className="logout-btn" onClick={onLogout}>
                <RiShutDownLine className="logout-logo" size={30} />
            </a>
        </div>
    );
}

export default Logout;