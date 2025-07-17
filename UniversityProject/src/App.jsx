import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />

                <Route element={<PrivateRoute allowedRoles={["student"]} />}>
                    <Route path="/student/dashboard" element={<StudentDashboard />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={["teacher"]} />}>
                    <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                </Route>

                <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
