import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getApiBaseUrl from '../utils/getApiBaseUrl';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = getApiBaseUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post(`${apiBaseUrl}/api/auth/signup`, { email, password });
      setMsg('Signup successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      if (err.response?.data?.msg) {
        setMsg(err.response.data.msg);
      } else if (err.request) {
        setMsg('Network error: Could not connect to server. Is it running?');
      } else {
        setMsg('Signup failed. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
export default Signup;