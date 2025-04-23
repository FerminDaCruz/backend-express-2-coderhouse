import { cartDao, productDao } from "../dao/factory.js";
import { cartDTO } from "../dto/CartDTO.js";

export const createCart = async () => {
    return await cartDao.create();
};

export const getCartById = async (cid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");
    return cartDTO(cart);
};

export const addProductToCart = async (cid, pid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    const product = await productDao.getById(pid);
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
    const populatedCart = await cartDao.getById(cart._id);
    return cartDTO(populatedCart);
};

export const deleteProductFromCart = async (cid, pid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = cart.products.filter((p) => !p.product.equals(pid));

    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};

export const updateCart = async (cid, products) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    cart.products = products;
    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};

export const updateProductFromCart = async (cid, pid, quantity) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");

    const productIndex = cart.products.findIndex((p) => p.product.equals(pid));
    if (productIndex === -1) throw new Error("Product not found");

    cart.products[productIndex].quantity = quantity;

    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};

export const clearCart = async (cid) => {
    const cart = await cartDao.getById(cid);
    if (!cart) throw new Error("Cart not found");
    cart.products = [];
    const updatedCart = await cart.save();
    return cartDTO(updatedCart);
};
