import { useNavigate } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { useUser } from "../../context/UserContext";

export default function NavbarMobile({ isOpen, toggleMenu }) {
    const { user } = useUser();
    const navigate = useNavigate();
    return (
        <nav className={`navbar-mobile ${isOpen ? "active" : ""}`}>
            <IoMdClose className="navbar-mobile__close" onClick={toggleMenu} />
            <button
                onClick={() => navigate("/")}
                className="navbar-mobile__link"
            >
                Inicio
            </button>

            <button
                className="navbar-mobile__link"
                onClick={() => navigate("/products")}
            >
                Tienda
            </button>
            {user ? (
                <>
                    {" "}
                    <button
                        className="navbar-mobile__link"
                        onClick={() => navigate("/profile")}
                    >
                        Perfil
                    </button>
                    <button
                        className="navbar-mobile__link"
                        onClick={() => navigate("/carrito")}
                    >
                        Carrito
                    </button>
                    <button
                        className="navbar-mobile__link"
                        onClick={() => navigate("/logout")}
                    >
                        Cerrar sesion
                    </button>
                </>
            ) : (
                <>
                    {" "}
                    <button
                        className="navbar-mobile__link"
                        onClick={() => navigate("/auth")}
                    >
                        Iniciar sesión
                    </button>
                    <button
                        className="navbar-mobile__link"
                        onClick={() => navigate("/auth")}
                    >
                        Registrarse
                    </button>
                </>
            )}
        </nav>
    );
}
