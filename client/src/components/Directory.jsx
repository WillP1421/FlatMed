import React from "react";
import NavBar from "./NavBar";
import Doctors from "./Doctors"; // Import the Doctors component

const Directory = () => {
    return (
        <div>
            <div className="container">
                <Doctors /> {/* Render the Doctors component here */}
            </div>
        </div>
    );
}

export default Directory;
