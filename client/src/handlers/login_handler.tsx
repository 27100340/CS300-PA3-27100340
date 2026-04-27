const handleLogin = async (name: string, pw: string, setError: React.Dispatch<React.SetStateAction<string>>) => {
    const req = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, password: pw }),
    }
    )

    const resp = await req.json();

    console.log(resp);
}

export default handleLogin;
