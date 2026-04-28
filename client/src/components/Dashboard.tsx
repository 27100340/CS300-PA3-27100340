import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
    const { user, logoutrequest } = useAuth();
    return (
        <>
            <h1>Under construction</h1>
            <p>Logged in as {user?.username} ({user?.coins} coins)</p>
            <button onClick={() => logoutrequest()}>Logout</button>
        </>
    )
}

export default Dashboard;

