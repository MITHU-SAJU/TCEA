import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import logo from '../assets/logo.jpeg';
import signup from '../assets/signup.webp';
import login from '../assets/login.png';

const NavBar = () => {
  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/member">Member</Link>
        </li>
        <li>
          <Link to="/supplier">Supplier</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        </ul>

        <ul className='custom-icon1'>
        <li className='icon1'>
          <Link to="/login">
            <img src={login} alt="Login" className="custom-icon" /> {/* Custom Login icon */}
          </Link>
        </li>
        <li>
          <Link to="/signup">
            <img src={signup} alt="Sign Up" className="custom-icon" /> {/* Custom Sign Up icon */}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
