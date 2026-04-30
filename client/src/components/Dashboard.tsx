import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import '../style/Dashboard.css'
const Dashboard = () => {
    const{user} = useAuth();
    const navigator = useNavigate();
    return (
        <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.username}!</h2>
        <p>Choose an option below to continue</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card play-card">
          <div className="card-icon">🎮</div>
          <h3>Play Game</h3>
          <p>Join a lobby and play with other players</p>
          <button onClick={()=>navigator("/newgame/lobby")}  className="card-button">Start Playing</button>
        </div>

        <div className="dashboard-card leaderboard-card">
          <div className="card-icon">🏆</div>
          <h3>Leaderboard</h3>
          <p>Check global rankings and player stats</p>
          <button onClick={()=>navigator("/leaderboard")}  className="card-button">View Rankings</button>
        </div>
        <div className="dashboard-card history-card">
          <div className="card-icon">📊</div>
          <h3>Game History</h3>
          <p>Review your past matches and results</p>
          <button onClick={()=>navigator("/history")} className="card-button">View History</button>
        </div>
      </div>

      <div className="stats-section">
        <h3>Your Stats</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-label">Total Games</span>
            <span className="stat-value">24</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Wins</span>
            <span className="stat-value">8</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Win Rate</span>
            <span className="stat-value">33%</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total Coins</span>
            <span className="stat-value">{user?.coins}</span>
          </div>
        </div>
      </div>
    </div>
    )
}

export default Dashboard;

