import React, { useState, useEffect } from 'react';
import './Admin.css';
const Admin = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    // Fetch patients from the backend when the component mounts
    fetch('/patients')
      .then(response => response.json())
      .then(data => setPatients(data))
      .catch(error => console.error('Error fetching patients:', error));
  }, []); // The empty dependency array ensures the effect runs only once

  const handleEditClick = (patient) => {
    // Set the patient to start editing
    setEditingPatient({ ...patient });
  };

  const handleSaveClick = () => {
    // Send a PATCH or PUT request to update the patient data
    fetch(`/patients/${editingPatient.id}`, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingPatient),
    })
      .then(response => response.json())
      .then(updatedPatient => {
        // Update the patients list with the updated data
        setPatients(patients.map(patient =>
          patient.id === editingPatient.id ? updatedPatient : patient
        ));
      })
      .catch(error => console.error('Error updating patient:', error))
      .finally(() => setEditingPatient(null)); // Stop editing after saving
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPatient(prevPatient => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Admin - Manage Patients</h2>
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {editingPatient && editingPatient.id === patient.id ? (
              <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={editingPatient.name} onChange={handleInputChange} />
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" value={editingPatient.email} onChange={handleInputChange} />
                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={editingPatient.phone} onChange={handleInputChange} />
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={editingPatient.address} onChange={handleInputChange} />
                <lable htmlFor="password">Password:</lable>
                <input type="text" id="password" name="password" value={editingPatient.password} onChange={handleInputChange} />
                {/* Repeat similar input fields for other patient properties */}
                <button onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <div>
                <strong>Name:</strong> {patient.name}<br />
                <strong>Email:</strong> {patient.email}<br />
                <strong>Phone:</strong> {patient.phone}<br />
                <strong>Address:</strong> {patient.address}<br />
                <strong>Password:</strong> {patient.password}<br />
                {/* Repeat similar display for other patient properties */}
                <button onClick={() => handleEditClick(patient)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
