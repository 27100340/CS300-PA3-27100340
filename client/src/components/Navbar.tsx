import { useAuth } from "../contexts/AuthContext"
import '../style/Navbar.css'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
export const Navbar = () => {
    const {user,logoutrequest} = useAuth();
    const [open, setOpen] = useState(false);
    const navigator = useNavigate();

    return (<nav className="navbar">
        <div className="navbar-left">
            <Link to="/home" className="navbar-title">🎲 LUDO</Link>
        </div>
        <div className="navbar-right">
            <div className="coin-display">
                <span className="coin-icon">💰</span>
                <span className="coin-amount">{user?.coins}</span>
            </div>
            <div className="user-dropdown">
                <button onClick={()=>setOpen(p=>!p)} className="dropdown-btn">{user?.username} ▼</button>
                {open&&<div className="dropdown-menu">
                    <button onClick={()=>{setOpen(p=>!p);navigator("/update-profile")}}  className="dropdown-item">Update Profile</button>
                    <button onClick={()=>{logoutrequest();()=>setOpen(p=>!p)}} className="dropdown-item logout-btn">Logout</button>
                </div>}
            </div>
        </div>
    </nav>)
}