import MainAuth from "../components/auth/MainAuth";
import Main from "../components/home/Main";

export default function HomePage() {
    return (
        <div className="home">
            <h1>Bienvenido a mi E-commerce</h1>
            <Main />
            <MainAuth />
        </div>
    );
}
