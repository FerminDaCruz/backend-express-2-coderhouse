export default function ProductCard({ product }) {
    return (
        <li>
            <p>
                {product.name} - ${product.price}
            </p>
            <p>{product.description}</p>
            <p>stock: {product.stock}</p>
        </li>
    );
}
