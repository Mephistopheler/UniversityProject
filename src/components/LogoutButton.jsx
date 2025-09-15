import { useNavigate } from "react-router-dom";
import "../styles/LogoutButton.css";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Полная очистка локального хранилища
        localStorage.clear();
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className="logoutButton">
            Выйти
        </button>
    );
}

export default LogoutButton;
