import type { NavigateFunction } from "react-router-dom";
const handlesignup = async (pw: string, cpw: string, name: string, dob: string, setError: React.Dispatch<React.SetStateAction<string>>, navigator: NavigateFunction): Promise<void> => {
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
    const req = await fetch("http://localhost:8000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name, pw: pw, dob: dob }),
        credentials:"include",
    });

    const response = await req.json();

    if (req.status == 400) {
        setError(response.message);
        return;
    }


    if (req.status == 409) {
        setError("User with username: " + name + " already exists!");
        return;
    }
    if (req.status == 500) {
        setError("Error signing you up, please check backend!");
        return;
    }

    //success
    if (req.status == 201) {
        navigator("/home");
    }
    console.log(response);
}

export default handlesignup;