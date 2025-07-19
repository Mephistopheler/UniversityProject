import { Navigate } from "react-router-dom";

export default function RedirectToDashboard() {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) return <Navigate to="/login" />;
    if (role === "student") return <Navigate to="/student/dashboard" />;
    if (role === "teacher") return <Navigate to="/teacher/dashboard" />;
    if (role === "admin") return <Navigate to="/admin/dashboard" />;
    return <Navigate to="/login" />;
}
