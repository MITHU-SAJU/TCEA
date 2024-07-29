import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='login-bg'>
         <div className='login-form'>
         <h2 className='login-h2'>Login</h2>
    <form onSubmit={handleSubmit}>
   
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button className="login-button" >
  <span>LOGIN</span>
</button>
  
    </form>
    </div>
    </div>
  );
};

export default Login;
