import ProductCard from "./ProductCard";

export default function ProductList({ products, loading, error }) {
    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>Hubo un error: {error}</p>;
    if (!products || products.lenght === 0)
        return <p>No se encontraron productos</p>;

    return (
        <>
            <main>
                <ul>
                    {products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
                </ul>
            </main>
        </>
    );
}
