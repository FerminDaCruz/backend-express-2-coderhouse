import usePaginatedProducts from "../../hooks/usePaginatedProducts";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import Filters from "./Filters";

export default function Main() {
    const { products, pagination, loading, error, updateFilters } =
        usePaginatedProducts();

    return (
        <div>
            <SearchBar onSearch={updateFilters} />
            <Filters onChange={updateFilters} />
            <ProductList products={products} loading={loading} error={error} />
            <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(page) => updateFilters({ page })}
            />
        </div>
    );
}
