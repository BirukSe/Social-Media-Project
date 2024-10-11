import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import logo from './logo.jpeg'; // Adjust the path if needed

<img className="mb-4 logo" src={logo} alt="Logo" width="72" height="57" />


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://test-0enh.onrender.com/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            navigate('/card');

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="form-signin">
            <form onSubmit={handleSubmit}>
                <img 
                    className="mb-4 logo" 
                    src={logo} 
                    alt="Logo" 
                    width="72" 
                    height="57" 
                />
                <h1 className="h3 mb-3 fw-normal">Log In to Continue</h1>
                <div className="form-floating mb-3">
                    <input 
                        type="email" 
                        className="form-control" 
                        id="floatingInput" 
                        placeholder="name@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-4">
                    <input 
                        type="password" 
                        className="form-control" 
                        id="floatingPassword" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign In</button>
                <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p>
            </form>
        </main>
    );
}

export default Login;
