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
      

      <div className="container">
        <h2>Medical Directory</h2>

        {/* Specialty Dropdown */}
        <label htmlFor="specialtyDropdown">Select Specialty:</label>
        <select
          id="specialtyDropdown"
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
        >
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>

        {/* List of Doctors */}
        <ul className="doctors-list">
          {filteredDoctors.map(doctor => (
            <li key={doctor.id}>
              <strong>Name:</strong> {doctor.name}<br />
              <strong>Email:</strong> {doctor.email}<br />
              <strong>Phone:</strong> {doctor.phone}<br />
              <strong>Specialty:</strong> {doctor.specialty}<br />
              <strong>Address:</strong> {doctor.address}<br />
              <hr />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Doctors;

