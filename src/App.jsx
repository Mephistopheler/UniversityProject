import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import RedirectToDashboard from "./components/RedirectToDashboard";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<RedirectToDashboard />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Студент */}
                <Route element={<PrivateRoute allowedRoles={["student"]} />}>
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                </Route>

                {/* Преподаватель */}
                <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
                    <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                </Route>

                {/* Админ */}
                <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
}

export default App;
