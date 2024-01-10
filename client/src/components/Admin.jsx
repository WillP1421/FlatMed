import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

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

  const handleDeleteClick = (patientId) => {
    // Send a DELETE request to remove the patient
    fetch(`/patients/${patientId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Remove the deleted patient from the patients list
        setPatients(patients.filter(patient => patient.id !== patientId));
      })
      .catch(error => console.error('Error deleting patient:', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPatient(prevPatient => ({
      ...prevPatient,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Admin - Manage Patients</h2>
      <div>
        <label htmlFor="search">Search by Name:</label>
        <input
          type="text"
          id="search"
          name="search"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <ul>
        {filteredPatients.map(patient => (
          <li key={patient.id}>
            {editingPatient && editingPatient.id === patient.id ? (
              <div>
                {/* ... (unchanged) */}
                <button onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <div>
                {/* ... (unchanged) */}
                <p>{patient.name}</p>
                <p>{patient.email}</p>
                <p>{patient.phone}</p>
                <p>{patient.address}</p>
                <button onClick={() => handleEditClick(patient)}>Edit</button>
                <button onClick={() => handleDeleteClick(patient.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;


