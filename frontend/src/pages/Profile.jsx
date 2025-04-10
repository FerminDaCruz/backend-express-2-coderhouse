import { useEffect, useState } from "react";

export default function Profile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("No estas autenticado");
                return;
            }

            try {
                const response = await fetch(
                    "http://localhost:5000/api/auth/profile",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const data = await response.json();
                console.log(data);

                if (response.ok) {
                    setUser(data.user);
                } else {
                    alert(`Error: ${data.msg}`);
                }
            } catch (error) {
                console.error("Error al obtener el perfil:", error);
            }
        };

        fetchProfile();
    }, []);

    return (
        <div>
            <h2>Perfil</h2>
            {user ? (
                <div>
                    <p>
                        Nombre: {user.first_name} {user.last_name}
                    </p>
                    <p>Email: {user.email}</p>
                    <p>Edad: {user.age}</p>
                    <p>Rol: {user.role}</p>
                </div>
            ) : (
                <p>Cargando perfil...</p>
            )}
        </div>
    );
}
