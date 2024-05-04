import React, { useEffect, useState } from 'react';
import './popup.css';
import { auth } from './firebase-config';  // Ensure this path is correct
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

function Popup({ show, setShow }) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (show === 'register' && !isFlipped) {
            setIsFlipped(true);
        } else if (show === 'login' && isFlipped) {
            setIsFlipped(false);
        }
    }, [show, isFlipped]);

    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setShow(null);
            setError('');
        } catch (error) {
            setError('Failed to log in: ' + error.message);
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();
        const name = event.target.elements.name.value;
        const email = event.target.elements.email.value;
        const password = event.target.elements.password_.value;
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setShow(null);
            setError('');
        } catch (error) {
            setError('Failed to register: ' + error.message);
        }
    };

    const handleToggleFlip = () => {
        setIsFlipped(!isFlipped);
        setShow(show === 'login' ? 'register' : 'login');
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setShow(null);
        setIsFlipped(false);
        setError('');
    };


    return (
        <div className={`card ${show ? 'show' : ''} ${isFlipped ? 'rotate' : ''}`} onClick={handleClose}>
            <div className="inner" onClick={e => e.stopPropagation()}>
                <div className={`login ${show === 'login' ? 'active' : ''}`}>
                    <form onSubmit={handleLogin}>
                        <h3>Login</h3>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="form-control">
                            <input type="text" id="email" required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-control">
                            <input type="password" id="password" required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="submit">Login</button>
                        <a onClick={handleToggleFlip}>Don't have an account?</a>
                    </form>
                </div>
                <div className={`signup ${show === 'register' ? 'active' : ''}`}>
                    <form onSubmit={handleRegister}>
                        <h3>Create an account</h3>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className="form-control">
                            <input type="text" name="name" required />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-control">
                            <input type="text" name="email" required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-control">
                            <input type="password" name="password_" required />
                            <label htmlFor="password_">Password</label>
                        </div>
                        <button type="submit">Signup</button>
                        <a onClick={handleToggleFlip}>Already have an account?</a>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Popup;
