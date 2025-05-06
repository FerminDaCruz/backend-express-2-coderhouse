import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
export default function AuthForm() {
    const [authMode, setAuthMode] = useState("login");

    const changeMode = () => {
        setAuthMode(authMode === "register" ? "login" : "register");
    };
    return (
        <>
            {authMode === "register" ? (
                <RegisterForm changeMode={changeMode} />
            ) : (
                <LoginForm changeMode={changeMode} />
            )}
        </>
    );
}
