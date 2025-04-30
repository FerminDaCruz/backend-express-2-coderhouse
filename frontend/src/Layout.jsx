import { Outlet } from "react-router-dom";
import Header from "./components/layout/Header";
import HeaderMobile from "./components/layout/HeaderMobile";
import Footer from "./components/layout/Footer";
import useWindowWidth from "./hooks/useWindowWidth";

export default function Layout() {
    const width = useWindowWidth();
    return (
        <>
            {width > 768 ? <Header /> : <HeaderMobile />}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}
