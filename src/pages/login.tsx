// LoginForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
// import '../styles/css/Login.css'

interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Replace 'http://your-api-server/login' with your actual login API endpoint
      const response = await axios.post('http://your-api-server/login', {
        username,
        password,
      });

      // Assuming your server returns a token upon successful login
      const token = response.data.token;

      // Store the token in local storage or cookies as needed
      localStorage.setItem('token', token);

      // Trigger the onLoginSuccess callback to handle the successful login on the parent component
      onLoginSuccess();
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, e.g., display an error message to the user
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <br />
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <br />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

// For Later
// ### https://www.youtube.com/watch?v=w2h54xz6Ndw1
