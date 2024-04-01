import { NavLink, useLocation } from "react-router-dom";
import '../styles/Navbar.css'


const Navbar = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar"
    >
      <div className="container">
            <NavLink className={`navbar-item ${location.pathname === '/home' ? 'is-active' : ''}`} to="/">
              Home
            </NavLink>

            <NavLink className={`navbar-item ${location.pathname === '/contact' ? 'is-active' : ''}`} to="/contact">
              Contact
            </NavLink>
          </div>
    </nav>
  );
};

export default Navbar;