import type { NavigateFunction } from "react-router-dom";
const handleLogin = async (name: string, pw: string, setError: React.Dispatch<React.SetStateAction<string>>, navigator: NavigateFunction,useauthrefresher:()=>Promise<void>) => {
    if (name.length < 2 || name.length > 20) {
        setError("Username has to be between 2 and 20 characters!")
        return;
    }
    if (pw.length == 0) {
        setError("Password cannot be empty!");
        return;
    }

    const req = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password: pw }),
        credentials: "include",
    }
    )

    const resp = await req.json();
    if (req.status == 401 || req.status == 404) {
        setError("Incorrect Username or password")
        return;
    }

    if (req.status == 400) {
        setError(resp.message);
        return;
    }

    if (req.status == 200) {
        await useauthrefresher();
        navigator("/home");
        console.log(resp);
        return;
    }
}

export default handleLogin;
