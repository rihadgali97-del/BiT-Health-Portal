import React from 'react';
import logoImage from 'public\favicon.ico';

const Logo = ({ size = 'medium' }) => {
    const sizes = {
        small: '30px',
        medium: '50px',
        large: '80px'
    };

    return (
        <img
            src={logoImage}
            alt="Bahir Dar University Logo"
            style={{
                height: sizes[size],
                width: 'auto'
            }}
        />
    );
};

export default Logo;