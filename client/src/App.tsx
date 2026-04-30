
import './App.css'
import Signup from './components/Signup'
import { Routes, Route } from "react-router-dom"
import Home from './components/home'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import ProtectedRoute from './components/guards/ProtectedRoute'
import socket from './utils/socket'
import { useEffect } from 'react'
import History from './components/History'
import UpdateProfile from './components/UpdateProfile'
import Leaderboard from './components/Leaderboard'
import { Lobby } from './components/Lobby'
function App() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("socket id: " + socket.id);
    });

    socket.on("connect_error", (err) => console.log("socket error:", err.message));
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/newgame/lobby' element={<ProtectedRoute><Lobby /></ProtectedRoute>} />
      <Route path='/leaderboard' element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
      <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>} />
      <Route path='/update-profile' element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default App
