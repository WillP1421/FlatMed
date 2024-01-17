import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { updatePatientData } from './actions';
import { AuthContext } from './AuthContext';

const PatientProfile = ({authData,updatePatientData}) => {

  const { id } = useParams();
  const navigate = useNavigate();
  const {setAuthData} = useContext(AuthContext);

  const [patientInfo, setPatientInfo] = useState({
    id: null,
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
  });
  console.log(authData)

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
    <div>
      <h1>Edit Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={patientInfo.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={patientInfo.email}
          onChange={handleChange}
          required
        />
        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={patientInfo.phone}
          onChange={handleChange}
          required
        />
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={patientInfo.address}
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={patientInfo.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
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
