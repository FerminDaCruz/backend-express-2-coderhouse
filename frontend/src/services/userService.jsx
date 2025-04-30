import { API_URL } from "../utils/constants";

export async function loginUser(credentials) {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(credentials),
    });
    if (!res.ok) throw new Error("Error logging user");
    const json = await res.json();
    return json.data;
}

export async function logoutUser() {
    const res = await fetch("/api/sessions/logout", {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) throw new Error("Error logging out");
}

export async function registerUser(userData) {
    const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Error registering user");
    const json = await res.json();
    return json.data;
}

export async function getUser() {
    const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Error getting user");
    const json = await res.json();
    return json.data;
}

export async function updateUser(userData) {
    const res = await fetch(`${API_URL}/api/auth/profile`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error("Error updating user");
    const json = await res.json();
    return json.data;
}

export async function getUserCart() {
    const res = await fetch(`${API_URL}/api/cart`, {
        method: "GET",
        credentials: "include",
    });
    if (!res.ok) throw new Error("Error getting cart");
    const json = await res.json();
    return json.data;
}
