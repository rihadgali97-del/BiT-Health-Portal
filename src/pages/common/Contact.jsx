import React from 'react';
import '../../styles/contact.css';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';

const Contact = ({ navigateTo }) => {
    return (
        <div className="home-page">
            <Navbar navigateTo={navigateTo} />

            <main className="page-content">
                <section className="contact-section">
                    <div className="container">
                        <div className="section-header">
                            <h2 className="section-title">Contact Us</h2>
                            <p className="section-description">
                                Get in touch with our health services team. We're here to assist you!
                            </p>
                        </div>

                        <div className="contact-content">
                            <div className="contact-info">
                                <div className="contact-item">
                                    <div className="contact-icon">📍</div>
                                    <div>
                                        <h4>Health Center Location</h4>
                                        <p>BiT Campus, Building A, Floor 2</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">📞</div>
                                    <div>
                                        <h4>Emergency Contact</h4>
                                        <p>+1 (555) 123-HELP</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">✉️</div>
                                    <div>
                                        <h4>Email</h4>
                                        <p>healthportal@university.edu</p>
                                    </div>
                                </div>
                                <div className="contact-item">
                                    <div className="contact-icon">🕒</div>
                                    <div>
                                        <h4>Hours</h4>
                                        <p>Mon-Fri: 8:00 AM - 6:00 PM</p>
                                    </div>
                                </div>
                            </div>

                            <div className="contact-form">
                                <h4>Send us a message</h4>
                                <form>
                                    <input type="text" placeholder="Your Name" required />
                                    <input type="email" placeholder="Your Email" required />
                                    <textarea placeholder="Your Message" rows="5" required></textarea>
                                    <button type="submit" className="btn btn-primary">Send Message</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Contact;
