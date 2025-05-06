import { useState } from "react";

export default function Filters({ onChange }) {
    const [filters, setFilters] = useState({
        category: "todas las categorías",
        sort: "-",
    });
    const handleCategoryChange = (e) => {
        onChange({ category: e.target.value });
        setFilters({ ...filters, category: e.target.value });
    };

    const handleSortChange = (e) => {
        onChange({ sort: e.target.value });
        setFilters({ ...filters, sort: e.target.value });
    };

    return (
        <div>
            <select
                name="category"
                id="category"
                onChange={handleCategoryChange}
                value={filters.category}
            >
                <option value="">todas las categorías</option>
                <option value="ropa">ropa</option>
                <option value="calzado">calzado</option>
            </select>
            <select
                name="sort"
                id="sort"
                onChange={handleSortChange}
                value={filters.sort}
            >
                <option value="">-</option>
                <option value="asc">menor a mayor</option>
                <option value="desc">mayor a menor</option>
            </select>
        </div>
    );
}
