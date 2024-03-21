// Register.tsx
import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link'; // Import Link from Next.js
import '../styles/css/Login.css';

interface RegisterFormProps {
  onRegisterSuccess: () => void;
}

const Register: React.FC<RegisterFormProps> = ({ onRegisterSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://your-api-server/register', {
        name,
        email,
        username,
        password,
      });

      // Assuming your server returns a token upon successful registration
      const token = response.data.token;

      // Store the token in local storage or cookies as needed
      localStorage.setItem('token', token);

      // Trigger the onRegisterSuccess callback to handle the successful registration on the parent component
      onRegisterSuccess();
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, e.g., display an error message to the user
    }
  };

  return (
    <div className="registerContainer" style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      <form onSubmit={handleRegister}>
        <h3>Register</h3>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {/* <br /> */}
        <Link style={{ fontSize: "1rem", marginLeft:"10px" }} href="/auth/signIn/page"> {/* Specify the path to your login page */}
          <a style={{ textDecoration: "none", fontSize: "1rem"}} className=''>Go to Register</a>
        </Link>

        <div className='registerButtonContainer' style={{ display: "flex", justifyContent: "", alignItems:"center", marginTop:"10px" }}>
          <button className='buttonRegister' style={{fontSize:"1rem"}} type="submit">Register</button>
          
        </div>
      </form>
    </div>
  );
};

export default Register;
