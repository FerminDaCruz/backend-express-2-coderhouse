import { API_URL } from "../utils/constants";
export async function getPaginatedProducts({
    page = 1,
    limit = 10,
    category,
    available,
    sort,
    name,
}) {
    const params = new URLSearchParams();

    if (page) params.append("page", page);
    if (limit) params.append("limit", limit);
    if (category) params.append("category", category);
    if (available !== undefined) params.append("available", available);
    if (sort) params.append("sort", sort);
    if (name) params.append("name", name);

    const response = await fetch(`${API_URL}/products?${params.toString()}`);

    if (!response.ok) {
        throw new Error("Error fetching products");
    }

    const data = await response.json();

    return data;
}
