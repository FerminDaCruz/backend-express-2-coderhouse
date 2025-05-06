import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export default function LogoutPage() {
    const { logout } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate("/auth");
    }, [logout, navigate]);
    return <p>Cerrando sesión...</p>;
}
