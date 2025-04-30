import { createContext, useState } from "react";
import {
    loginUser,
    logoutUser,
    registerUser,
    getUserCart,
} from "../services/userService";

const UserContext = createContext();

export default function UserProvicer({ children }) {
    const [user, setUser] = useState(null);
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        try {
            const userData = await loginUser(credentials);
            setUser(userData.user);

            const userCart = await getUserCart(userData.user._id);
            setCart(userCart);
        } catch (err) {
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };
}
