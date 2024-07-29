import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import Member from './components/Member';

import ContactForm from './components/ContactForm';
import SupplierForm from './components/Supplier';

const App = () => {
  return (
    <Router>
      <NavBar />
      
      <Routes>
     
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/member" element={<Member />} />
        <Route path="/supplier" element={<SupplierForm />} />
       
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
