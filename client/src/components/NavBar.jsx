import {NavLink} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {

    return (
            <nav className="nav">
                <h1 classname="logo">FlatMed</h1>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/directory">Directory</NavLink>
                    <NavLink to="/login">Login/Signup</NavLink>
            </nav>
        
    );
}


export default NavBar;