import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Registration.css';

function Registration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [termsAccepted, setTermsAccepted] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!termsAccepted) {
            alert('You must accept the terms and conditions.');
            return;
        }

        try {
            const response = await fetch('https://test-0enh.onrender.com/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            const data = await response.json();
            console.log('Signup successful:', data);
            navigate('/card'); // Redirect to Card component on success

        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <main className="form-signin">
            <form onSubmit={handleSubmit}>
                <h1 className="h3 mb-3 fw-normal">Sign Up</h1>
                <div className="form-floating">
                    <input 
                        type="text" 
                        className="form-control" 
                        placeholder="Your Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                    <label>Full Name</label>
                </div>
                <div className="form-floating">
                    <input 
                        type="email" 
                        className="form-control" 
                        placeholder="name@example.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    <label>Email address</label>
                </div>
                <div className="form-floating">
                    <input 
                        type="password" 
                        className="form-control" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    <label>Password</label>
                </div>
                <div className="form-check my-3">
                    <input 
                        className="form-check-input" 
                        type="checkbox" 
                        checked={termsAccepted} 
                        onChange={() => setTermsAccepted(!termsAccepted)} 
                    />
                    <label className="form-check-label">
                        I agree to the terms and conditions
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign Up</button>
            </form>
        </main>
    );
}

export default Registration;
