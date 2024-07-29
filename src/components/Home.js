// src/components/Home.js
import React from 'react';
import './Home.css';
import './AboutUs.css';
import homeImage from '../assets/home.jpg';
import image1 from '../assets/1image.jpg';
import image2 from '../assets/2image.jpg';
import image3 from '../assets/homimg3.jpg'; // Corrected image name
import image4 from '../assets/image4.jpg';
import image5 from '../assets/image5.jpg';
import image6 from '../assets/image6.jpg';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="home-page">
      <div className="home-bg">
        <div className="home-image-container">
          <img src={homeImage} alt="Background" className="home-image" />
        </div>
        <div className="home-text">
          <h1>WELCOME TO TIRUPUR CIVIL ENGINEERS ASSOCIATION</h1>
          <p>Connecting Professionals. Building the Future.</p>
          <div className="home-container">
            <div className="card">
              <p className="head"><b>ER.K.RAMESH@ARUN</b></p>
              <p>President</p>
              <img src={image1} alt="Project 1" />
            </div>
            <div className="card">
              <p className="head"><b>ER.G. GEORGELEO ANAND</b></p>
              <p>Secretary</p>
              <img src={image2} alt="Project 2" />
            </div>
            <div className="card">
              <p className="head"><b>ER.S.SAMPATHKUMAR</b></p>
              <p>Treasurer</p>
              <img src={image3} alt="Project 3" />
            </div>
            <div className="card">
              <p className="head"><b>ER.V.JANARTHANAN</b></p>
              <p>Vice President</p>
              <img src={image4} alt="Project 3" />
            </div>
            <div className="card">
              <p className="head"><b>ER.S.JAYARAMAN</b></p>
              <p>Immediate Past President</p>
              <img src={image5} alt="Project 3" />
            </div>
            <div className="card">
              <p className="head"><b>ER.R.GOWTHAM</b></p>
              <p>Joint Secretary</p>
              <img src={image6} alt="Project 3" />
            </div>
          </div>
        </div>
      </div>
      <div className="about-bg">
        <div className="about-container">
          <h1>ABOUT TCEA</h1>
          <p>
            Tirupur Civil Engineers Association is a vibrant body composed of expert professionals in the field of Civil Engineering.
            The evolution of Tirupur, one of the renowned industrial hubs of south India, from an unknown and undeveloped piece of land into a region of phenomenal growth in all the spheres of activity, from textiles companies and colleges to hospitals and SME units, can be attributed to the unceasing and ingenious efforts of this elite Association.
          </p>
          <h1>Profession</h1>
          <p>
            A civil engineer is a person who practices civil engineering; the application of planning, designing, constructing, maintaining, and operating infrastructures while protecting the public and environmental health, as well as improving existing infrastructures that have been neglected. Originally, a civil engineer worked on public works projects and was contrasted with the military engineer, who worked on armaments and defenses. Over time, various branches of engineering have become recognized as distinct from civil engineering, including chemical engineering, mechanical engineering, and electrical engineering, while much of military engineering has been absorbed by civil engineering.
          </p>
          <p>
            "To create, disseminate and integrate knowledge of engineering, science and technology that expands our civil and environmental engineering knowledge base, which in turn enables the betterment of human society."
          </p>
          <p>
            "To be recognized by our peers as a highly effective leader in the interdisciplinary research and the development of innovative approaches."
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
