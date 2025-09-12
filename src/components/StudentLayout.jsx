import { Outlet, Link } from 'react-router-dom';

import LogoutButton from "./LogoutButton.jsx";
import "../styles/StudentLayout.css";

function StudentLayout() {
    return (
        <div className="student-layout">
            <header>
                <div className="header-left">
                    <h2>Панель студента</h2>
                    <nav>
                        <ul>
                            <li><Link to="/student/dashboard">Главная</Link></li>
                            <li><Link to="/student/courses">Мои курсы</Link></li>
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

export default StudentLayout;
