
import { useNavigate } from "react-router-dom";

import "../styles/LogoutButton.css";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("courses");
        navigate("/login");
    };

    return (
        <button onClick={handleLogout} className={"logoutButton"}>
            Выйти
        </button>
    );
}

export default LogoutButton;
