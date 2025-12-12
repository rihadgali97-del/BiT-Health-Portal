import React from 'react';
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import '../../styles/Footer.css'
import '../../styles/Navbar.css'
import '../../styles/Blog.css';

const Blog = ({ navigateTo }) => {
    return (
        <div className="home-page">
            <Navbar navigateTo={navigateTo} />

            <section className="blog-preview-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Health & Wellness Blog</h2>
                        <p className="section-description">
                            Expert advice and health tips from our campus doctors
                        </p>
                    </div>
                    <div className="blog-grid">
                        <div className="blog-card">
                            <div className="blog-icon">🧠</div>
                            <h3>Managing Exam Stress</h3>
                            <p>Practical tips to stay healthy and focused during finals week...</p>
                            <button className="btn-outline">Read More</button>
                        </div>
                        <div className="blog-card">
                            <div className="blog-icon">🍎</div>
                            <h3>Nutrition for Students</h3>
                            <p>Healthy eating habits on a student budget...</p>
                            <button className="btn-outline">Read More</button>
                        </div>
                        <div className="blog-card">
                            <div className="blog-icon">💤</div>
                            <h3>Sleep & Academic Performance</h3>
                            <p>How quality sleep impacts your grades and mental health...</p>
                            <button className="btn-outline">Read More</button>
                        </div>
                        <div className="blog-card">
                            <div className="blog-icon">🏃‍♂️</div>
                            <h3>Campus Fitness Guide</h3>
                            <p>Make the most of campus fitness facilities...</p>
                            <button className=" btn-outline">Read More</button>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default Blog;