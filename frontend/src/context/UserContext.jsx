import { createContext, useContext, useState } from "react";
import {
    loginUser,
    registerUser,
    getUserCart,
    getUser,
    logoutUser,
} from "../services/userService";

const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUserData = async () => {
        setLoading(true);
        try {
            const { user } = await getUser();
            setUser(user);
            const cartData = await getUserCart();
            setCart(cartData);
        } catch (err) {
            console.error(err);
            setUser(null);
            setCart([]);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        setLoading(true);
        try {
            await loginUser(credentials);
            await fetchUserData();
        } catch (err) {
            console.error(err);
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await logoutUser();
            setUser(null);
            setCart([]);
        } catch (err) {
            console.error(err);
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };

    const register = async (userData) => {
        setLoading(true);
        try {
            await registerUser(userData);
        } catch (err) {
            console.error(err);
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };
    return (
        <UserContext.Provider
            value={{ user, cart, loading, login, logout, register }}
        >
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);
