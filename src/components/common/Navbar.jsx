import React from 'react';
import '../../styles/Navbar.css';
import Logo from '../../assets/img.png'

const Navbar = ({ navigateTo }) => {
    return (
        <header className="header-section">
            <nav className="navbar">
                <div className="container nav-content">
                    <div className="logo">
                        {/* Replace logo-icon with your image */}
                        <img
                            src={Logo}
                            alt="Bahir Dar University Logo"
                            className="logo-image"
                        />
                        <h2>BiT Health Portal</h2>
                    </div>
                    <div className="nav-links">
                        <button onClick={() => navigateTo('home')} className="nav-link btn-link">Home</button>
                        <button onClick={() => navigateTo('features')} className="nav-link btn-link">Features</button>
                        <button onClick={() => navigateTo('blog')} className="nav-link btn-link">Blog</button>
                        <button onClick={() => navigateTo('contact')} className="nav-link btn-link">Contact</button>
                        <button onClick={() => navigateTo('login')} className="nav-link btn-link">Login</button>
                        <button onClick={() => navigateTo('register')} className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;