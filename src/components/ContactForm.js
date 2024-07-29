import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css'; // Import the CSS file
import loc from '../assets/loc.png';
import dig from '../assets/dig.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ContactForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:5000/contact', { name, email, message });
            setResponseMessage(res.data.message);
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setResponseMessage('Failed to submit contact form');
        }
    };

    return (
        <div className="contact-bg">
            <div className="contact-container">
                <div className="left-section">
                    <div className="address">
                        <img src={loc} alt="Location Logo" className="logoloc" />
                        <p>
                            <b>Administrative Office</b><br />
                            Tirupur Civil Engineers Association<br />
                            K.N.S Garden, Indian Oil Bunk Backside,<br />
                            Near Pazhagodown Bus Stop,<br />
                            Mangalam Road,<br />
                            TIRUPUR - 641 604,<br />
                            Tamilnadu, India
                        </p>
                        <img src={dig} alt="Digital Logo" className="logodig" />
                        <p className="dc">
                            <b>Digital Contact</b><br />
                            Phone: +91 98422 05953<br />
                            +91 99944 28120<br />
                            +91 98420 36442<br />
                            Email: info@tcea.in<br />
                            Web: www.tcea.in
                        </p>
                    </div>
                    <div className="button">
                       
                        
                        <button onClick={() => window.location.href='https://youtube.com'}><i className="fab fa-youtube"></i></button>
                        <button onClick={() => window.location.href='https://facebook.com'}><i className="fab fa-facebook-square"></i></button>
                        <button onClick={() => window.location.href='https://twitter.com'}><i className="fab fa-twitter-square"></i></button>
                        <button onClick={() => window.location.href='https://instagram.com'}><i className="fab fa-instagram"></i></button>
                    </div>
                </div>
                <div className="right-section">
                    <div className="contact-form-container">
                        <h2>Contact Us</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Message:</label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                        {responseMessage && <p>{responseMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
