import { API_URL } from "../utils/constants";

export async function loginUser(credentials) {
    const res = await fetch(`${API_URL}/auth/login`, credentials);
    return res.data;
}
