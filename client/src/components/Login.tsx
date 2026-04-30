import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import handleLogin from "../handlers/login_handler";
import { useAuth } from "../contexts/AuthContext";
const Login = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [error, setError] = useState("");
    const { merequest } = useAuth();

    const navigator = useNavigate();

    useEffect(() => {
        setError("");
    }, [name, pw])

    return (
        <div className="page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1 onClick={() => navigator("/")} className="auth-title">🎲 LUDO</h1>
                    <p className="auth-subtitle">Welcome Back</p>
                </div>

                <div className="auth-card">
                    <h2>Login</h2>

                    <form id="login-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-input"
                                placeholder="Enter your username"
                                required
                                minLength={2}
                                maxLength={20}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                value={pw}
                                onChange={(e) => setPw(e.target.value)}
                                className="form-input"
                                placeholder="Enter your password"
                                required
                                minLength={6}
                            />
                        </div>

                        <button type="button" onClick={() => handleLogin(name, pw, setError, navigator, merequest)} className="form-button">Login</button>
                    </form>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <div className="auth-footer">
                        <p>Don't have an account? <button onClick={() => navigator("/signup")} className="auth-link">Sign Up</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;