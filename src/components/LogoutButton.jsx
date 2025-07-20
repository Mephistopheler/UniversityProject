
import { useNavigate } from "react-router-dom";

function LogoutButton() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("courses");
        navigate("/login");
    };

    return (
        <button onClick={handleLogout}>
            Выйти
        </button>
    );
}

export default LogoutButton;
