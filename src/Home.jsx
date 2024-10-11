import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
    const navigate = useNavigate();

    const loginHandler = () => {
        navigate('/login'); // Navigate to the Login component
    };

    const signupHandler = () => {
        navigate('/signup'); // Navigate to the Signup component
    };

    return (
        <div className="home-container">
            <div className="title">
                <h1 className="name">Welcome to HandBook</h1>
            </div>
            <div className="role">
               
               
                <p className="designer-role">Where you can share your thoughts</p><br></br>
               
            </div>

            <h3 className="login-prompt">Login to continue</h3>
            <div className="button-container">
                <button onClick={loginHandler} type="button" className="btn btn-warning">Login</button>
                <button onClick={signupHandler} type="button" className="btn btn-success">Sign Up</button>
            </div>

            <a href="https://youtu.be/7d2XsPSjjjI" target="_blank" rel="noopener noreferrer">
                <footer>
                    <div className="texto">
                        <span>
                            <i className="fab fa-youtube"></i> watch on youtube
                        </span>
                    </div>
                </footer>
            </a>
            <div className="scanlines"></div>
        </div>
    );
}

export default Home;
