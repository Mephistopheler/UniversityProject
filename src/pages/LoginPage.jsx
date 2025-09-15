import { useState } from "react";
import { useNavigate } from "react-router-dom";


const USERS = {
    "student2@example.com": {
        password: "1234",
        role: "student",
        courses: ["course1", "course2"]
    },
    "student@example.com": {
        password: "1234",
        role: "student",
        courses: ["course1"]
    },
    "student0@example.com": {
        password: "1234",
        role: "student",
        courses: []
    },
    "teacher2@example.com": {
        password: "1234",
        role: "teacher",
        courses: ["course1", "course2"]
    },
    "teacher@example.com": {
        password: "1234",
        role: "teacher",
        courses: ["course2"]
    },
    "admin@example.com": {
        password: "1234",
        role: "admin"
    },
};


export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const redirectToDashboard = (role) => {
        switch (role) {
            case "student":
                navigate("/student/dashboard");
                break;
            case "teacher":
                navigate("/teacher/dashboard");
                break;
            case "admin":
                navigate("/admin/dashboard");
                break;
            default:
                navigate("/");
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        const user = USERS[email];

        if (user && user.password === password) {
            localStorage.setItem("token", "fake-token");
            localStorage.setItem("role", user.role);
            // сохраняем ВСЮ инфу о пользователе
            localStorage.setItem("currentUser", JSON.stringify({
                email,
                role: user.role,
                courses: user.courses || []
            }));
            redirectToDashboard(user.role);
        } else {
            setError("Неверный логин или пароль");
        }
    };



    return (
        <div>
            <form onSubmit={handleLogin}>
                <h2>Вход в систему</h2>

                {error && (
                    <div>{error}</div>
                )}

                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">
                    Войти
                </button>
            </form>
        </div>
    );
}
