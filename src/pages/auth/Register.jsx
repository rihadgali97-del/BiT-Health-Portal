import React from 'react';
import RegisterForm from '../../components/auth/RegisterForm';
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
const Register = ({ navigateTo, onRegister }) => {
    return (
        <div>
            <Navbar navigateTo={navigateTo} />
        <RegisterForm
            navigateTo={navigateTo}
            onRegister={onRegister}
        />
            <Footer/>
        </div>
    );
};

export default Register;