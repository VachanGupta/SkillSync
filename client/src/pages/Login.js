import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import getApiBaseUrl from '../utils/getApiBaseUrl';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const apiBaseUrl = getApiBaseUrl();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    try {
      const res = await axios.post(`${apiBaseUrl}/api/auth/login`, { email, password });

      const token = res?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
        setMsg('Login successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } else {
        setMsg('Login failed: No token received');
      }
    } catch (err) {
      const responseMessage = err.response?.data?.msg;
      const message = responseMessage || (err.request ? 'Network error: Could not connect to server. Is it running?' : 'Login failed');
      setMsg(message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
export default Login;