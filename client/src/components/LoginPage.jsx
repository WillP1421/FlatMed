// LoginPage.jsx

import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from './AuthContext'; // Assuming the context is in the same directory
import './Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5555/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const patientData = await response.json();
        console.log('Login successful:', patientData);

        // Store the token in a secure, HTTP-only cookie
        Cookies.set('authToken', patientData.token, { secure: true, httpOnly: true });

        // Set the authentication data in the context
        setAuthData({
          isAuthenticated: true,
          patientData,
        });

        // Pass patient information to the patient portal
        navigate('/patient_portal', { state: { patientData } });
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-heading">Login</h1>
      <div className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        <p className="signup-link">
          If you don't have an account, click <Link to="/signup">signup</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
