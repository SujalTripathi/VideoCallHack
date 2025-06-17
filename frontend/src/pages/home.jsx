import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css'; // your custom styles
import 'animate.css'; // for animations

const Home = () => {
  const handleScroll = () => {
    const section = document.getElementById('features');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* Page 1: Welcome / Hero */}
      <section className=" page-section hero-section d-flex flex-column justify-content-center align-items-center text-center bg-gradient hero-padding">
        <div className=" bg-gradient content-container bg-white bg-opacity-95 p-5 rounded shadow-lg max-w-700 text-dark animate__animated animate__fadeInDown">
          <h1 className="display-3 fw-bold mb-4">Welcome to Virtual Video Call</h1>
          <p className="lead fs-4 mb-4">
            Connect with anyone, anywhere. Start a virtual meeting with ease and security.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <button className="btn btn-primary btn-lg px-5 py-3 shadow hover-shadow" onClick={handleScroll}>
              Get Started
            </button>
            <Link to="/auth" className="btn btn-outline-primary btn-lg px-5 py-3 shadow hover-shadow">
              Sign Up
            </Link>
          </div>
        </div>
      </section>

      {/* Page 2: Features & Benefits */}
      <section id="features" className=" bg-gradient page-section features-section bg-light py-5">
        <div className="container text-center">
          <h2 className="mb-5 animate__animated animate__fadeInUp">Why Choose Our Video Call Service?</h2>
          <div className="row g-4 justify-content-center">
            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="card p-4 shadow h-100 bg-white rounded hover-shadow transition">
                <img
                  src="https://img.icons8.com/ios/80/000000/video-call.png"
                  alt="Easy to Use"
                  className="mx-auto mb-3"
                />
                <h5 className="mb-3">Easy to Use</h5>
                <p>Start or join calls with just a few clicks. No complicated setups.</p>
              </div>
            </div>
            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="card p-4 shadow h-100 bg-white rounded hover-shadow transition">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/007/447/922/large_2x/concept-of-cyber-security-information-security-and-encryption-secure-access-to-user-s-personal-information-secure-internet-access-cybersecurity-photo.jpg"  style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                  alt="Secure"
                  className="mx-auto mb-3"
                />
                <h5 className="mb-3">Secure</h5>
                <p>Your meetings are protected with end-to-end encryption for privacy.</p>
              </div>
            </div>
            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="card p-4 shadow h-100 bg-white rounded hover-shadow transition">
                <img
                  src="https://th.bing.com/th/id/OIP.AJPNkCiLcKo1dbrSFhzPvwHaFj?r=0&cb=thvnextc1&rs=1&pid=ImgDetMain"   style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                  alt="High Quality"
                  className="mx-auto mb-3"
                />
                <h5 className="mb-3">High Quality</h5>
                <p>Enjoy smooth, high-definition video calls across devices.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

        {/* Page 3: Today make your videocall */}

        <section className="bg-gradient page-section bg-white py-5">
        <div className="container text-center">
          <h2 className="mb-5 animate__animated animate__fadeInUp">Start Your Video Call Today!</h2>
          <p className="lead mb-4">
            Join the thousands of users who trust us for their video communication needs.
          </p>
          <Link to="/auth" className="btn btn-primary btn-lg px-5 py-3 shadow hover-shadow">
            Sign Up Now
          </Link>
          </div>
          </section>

      
    </div>
  );
};

export default Home;