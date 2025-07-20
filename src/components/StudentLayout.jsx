import { Outlet, Link } from 'react-router-dom';

import LogoutButton from "./LogoutButton.jsx";

function StudentLayout() {
    return (
        <div>
            <header>
                <h2>Панель студента</h2>
                <LogoutButton />
                <nav>
                    <ul>
                        <li><Link to="/student/dashboard">Главная</Link></li>
                        <li><Link to="/student/courses">Мои курсы</Link></li>
                    </ul>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default StudentLayout;
