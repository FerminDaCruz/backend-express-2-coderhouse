import { useState } from "react";

export default function Register() {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        age: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const data = await response.json();

            console.log(data);

            if (response.ok) {
                alert("Registro exitoso");
            } else {
                alert(`Error: ${data.msg}`);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
        }
    };

    return (
        <div className="register">
            <h2 className="register__title">Registro</h2>
            <form onSubmit={handleSubmit} className="register__form">
                <input
                    type="text"
                    name="first_name"
                    placeholder="Nombre"
                    onChange={handleChange}
                    required
                    className="register__input"
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Apellido"
                    onChange={handleChange}
                    required
                    className="register__input"
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    onChange={handleChange}
                    required
                    className="register__input"
                />
                <input
                    type="number"
                    name="age"
                    placeholder="Edad"
                    onChange={handleChange}
                    required
                    className="register__input"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    required
                    className="register__input"
                />
                <button type="submit" className="register__submit">
                    Registrarse
                </button>
            </form>
        </div>
    );
}
