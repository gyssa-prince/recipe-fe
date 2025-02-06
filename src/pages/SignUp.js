// src/components/SignUp.js
import React, { useState } from 'react';
import './SignUp.css'; // Import the CSS file for styling

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState(''); // Separate state for email
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add simple validation
    if (username === '' || email === '' || password === '') {
      setError('All fields are required.');
      return;
    }
    console.log('Sign Up:', { username, email, password });
    setError(''); // Clear error on successful submission
    // Reset fields
    setUsername('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2 className="signup-title">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && <p className="error-message">{error}</p>}

          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Names
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your names"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-button">
            Sign Up
          </button>

          <p className="footer-text">
            Already have an account? <a href="/sign-in" className="footer-link">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
