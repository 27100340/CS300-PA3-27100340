import '../style/Lobby.css'
import type { PlayerI, RoomI } from '../interfaces/lobby_interfaces'
import { useEffect, useState } from 'react'
import socket from '../utils/socket'
import { useNavigate } from 'react-router-dom'

export const Lobby = () => {
    const [room, setRoom] = useState<RoomI | null>(null)
    useEffect(() => {
        socket.emit("room:join");
        socket.on("lobby:state", (room: RoomI) => setRoom(room))

        return () => {
            socket.emit("room:leave")
            socket.off("lobby:state");
        }
    }, [])
    const navigator = useNavigate();
    return (
            <div className="page">
                <div className="lobby-container">
                    <div className="lobby-header">
                        <h1 className="lobby-title">🎲 LUDO</h1>
                        <p className="lobby-subtitle">Classic Board Game Experience</p>
                    </div>

                    <div className="lobby-card">
                        <h2>Game Lobby</h2>

                        <div className="players-grid">
                            {[0, 1, 2, 3].map((i) => {
                                const player = room?.players[i]
                                if (player) {
                                    return (
                                        <div key={i} className="player-slot filled">
                                            <div className="player-slot-label">Player {i + 1}</div>
                                            <div className="player-slot-name">{player.username}</div>
                                            <div className={`player-slot-color ${player.color}`}></div>
                                        </div>
                                    )
                                }
                                return (
                                    <div key={i} className="player-slot empty">
                                        <div className="player-slot-label">Player {i + 1}</div>
                                        <div className="player-slot-name">Waiting...</div>
                                        <div className="player-slot-color none"></div>
                                    </div>
                                )
                            })}
                        </div>

                        <button onClick={()=>socket.emit("game:start")} className="start-button" id="start-btn" disabled={!room || room.players.length < 2}>
                            Start Game ({room?.players.length ?? 0}/4 Players)
                        </button>
                        <div className="lobby-footer">
                            <p  id="player-count">{room?.players.length ?? 0} player{room?.players.length === 1 ? "" : "s"} 1 player ready</p>
                            <button onClick={()=>navigator("/home")} className="back-button">Go Back</button>
                        </div>
                    </div>
                </div>
            </div>
    )
}