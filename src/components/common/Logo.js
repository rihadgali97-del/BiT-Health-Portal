import React from 'react';
import logoImage from '../../assets/img.png';

const Logo = ({ size = 'medium' }) => {
    const sizes = {
        small: '30px',
        medium: '50px',
        large: '80px'
    };

    return (
        <img
            src={Logo}
            alt="Bahir Dar University Logo"
            style={{
                height: sizes[size],
                width: 'auto'
            }}
        />
    );
};

export default Logo;