import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import './Doctors.css';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [reviews, setReviews] = useState({});
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/doctors')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(error => console.error('Error fetching doctors:', error));
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      const reviewsData = {};

      await Promise.all(doctors.map(async doctor => {
        try {
          const response = await fetch(`/doctors/reviews/${doctor.id}`);
          if (response.ok) {
            const data = await response.json();
            reviewsData[doctor.id] = data;
          } else {
            console.error(`Error fetching reviews for doctor ${doctor.id}`);
          }
        } catch (error) {
          console.error(`Error fetching reviews for doctor ${doctor.id}:`, error);
        }
      }));

      setReviews(reviewsData);
    };

    fetchReviews();
  }, [doctors]);

  const specialties = ['All', ...new Set(doctors.map(doctor => doctor.specialty))];

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredDoctors = doctors
    .filter(doctor =>
      (selectedSpecialty === 'All' || doctor.specialty === selectedSpecialty) &&
      (doctor.name.toLowerCase().includes(searchQuery.toLowerCase())))

  return (
    <div>
      <div className="doctors-container">
        <h2>Medical Directory</h2>

        
        <label htmlFor="searchInput" className="search-label">Search by Name</label>
        <input
          type="text"
          id="searchInput"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />

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

        <ul className="doctors-list">
          {filteredDoctors.map(doctor => (
            <li key={doctor.id} className="doctor-item">
              
              <strong className="info-label">Name:</strong> {doctor.name}<br />
              <strong className="info-label">Email:</strong> {doctor.email}<br />
              <strong className="info-label">Phone:</strong> {doctor.phone}<br />
              <strong className="info-label">Specialty:</strong> {doctor.specialty}<br />
              <strong className="info-label">Address:</strong> {doctor.address}<br />
              <hr className="separator" />

              
              <h3>Reviews:</h3>
              <ul>
                {reviews[doctor.id] &&
                  reviews[doctor.id].map(review => (
                    <li key={review.id}>
                      
                      <strong>Rating:</strong> {review.rating}<br />
                      <strong>Comment:</strong> {review.comment}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Doctors;
