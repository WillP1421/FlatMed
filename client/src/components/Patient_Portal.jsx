// PatientPortal.jsx

import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavBar from './NavBar';
import { AuthContext } from './AuthContext'; // Assuming you have an AuthContext

const PatientPortal = () => {
  const location = useLocation();
  const { patientData } = location.state || {};
  const { setAuthData } = useContext(AuthContext); // Add this line

  return (
    <div>
      <NavBar />
      <h1>Patient Portal</h1>

      {patientData && (
        <div>
          <p>Welcome, {patientData.name}!</p>
          <Link to={`/patient_profile/${patientData.id}`}>Edit Profile</Link>
        </div>
      )}
    </div>
  );
};

export default PatientPortal;
