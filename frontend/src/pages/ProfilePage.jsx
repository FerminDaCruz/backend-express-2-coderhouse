import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, loading } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/auth");
        }
    }, [user, navigate]);

    if (loading) return <p>cargando...</p>;
    if (user) {
        return (
            <>
                <h1>Hola, {user.first_name}</h1>
            </>
        );
    } else {
        <h1>Cargando perfil...</h1>;
    }
}
