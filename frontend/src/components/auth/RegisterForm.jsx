import { useState } from "react";
import { useUser } from "../../context/UserContext.jsx";

export default function RegisterForm() {
    const { register } = useUser();
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        age: "",
        email: "",
        password: "",
        role: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== repeatedPassword) {
            setError("Password must be equals");
            return;
        }
        try {
            setError(null);
            await register({ ...formData, age: Number(formData.age) });
            alert("Usuario registrado exitosamente");
            setFormData({
                first_name: "",
                last_name: "",
                age: "",
                email: "",
                password: "",
                role: "",
            });
            setRepeatedPassword("");
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <div>
            <h3>Registrarse</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="nombre"
                    onChange={handleChange}
                    value={formData.first_name}
                    name="first_name"
                    required
                />
                <input
                    type="text"
                    placeholder="apellido"
                    onChange={handleChange}
                    value={formData.last_name}
                    name="last_name"
                    required
                />
                <input
                    type="number"
                    placeholder="edad"
                    onChange={handleChange}
                    value={formData.age}
                    name="age"
                    required
                />
                <input
                    type="email"
                    placeholder="email"
                    onChange={handleChange}
                    value={formData.email}
                    name="email"
                    required
                />
                <input
                    type="password"
                    placeholder="contraseña"
                    onChange={handleChange}
                    value={formData.password}
                    name="password"
                    required
                />
                <input
                    type="password"
                    placeholder="Repetir contraseña"
                    onChange={(e) => setRepeatedPassword(e.target.value)}
                    value={repeatedPassword}
                    required
                />
                <select
                    onChange={handleChange}
                    value={formData.role}
                    name="role"
                    required
                >
                    <option value="user">usuario</option>
                    <option value="admin">administrador</option>
                </select>
                {error && <p>{error}</p>}
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
