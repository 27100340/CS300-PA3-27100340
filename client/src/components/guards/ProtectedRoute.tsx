import { useAuth } from "../../contexts/AuthContext";
import { Navigate} from "react-router-dom";
import type { ReactNode } from "react";
import { Navbar } from "../Navbar";

type props = { children: ReactNode };
const ProtectedRoute = ({ children }: props) => {
    const { loading, user } = useAuth();
    if (loading) {
        return null;
    }
    if (!user) {
        return <Navigate to="/login" replace/>;
    }

    return <><Navbar/>{children}</>;
}

export default ProtectedRoute;