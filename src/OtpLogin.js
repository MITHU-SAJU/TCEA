import React, { useState } from 'react';
import { auth, firebase } from '../firebase'; // Adjust the path as per your project structure
import './OtpLogin.css';


const OtpLogin = ({ }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const sendOtp = async () => {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible'
    });
    try {
      const result = await auth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
      setConfirmationResult(result);
    } catch (error) {
      console.error('Error sending OTP:', error.message);
      alert('Error sending OTP: ' + error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      window.location.href = 'https://mithu-saju.github.io/femmie-fit-tailor/';
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
      alert('Error verifying OTP: ' + error.message);
    }
  };

  return (
    <div className="otp-login-container">
      <h1>OTP Login</h1>
      <input
        type="text"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
      />
      <button onClick={sendOtp} className="btn-66">Send OTP</button>
      <input
        type="text"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        placeholder="OTP"
      />
      <button onClick={verifyOtp} className="btn-66">Verify OTP</button>
    
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default OtpLogin;
