import { NavLink } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="unique-nav">
            <h1 className="unique-logo">FlatMed</h1>
            <NavLink to="/" className="unique-link">Home</NavLink>
            <NavLink to="/about" className="unique-link">About</NavLink>
            <NavLink to="/contact" className="unique-link">Contact</NavLink>
            <NavLink to="/directory" className="unique-link">Directory</NavLink>
            <NavLink to="/login" className="unique-link">Login</NavLink>
        </nav>
    );
}

export default NavBar;
