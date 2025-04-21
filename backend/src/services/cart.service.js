import mongoose from "mongoose";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

export const createCart = async () => {
    return await Cart.create({ products: [] });
};

export const getCartById = async (cid) => {
    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) throw new Error("Cart not found");
    return cart;
};

export const addProductToCart = async (cid, pid) => {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error("Cart not found");

    const product = await Product.findById(pid);
    if (!product) throw new Error("Product not found");

    const productIndex = cart.products.findIndex((p) => p.product.equals(pid));
    if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }
    return await cart.save();
};

export const deleteProductFromCart = async (cid, pid) => {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = cart.products.filter((p) => !p.product.equals(pid));
    return await cart.save();
};

export const updateCart = async (cid, products) => {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = products;
    return await cart.save();
};

export const updateProductFromCart = async (cid, pid, quantity) => {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error("Cart not found");

    const productIndex = cart.products.findIndex((p) => p.product.equals(pid));
    if (productIndex === -1) throw new Error("Product not found");

    cart.products[productIndex].quantity = quantity;

    return await cart.save();
};

export const clearCart = async (cid) => {
    const cart = await Cart.findById(cid);
    if (!cart) throw new Error("Cart not found");
    cart.products = [];
    return await cart.save();
};
