import { useEffect, useState } from "react";
import '../style/signup.css'
import handlesignup from "../handlers/signup_handler";
import { useNavigate } from "react-router-dom";
const Signup = () => {
    const [name, setName] = useState("");
    const [pw, setPw] = useState("");
    const [dob, setDob] = useState("");
    const [cpw, setCpw] = useState("");
    const [error, setError] = useState("");

    const navigator = useNavigate();

    useEffect(() => {
        if (error) {
            setError("");
        }
    }, [name,pw,dob,cpw])

    return (
        <div className="page">
            <div className="auth-container">
                <div className="auth-header">
                    <h1 onClick={()=>navigator("/home")} className="auth-title">🎲 LUDO</h1>
                    <p className="auth-subtitle">Create Your Account</p>
                </div>

                <div className="auth-card">
                    <h2>Sign Up</h2>

                    <form id="signup-form">
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-input"
                                placeholder="Choose a username"
                                required
                                minLength={2}
                                maxLength={20}
                            />
                            <span className="form-hint">Must be unique and 2-20 characters</span>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="dob">Date of Birth</label>
                            <input
                                type="date"
                                value={dob}
                                onChange={(e) => setDob(e.target.value)}
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input
                                type="password"
                                onChange={(e) => setPw(e.target.value)}
                                value={pw}
                                className="form-input"
                                placeholder="Enter a strong password"
                                required
                                minLength={6}
                            />
                            <span className="form-hint">Minimum 6 characters</span>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="confirm-password">Confirm Password</label>
                            <input
                                type="password"
                                value={cpw}
                                onChange={(e) => setCpw(e.target.value)}
                                className="form-input"
                                placeholder="Re-enter your password"
                                required
                                minLength={6}
                            />
                        </div>

                        <button type="button" onClick={() => handlesignup(pw, cpw, name, dob, setError)} className="form-button">Create Account</button>
                    </form>
                    <div>
                        {error && <p style={{color:"red"}} className="form-error">{error}</p>}
                    </div>
                    <div className="auth-footer">
                        <p>Already have an account? <button onClick={()=>navigator("/login")} className="auth-link">Login/</button></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;