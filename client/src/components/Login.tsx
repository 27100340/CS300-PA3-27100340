import { use, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [name,setName] = useState("");
    const [pw,setPw] = useState("");

    const navigator = useNavigate();

    return (
        <div className="page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1 onClick={()=>navigator("/home")} className="auth-title">🎲 LUDO</h1>
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
                                className="form-input"
                                placeholder="Enter your password"
                                required
                                minLength={6}
                            />
                        </div>

                        <button type="button"  className="form-button">Login</button>
                    </form>

                    <div className="auth-footer">
                        <p>Don't have an account? <button onClick={()=>navigator("/signup")} className="auth-link">Sign Up</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;