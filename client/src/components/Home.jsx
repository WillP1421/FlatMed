import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "./NavBar";
import "./Home.css";

const Home = () => {
    return (
        <div>
            <div className="navBar">
                <NavBar />
            </div>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <h1>Welcome to FlatMed</h1>
                    <p>Your Trusted Medical Directory</p>
                </div>
            </section>

            {/* Call-to-Action Section */}
            <section className="cta">
                <div className="cta-content">
                    <h2>Find the Right Healthcare Providers</h2>
                    <p>Discover and connect with healthcare professionals in your area. Your health is our priority.</p>
                    <NavLink to="/directory" className="cta-link">Get Started</NavLink>
                </div>
                <div className="cta-image">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNpzOVXJ2lfNd6VPKH5vb9SXXo-3CfmGh5w&usqp=CAU" alt="Medical Professionals" />
                </div>
            </section>
        </div>
    );
}

export default Home;

