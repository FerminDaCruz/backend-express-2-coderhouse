import { cartDao, productDao } from "../dao/factory.js";

export const createCart = async () => {
    return await cartDao.create();
};

export const getCartById = async (cid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");
    return cart;
};

export const addProductToCart = async (cid, pid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    const product = await productDao.getById(pid);
    if (!product) throw new Error("Product not found");

    const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === pid.toString()
    );
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }
    const updatedCart = await cart.save();
    return updatedCart;
};

export const deleteProductFromCart = async (cid, pid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = cart.products.filter((p) => !p.product.equals(pid));
    return await cart.save();
};

export const updateCart = async (cid, products) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = products;
    return await cart.save();
};

export const updateProductFromCart = async (cid, pid, quantity) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    const productIndex = cart.products.findIndex((p) => p.product.equals(pid));
    if (productIndex === -1) throw new Error("Product not found");

    cart.products[productIndex].quantity = quantity;

    return await cart.save();
};

export const clearCart = async (cid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");
    cart.products = [];
    return await cart.save();
};
