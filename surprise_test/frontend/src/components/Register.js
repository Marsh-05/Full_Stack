import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post('http://localhost:8080/api/users/register', { username, password });
      alert("Registration Successful! Please log in.");
      navigate('/login');
    } catch (error) {
      alert("Registration failed. Username might already exist.");
    }
  };

  return (
    <div className="card auth-card">
      <h2>Create an Account</h2>
      <input type="text" placeholder="Choose a Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Choose a Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="btn-primary" onClick={handleRegister}>Register</button>
      <p style={{ marginTop: '20px', fontSize: '14px' }}>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
}

export default Register;