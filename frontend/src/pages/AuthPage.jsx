import { useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

export default function AuthPage() {
    const navigate = useNavigate();
    const { user } = useUser();
    useEffect(() => {
        if (user) {
            navigate("/profile");
        }
    }, [user, navigate]);
    return <AuthForm />;
}
