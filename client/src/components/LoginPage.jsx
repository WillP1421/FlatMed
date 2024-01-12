import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginSuccess } from './actions';
import Cookies from 'js-cookie';
import './Login.css';

const LoginPage = ({ loginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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

        
        Cookies.set('authToken', patientData.token, { secure: true, httpOnly: true });

        
        loginSuccess(patientData);

        
        navigate('/patient_portal', { state: { patientData } });
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
    const handleAdminLogin = async () => {
      try {
        const response = await fetch('http://localhost:5555/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
  
        if (response.ok) {
          const adminData = await response.json();
          console.log('Admin login successful:', adminData);
  
          
          Cookies.set('authToken', adminData.token, { secure: true, httpOnly: true });
  
          
          loginSuccess(adminData);
  
          
          navigate('/admin');
        } else {
          const errorData = await response.json();
          console.error('Admin login failed:', errorData.message);
        }
      } catch (error) {
        console.error('Error during admin login:', error);
      }
  };
  
 
  return (
    <div className="login-container">
      <div className="top-bar">
        <Link to="/">Back to Home</Link>
      </div>
      <h1 className="login-heading">Login</h1>
      <div className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleLogin} className="login-button">
          Login
        </button>

        <button onClick={handleAdminLogin} className="login-button">
          Admin
        </button>

        <p className="signup-link">
          If you don't have an account, click <Link to="/signup">signup</Link>.
        </p>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  loginSuccess,
};

export default connect(null, mapDispatchToProps)(LoginPage);
