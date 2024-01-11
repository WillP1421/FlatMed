import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate and Link
import './Signup.css';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/patients', formData);
            console.log('Patient created:', response.data);

            // Redirect to /patient_portal upon successful signup
            navigate('/patient_portal');
        } catch (error) {
            console.error('Error creating patient:', error);
            // Handle error - show an error message to the user, etc.
        }
    };

    return (
        <div className="signup-container">
            <Link to="/login">
                <button className="back-button">Back to Login</button>
            </Link>
            <h2>Signup</h2>
            <form className="signup-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="phone">Phone:</label>
                <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

                <label htmlFor="address">Address:</label>
                <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
