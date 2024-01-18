import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/patients')
      .then(response => response.json())
      .then(data => {
        const sortedPatients = data.sort((a, b) => a.name.localeCompare(b.name));
        setPatients(sortedPatients);
      })
      .catch(error => console.error('Error fetching patients:', error));
  }, []);

  const handleEditClick = (patient) => {
    setEditingPatient({ ...patient });
  };

  const handleSaveClick = () => {
    fetch(`/patients/${editingPatient.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingPatient),
    })
      .then(response => response.json())
      .then(updatedPatient => {
        setPatients(patients.map(patient =>
          patient.id === editingPatient.id ? updatedPatient : patient
        ));
      })
      .catch(error => console.error('Error updating patient:', error))
      .finally(() => setEditingPatient(null));
  };

  const handleDeleteClick = (patientId) => {
    fetch(`/patients/${patientId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to delete patient with ID ${patientId}`);
        }
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
    <div className="admin-container">
      <div className="admin-top-bar">
        <button className="admin-back-home" onClick={() => navigate('/')}>Back to Home</button>
        <button className="admin-back-login" onClick={() => navigate('/login')}>Back to Login</button>
      </div>
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
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={editingPatient.name} onChange={handleInputChange} />
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={editingPatient.email} onChange={handleInputChange} />
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" name="phone" value={editingPatient.phone} onChange={handleInputChange} />
                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={editingPatient.address} onChange={handleInputChange} />
                <button className="admin-save" onClick={handleSaveClick}>Save</button>
              </div>
            ) : (
              <div>
                <p>{patient.name}</p>
                <button className="admin-edit" onClick={() => handleEditClick(patient)}>Edit</button>
                <button className="admin-delete" onClick={() => handleDeleteClick(patient.id)}>Delete</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
