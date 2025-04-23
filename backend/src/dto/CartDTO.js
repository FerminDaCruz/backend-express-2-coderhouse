export const cartDTO = (cart) => {
    const items = cart.products.map((item) => {
        const product = item.product;

        return {
            id: product._id,
            name: product.title,
            price: product.price,
            quantity: item.quantity,
            subtotal: product.price * item.quantity,
            image: product.thumbnail,
        };
    });

    const total = items.reduce((acc, item) => acc + item.subtotal, 0);

    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0);

    return {
        cartId: cart._id,
        items,
        total,
        totalQuantity,
    };
};
