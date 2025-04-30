import { useEffect, useState } from "react";
import { getPaginatedProducts } from "../services/productServices";

export default function usePaginatedProducts(initialParams = {}) {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        totalPages: 1,
    });
    const [filters, setFilters] = useState(initialParams);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const data = await getPaginatedProducts({ ...filters, ...params });
            setProducts(data.data.docs);
            setPagination({
                page: data.data.page,
                limit: data.data.limit,
                totalPages: data.data.totalPages,
            });
        } catch (err) {
            throw new Error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [filters]);

    const updateFilters = (newFilters) => {
        setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    };

    return {
        products,
        pagination,
        loading,
        error,
        fetchProducts,
        updateFilters,
    };
}
