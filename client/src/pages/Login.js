import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
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
        setTimeout(() => navigate('/dashboard'), 1500);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            SkillSync
          </h1>
          <h2 className="text-2xl font-semibold text-gray-800">Login</h2>
          <p className="text-gray-600 mt-2">Welcome back! Please login to continue.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Login
          </button>
        </form>
        
        {msg && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            msg.includes('successful') 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {msg}
          </div>
        )}
        
        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-700 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Login;