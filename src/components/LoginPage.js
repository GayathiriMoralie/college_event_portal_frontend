import React, { useState } from "react";
import "./LoginPage.css"; // Ensure you have the necessary CSS for styling

const LoginPage = () => {
    const [role, setRole] = useState("Student");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userInput, setUserInput] = useState("");
    const [message, setMessage] = useState("");

    const BACKEND_URL = "https://college-event-portal-backend.onrender.com/api/login";

    function generateCaptcha() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        if (userInput !== captcha) {
            setMessage("❌ Incorrect Captcha");
            refreshCaptcha();
            return;
        }

        try {
            const response = await fetch(`https://college-event-portal-backend.onrender.com/api/login`, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    role: role.toLowerCase(), // Convert role to lowercase
                    id: id.trim(), // Remove extra spaces
                    password: password.trim()
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("✅ Login successful!");
                setTimeout(() => {
                    window.location.href = role === "Student" ? "/student-home" : "/faculty-home";
                }, 1000);
            } else {
                setMessage("❌ Invalid credentials");
            }
        } catch (error) {
            setMessage("❌ Server error. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <h2>College Event Portal Login</h2>
            <form onSubmit={handleLogin}>
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                </select>

                <label>{role === "Student" ? "Student ID" : "Faculty Staff ID"}:</label>
                <input
                    type="text"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    required
                />

                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <div className="captcha-container">
                    <span>{captcha}</span>
                    <button type="button" onClick={refreshCaptcha}>🔄 Refresh</button>
                </div>
                
                <label>Enter Captcha:</label>
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    required
                />

                <button type="submit">Login</button>
                {message && <p className="message">{message}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
