import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import clgImage from "../images/clg.jfif";

const LoginPage = () => {
    const [role, setRole] = useState("Student");
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [userInput, setUserInput] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();  // React Router navigation

    const BACKEND_URL = "https://college-event-portal-backend.onrender.com/api/login";

    function generateCaptcha() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    const refreshCaptcha = () => {
        setCaptcha(generateCaptcha());
        setUserInput("");  // Clear input when refreshing
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage(""); // Clear previous messages

        if (userInput !== captcha) {
            setMessage("❌ Incorrect Captcha");
            refreshCaptcha();
            return;
        }

        try {
            const response = await fetch(BACKEND_URL, { 
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    role: role,  // Keep casing as it is
                    id: id.trim(),
                    password: password.trim()
                }),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setMessage("✅ Login successful!");

                setTimeout(() => {
                    if (role === "Student") {
                        navigate("/StudentHomePage");
                    } else if (role === "Faculty") {
                        navigate("/FacultyHomePage");
                    } else {
                        setMessage("❌ Invalid role detected!");
                    }
                }, 1000);
            } else {
                setMessage(data.error || "❌ Invalid credentials");
            }
        } catch (error) {
            setMessage("❌ Server error. Please try again later.");
        }
    };

    return (
        <div className="login-container" style={{ backgroundImage: `url(${clgImage})` }}>
            <div className="login-box">
                <h2>College Event Portal Login</h2>
                <form onSubmit={handleLogin}>
                    <label>Role:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Student">Student</option>
                        <option value="Faculty">Faculty</option>
                    </select>

                    <label>{role === "Student" ? "Student ID:" : "Faculty Staff ID:"}</label>
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

                    <label>Captcha: {captcha}</label>
                    <input 
                        type="text" 
                        value={userInput} 
                        onChange={(e) => setUserInput(e.target.value)} 
                        required 
                    />

                    <button type="button" onClick={refreshCaptcha}>Refresh Captcha</button>
                    <button type="submit">Login</button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
