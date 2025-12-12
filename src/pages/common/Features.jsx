import React from 'react';
import '../../styles/Home.css';
import Navbar from '../../components/common/Navbar'
import Footer from  '../../components/common/Footer'
const Features = ({ navigateTo }) => {
    return (
        <div className="home-page">
            <Navbar navigateTo={navigateTo} />

            <section className="features-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Why Choose Our Health Portal?</h2>
                        <p className="section-description">
                            Comprehensive healthcare solutions designed specifically for university students
                        </p>
                    </div>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">📅</div>
                            <h3>Easy Appointments</h3>
                            <p>Book appointments with campus doctors in just a few clicks</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📋</div>
                            <h3>Health Records</h3>
                            <p>Access your medical history and prescriptions anytime</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">👨‍⚕️</div>
                            <h3>Expert Doctors</h3>
                            <p>Connect with qualified healthcare professionals on campus</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure & Private</h3>
                            <p>Your health data is protected with enterprise-grade security</p>
                        </div>
                    </div>
                </div>
            </section>
            <Footer/>
        </div>
    );
};

export default Features;