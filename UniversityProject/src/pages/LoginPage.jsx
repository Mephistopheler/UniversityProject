import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();


        if (email === "student@example.com" && password === "1234") {
            localStorage.setItem("token", "fake-token");
            localStorage.setItem("role", "student");
            navigate("/student/dashboard");
        } else if (email === "teacher@example.com" && password === "1234") {
            localStorage.setItem("token", "fake-token");
            localStorage.setItem("role", "teacher");
            navigate("/teacher/dashboard");
        } else if (email === "admin@example.com" && password === "1234") {
            localStorage.setItem("token", "fake-token");
            localStorage.setItem("role", "admin");
            navigate("/admin/dashboard");
        } else {
            setError("Неверный логин или пароль");
        }
    };

    return (
        <div>
            <form
                onSubmit={handleLogin}
            >
                <h2>Вход в систему</h2>

                {error && (
                    <div>{error}</div>
                )}

                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>

                <button
                    type="submit"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}
