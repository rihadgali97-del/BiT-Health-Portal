import React from 'react';
import LoginForm from '../../components/auth/LoginForm';
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
const Login = ({ navigateTo, onLogin }) => {
    return (
        <div>
            <Navbar navigateTo={navigateTo} />
        <LoginForm
            navigateTo={navigateTo}
            onLogin={onLogin}
        />
            <Footer/>
        </div>
    );

};

export default Login;