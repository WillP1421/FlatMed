import React from "react";
import NavBar from "./NavBar";
import "./About.css";
const About = () => {
    return (
        <div>
            <NavBar />
            <div className="container_About">
                <div className="content_About">
                    <h2>About Us</h2>
                    <p>Welcome to FlatMed - Your Trusted Medical Directory</p>

                    <p>
                        At FlatMed, we are committed to providing accurate and up-to-date information about medical professionals and healthcare services. Our mission is to connect individuals with the right healthcare providers, making it easier for you to access the care you need.
                    </p>

                    <p>
                        Whether you're looking for a primary care physician, specialist, or any other healthcare service, FlatMed is here to assist you. Our user-friendly directory allows you to search for healthcare providers based on specialty, location, and other relevant criteria.
                    </p>

                    <p>
                        We understand the importance of finding reliable healthcare information, and that's why we strive to ensure the accuracy and completeness of our directory. Your health is our priority, and we are dedicated to facilitating a seamless healthcare experience for you and your loved ones.
                    </p>

                    <p>
                        Thank you for choosing FlatMed. If you have any questions or feedback, feel free to <a href="/contact">contact us</a>.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
