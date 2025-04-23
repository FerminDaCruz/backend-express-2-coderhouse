import Cart from "../../models/Cart.js";

export default class MongoCartDao {
    async getAll() {
        return await Cart.find().populate("products.product");
    }

    async getById(id) {
        return await Cart.findById(id).populate("products.product");
    }

    async create() {
        return await Cart.create({ products: [] });
    }

    async addProduct(cartId, productId, quantity = 1) {
        const cart = await Cart.findById(cartId);
        const productIndex = cart.products.findIndex(
            (p) => p.product.toString() === productId
        );

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await cart.save();
    }

    async removeProduct(cartId, productId) {
        const cart = await Cart.findById(cartId);
        cart.products = cart.products.filter(
            (p) => p.product.toString() !== productId
        );
        return await cart.save();
    }

    async clearCart(cartId) {
        const cart = await Cart.findById(cartId);
        cart.products = [];
        return await cart.save();
    }

    async updateQuantity(cartId, productId, quantity) {
        const cart = await Cart.findById(cartId);
        const product = cart.products.find(
            (p) => p.product.toString() === productId
        );

        if (product) {
            product.quantity = quantity;
        }

        return await cart.save();
    }
}
