import React from "react";
import NavBar from "./NavBar";
import Doctors from "./Doctors"; 

const Directory = () => {
    return (
        <div>
            <NavBar />
            <div>
                <Doctors />
            </div>
        </div>
    );
}

export default Directory;
