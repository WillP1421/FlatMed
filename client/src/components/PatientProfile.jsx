import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePatientData } from './actions';
import { AuthContext } from './AuthContext';
import './PatientProfile.css';

const PatientProfile = ({ authData, updatePatientData }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  const [patientInfo, setPatientInfo] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });

  useEffect(() => {
    const fetchPatientInfo = async () => {
      try {
        const response = await fetch(`http://localhost:5555/patients/${id}`);
        if (response.ok) {
          const data = await response.json();
          setPatientInfo(data);
        } else {
          console.error('Error fetching patient information:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchPatientInfo();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5555/patients/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(patientInfo),
      });

      if (response.ok) {
        console.log('Patient information updated successfully.');

        updatePatientData(patientInfo);

        navigate('/patient_portal');
      } else {
        console.error('Error updating patient information:', response.statusText);
      }
    } catch (error) {
      console.error('Error during update:', error);
    }
  };

  return (
    <div className="patientProfileContainer">
      <h1 className="patientProfileTitle">Edit Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name" className="patientFormLabel">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={patientInfo.name}
          onChange={handleChange}
          className="patientFormInput"
          required
        />
        <label htmlFor="email" className="patientFormLabel">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={patientInfo.email}
          onChange={handleChange}
          className="patientFormInput"
          required
        />
        <label htmlFor="phone" className="patientFormLabel">
          Phone:
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={patientInfo.phone}
          onChange={handleChange}
          className="patientFormInput"
          required
        />
        <label htmlFor="address" className="patientFormLabel">
          Address:
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={patientInfo.address}
          onChange={handleChange}
          className="patientFormInput"
          required
        />
        <label htmlFor="password" className="patientFormLabel">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={patientInfo.password}
          onChange={handleChange}
          className="patientFormInput"
          required
        />

        <button className="patientSaveButton" type="submit">
          Save Changes
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  authData: state.auth,
});

const mapDispatchToProps = {
  updatePatientData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientProfile);
