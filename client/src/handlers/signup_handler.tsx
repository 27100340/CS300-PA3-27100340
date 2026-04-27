
const handlesignup = async (pw: string, cpw: string, name: string, dob: string, setError: React.Dispatch<React.SetStateAction<string>>): Promise<void> => {
    if (pw.length < 6 && pw.length != 0) {
        console.log("Password must be atleast 6 characters!!");
        setError("Password must be atleast 6 characters!!");
        return;
    }
    if (pw != cpw) {
        console.log("Passwords dont match!!!")
        setError("Passwords dont match!!!")
        return;
    }
    if (dob.length == 0) {
        setError("Please enter a valid date of birth!")
        return;
    }
    if (name.length < 2 || name.length > 20) {
        setError("Username must be between 2 and 20 characters!")
        return;
    }
    const res = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, pw: pw, dob: dob }),
    });

    const response = await res.json();
    console.log(response);
}

export default handlesignup;