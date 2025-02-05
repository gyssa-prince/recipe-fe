import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // Use named import

import './SignIn.css'; // Import the CSS file

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Authentication logic
    if (username === 'gyssagaraprince@gmail.com' && password === 'Prince123') {
      localStorage.setItem('auth', 'true');
      navigate('/dashboard');
    } else {
      setErrorMessage('Invalid credentials. Please try again.');
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential); // Use jwtDecode
    console.log("Info: ",decoded)
    const userName = decoded.name; // Extract the user's name
    localStorage.setItem("auth", "true");
    localStorage.setItem("userName", userName); // Store the user's name
    navigate("/dashboard");
  };

  const handleGoogleLoginError = () => {
    console.log('Google Login Failed');
    setErrorMessage('Google Sign-In failed. Please try again.');
  };

  return (
    <GoogleOAuthProvider clientId="516201385173-4t03gv41edv3tj9vvdf7qbkeqm90ni9j.apps.googleusercontent.com">
      <div className="signin-container">
        <div className="signin-form">
          <h2>Sign In</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className="submit-button">
              Sign In
            </button>

            <p className="signup-link">
              Don’t have an account? <a href="/sign-up">Sign up</a>
            </p>
          </form>

          <div className="google-signin">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default SignIn;