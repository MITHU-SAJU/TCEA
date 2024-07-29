import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', { name, email, password });
      alert('Signup successful')
      navigate('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='signup-bg'>
      <div className='signup-form'>
      <h2 className='sign-h2'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button className="signup-button" >
  <span>SIGNUP</span>
</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
