// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState(''); // <-- NEW
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cookieUser = getCookie('user');
    if (cookieUser) {
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      if (existingUser.password === password) {
        setCookie('user', JSON.stringify(existingUser), 7);
        setIsLoggedIn(true);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Incorrect password!');
      }
    } else {
      const newUser = {
        id: Date.now(),
        username, // <-- NEW
        email,
        password,
      };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setCookie('user', JSON.stringify(newUser), 7);
      setIsLoggedIn(true);
      alert('Account created and logged in!');
      navigate('/');
    }
  };

  const setCookie = (name, value, days) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
  };

  const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
      const parts = v.split('=');
      return parts[0] === name ? decodeURIComponent(parts[1]) : r;
    }, '');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login / Signup</h2>
        {/* Show username only for signup (i.e. new user) */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required={!isExistingUser(email)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login / Signup</button>
      </form>
    </div>
  );

  // Helper to determine if the email already exists
  function isExistingUser(email) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
  }
}

export default Login;
