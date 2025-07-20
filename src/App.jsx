import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesProvider } from './context/CourseContext';

import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import PrivateRoute from "./components/PrivateRoute";
import RedirectToDashboard from "./components/RedirectToDashboard";
import NotFoundPage from "./pages/NotFoundPage";
import StudentCourses from "./pages/StudentCourses.jsx";
import CourseDetail from "./pages/CourseDetail";
import StudentLayout from "./components/StudentLayout.jsx";

function App() {
    return (
        <CoursesProvider>
            <Routes>
                <Route path="/" element={<RedirectToDashboard />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Студент */}
                <Route element={<PrivateRoute allowedRoles={["student"]} />}>
                    <Route path="/student" element={<StudentLayout />}>
                        <Route path="dashboard" element={<StudentDashboard />} />
                        <Route path="courses" element={<StudentCourses />} />
                        <Route path="courses/:id" element={<CourseDetail />} />
                    </Route>
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
        </CoursesProvider>
    );
}

export default App;
