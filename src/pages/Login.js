// src/pages/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      if (existingUser.password === password) {
        localStorage.setItem('user', JSON.stringify(existingUser));
        setIsLoggedIn(true);
        alert('Login successful!');
        navigate('/');
      } else {
        alert('Incorrect password!');
      }
    } else {
      const newUser = {
        id: Date.now(),
        email,
        password,
      };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      localStorage.setItem('user', JSON.stringify(newUser));
      setIsLoggedIn(true);
      alert('Account created and logged in!');
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login / Signup</h2>
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
}

export default Login;
