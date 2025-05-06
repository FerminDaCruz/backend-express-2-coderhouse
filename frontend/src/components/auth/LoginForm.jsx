import { useState } from "react";
import { useUser } from "../../context/UserContext";

export default function LoginForm({ changeMode }) {
    const { login } = useUser();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
        } catch (err) {
            console.error(err);
            throw new Error(err);
        }
    };
    return (
        <div>
            <h3>Iniciar Sesión</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    onChange={handleChange}
                    required
                    name="email"
                />
                <input
                    type="password"
                    placeholder="contraseña"
                    onChange={handleChange}
                    required
                    name="password"
                />
                <button type="submit">Enviar</button>
            </form>
            <button onClick={changeMode}>Registrarme</button>
        </div>
    );
}
