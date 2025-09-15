import {Link, Outlet} from "react-router-dom";
import LogoutButton from "./LogoutButton.jsx";

function TeacherLayout() {
    return (
        <div className="student-layout">
            <header>
                <div className="header-left">
                    <h2>Панель преподавателя</h2>
                    <nav>
                        <ul>
                            <li><Link to="/teacher/dashboard">Главная</Link></li>
                            <li><Link to="/teacher/courses">Мои курсы</Link></li>
                        </ul>
                    </nav>
                </div>
                <LogoutButton />
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default TeacherLayout;