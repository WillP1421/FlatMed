import {NavLink} from "react-router-dom";


const NavBar = () => {

    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/directory">Directory</NavLink>
            <NavLink to="/login">Login</NavLink>
        </nav>
    );
}


export default NavBar;