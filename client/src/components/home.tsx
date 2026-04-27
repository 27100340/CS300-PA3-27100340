import '../style/home.css'
import { useNavigate } from 'react-router-dom'
import '../index.css'
const home = () => {

    const navigate = useNavigate();
    return (
        <div className="page">
            <div className="hero-container">
                <h1 className="hero-title">🎲 LUDO</h1>
                <p className="hero-subtitle">Classic Board Game Experience</p>

                <div className="form-card">
                    <h2>Welcome to LUDO</h2>

                    <div className="auth-options">
                        <p className="options-label">Join the Game</p>
                        <button type ="button" onClick={()=>navigate("/login")} className="option-button login-button"> 🔐 Login </button>
                        <button type = "button" onClick={()=>navigate("/signup")} className="option-button signup-button"> ✨ Sign Up </button>
                    </div>

                    <div className="rules-section">
                        <h3>Quick Rules</h3>
                        <ul>
                            <li>Roll the dice to move your tokens</li>
                            <li>Get all 4 tokens from home to the finish</li>
                            <li>First player to finish wins!</li>
                            <li>Capture opponents' tokens to send them home</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default home;