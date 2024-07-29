// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-address">
          <h4>Contact Us</h4>
          <p>Tirupur Civil Engineers Association</p>
          <p>123 Engineering Street, Tirupur, Tamil Nadu, India</p>
          <p>Phone: +91 12345 67890</p>
          <p>Email: info@tcea.com</p>
        </div>
        <div className="footer-digital">
        <h4>Digital contact</h4>
          <p>Phone: +91 98422 05953</p>
          <p>+91 99944 28120</p>
          <p>+91 98420 36442</p>
          <p>Email: info@tcea.in</p>
          <p>Web: www.tcea.in</p>
        </div>
        <div className="footer-map">
          <iframe
            title="TCEA Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.0000000000005!2d77.32000000000002!3d11.120000000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba98d7d00000001%3A0x0000000000000000!2sTirupur%20Civil%20Engineers%20Association!5e0!3m2!1sen!2sin!4v1614178190000!5m2!1sen!2sin"
            width="300"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    
    </footer>
  );
};

export default Footer;
