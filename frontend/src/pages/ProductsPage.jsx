import Filters from "../components/products/Filters";
import SearchBar from "../components/products/SearchBar";
import Pagination from "../components/products/Pagination";
import ProductList from "../components/products/ProductList";
import usePaginatedProducts from "../hooks/usePaginatedProducts";

export default function ProductsPage() {
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
