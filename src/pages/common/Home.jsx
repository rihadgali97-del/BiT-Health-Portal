import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import '../../styles/Home.css';

const Home = ({ navigateTo }) => {
    return (
        <div className="home-page">

            {/* Navigation Bar */}
            <Navbar navigateTo={navigateTo} />

            {/* Hero Section */}
            <section className="hero-section">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">BiT Health & Wellness Companion</h1>
                        <p className="hero-description">
                            Access medical services, schedule appointments with campus doctors,
                            manage your health records, and discover wellness resources - all in one secure platform.
                        </p>

                        <div className="hero-buttons">
                            <button
                                onClick={() => navigateTo('register')}
                                className="btn btn-primary hero-btn"
                            >
                                Get Started Today
                            </button>
                        </div>

                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

        </div>
    );
};

export default Home;
