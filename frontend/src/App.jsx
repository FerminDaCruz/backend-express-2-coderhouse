import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import LogoutPage from "./pages/LogoutPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/logout" element={<LogoutPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
