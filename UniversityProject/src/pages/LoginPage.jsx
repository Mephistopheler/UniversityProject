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
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Вход в систему</h2>

                {error && (
                    <div className="text-red-600 text-sm mb-4">{error}</div>
                )}

                <label className="block mb-2 text-sm font-medium text-gray-700">
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>

                <label className="block mb-4 text-sm font-medium text-gray-700">
                    Пароль:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full mt-1 p-2 border rounded"
                    />
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
                >
                    Войти
                </button>
            </form>
        </div>
    );
}
