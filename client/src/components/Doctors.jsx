
// Doctors.js
import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');

  useEffect(() => {
    // Fetch doctors from the backend when the component mounts
    fetch('/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []); // The empty dependency array ensures the effect runs only once

  // Get unique specialties for dropdown
  const specialties = ['All', ...new Set(doctors.map(doctor => doctor.specialty))];

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
  };

  const filteredDoctors = selectedSpecialty === 'All'
    ? doctors
    : doctors.filter(doctor => doctor.specialty === selectedSpecialty);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      
      <div className="doctors-container">
        <h2>Medical Directory</h2>

        {/* Specialty Dropdown */}
        <label htmlFor="specialtyDropdown" className="specialty-label">Select Specialty:</label>
        <select
          id="specialtyDropdown"
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
          className="specialty-dropdown"
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>

        {/* List of Doctors */}
        <ul className="doctors-list">
          {filteredDoctors.map(doctor => (
            <li key={doctor.id} className="doctor-item">
              <strong className="info-label">Name:</strong> {doctor.name}<br />
              <strong className="info-label">Email:</strong> {doctor.email}<br />
              <strong className="info-label">Phone:</strong> {doctor.phone}<br />
              <strong className="info-label">Specialty:</strong> {doctor.specialty}<br />
              <strong className="info-label">Address:</strong> {doctor.address}<br />
              <hr className="separator" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Doctors;

