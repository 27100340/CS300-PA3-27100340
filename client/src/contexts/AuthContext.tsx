import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type User = { username: string, coins: number };
export type AuthState = { user: User | null, loading: boolean, merequest: () => Promise<void>, logoutrequest: () => Promise<void> };
type props = { children: ReactNode };
const AuthContext = createContext<AuthState | undefined>(undefined);

const AuthProvider = ({ children }: props) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const merequest = async () => {

        try {
            const req = await fetch("http://localhost:8000/api/auth/me", {
                credentials: "include",
                method: "GET",
                headers: { "Content-Type": "application/json" },
            })

            const res = await req.json();
            console.log(res);
            if (req.status == 200) {
                setUser(res);
                return
            }
            setUser(null);
        }
        catch (err) {
            console.log("AuthProvider Error")
        }
        finally {
            setLoading(false);
        }
    }

    const logoutrequest = async () => {

        try {
            const req = await fetch("http://localhost:8000/api/auth/logout", {
                credentials: "include",
                method: "POST",
                headers: { "Content-Type": "application/json" },
            })

            const res = await req.json();
            console.log(res);
            if (req.status == 200) {
                setUser(null);
                return
            }
        }
        catch (err) {
            console.log("AuthProvider Error")
        }
    }

    useEffect(() => {
        merequest()
    }, []);

    return <AuthContext.Provider value={{ user, loading, merequest, logoutrequest }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be inside AuthProvider");
    return ctx;
};

export default AuthProvider;