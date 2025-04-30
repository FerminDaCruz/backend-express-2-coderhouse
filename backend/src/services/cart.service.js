import { cartDTO } from "../dto/CartDTO.js";
import {
    cartRepository,
    productRepository,
    userRepository,
} from "../repositories/repositories.js";

export const createCart = async () => {
    const cart = await cartRepository.create();
    return cart;
};

export const getCartById = async (cid) => {
    const cart = await cartRepository.getById(cid);
    if (!cart) throw new Error("Cart not found");
    return cartDTO(cart);
};

export const addProductToCart = async (cid, pid) => {
    const cart = await cartRepository.getById(cid);
    if (!cart) throw new Error("Cart not found");

    const product = await productRepository.getById(pid);
    if (!product) throw new Error("Product not found");

    const productIndex = cart.products.findIndex((p) => {
        const idA = p.product._id
            ? p.product._id.toString()
            : p.product.toString();
        const idB = pid.toString();

        return idA === idB;
    });
    if (productIndex !== -1) {
        cart.products[productIndex].quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }

    await cart.save();
    const populatedCart = await cartRepository.getById(cart._id);
    return cartDTO(populatedCart);
};

export const deleteProductFromCart = async (cid, pid) => {
    const cart = await cartRepository.getById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = cart.products.filter((p) => !p.product.equals(pid));

    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};

export const updateCart = async (cid, products) => {
    const cart = await cartRepository.getById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = products;
    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};

export const updateProductFromCart = async (cid, pid, quantity) => {
    const cart = await cartRepository.getById(cid);
    if (!cart) throw new Error("Cart not found");

    const productIndex = cart.products.findIndex((p) => p.product.equals(pid));
    if (productIndex === -1) throw new Error("Product not found");

    cart.products[productIndex].quantity = quantity;

    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};

export const clearCart = async (cid) => {
    const cart = await cartRepository.getById(cid);
    if (!cart) throw new Error("Cart not found");
    cart.products = [];
    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};

export const purchaseCart = async (cid, userEmail) => {
    const cart = await cartRepository.getById(cid);
    if (!cart) throw new Error("Cart not found");

    const productsNotProcessed = [];
    let totalAmount = 0;

    const purchasableProducts = [];

    for (const cartItem of cart.products) {
        const product = await productRepository.getById(cartItem.product._id);

        if (!product) continue;

        if (product.stock >= cartItem.quantity) {
            totalAmount += product.price * cartItem.quantity;
            product.stock -= cartItem.quantity;
            await productRepository.update(product._id, {
                stock: product.stock,
            });
            purchasableProducts.push(cartItem);
        } else {
            productsNotProcessed.push(cartItem.product._id);
        }
    }

    let ticket = null;
    if (purchasableProducts.length > 0) {
        ticket = await ticketRepository.create({
            amount: totalAmount,
            purchaser: userEmail,
        });
    }

    const remainingProducts = cart.products.filter((cartItem) =>
        productsNotProcessed.includes(cartItem.product._id.toString())
    );

    cart.products = remainingProducts;
    await cartRepository.update(cid, cart);

    return {
        message: "Compra procesada",
        ticket,
        productsNotProcessed,
    };
};
