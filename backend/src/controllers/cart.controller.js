import { userRepository } from "../repositories/repositories.js";
import * as cartService from "../services/cart.service.js";

export const getCartById = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        res.sendSuccess(cart);
    } catch (error) {
        res.sendServerError("Error getting cart");
    }
};

export const createCart = async (req, res) => {
    try {
        const user = req.user;
        if (user.cart) res.sendClientError("You already have a cart assigned");

        const cart = await cartService.createCart();
        user.cart = cart._id;

        await userRepository.update(user._id, {
            cart: cart._id,
        });
        res.sendCreated(cart);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const cart = await cartService.addProductToCart(
            req.params.cid,
            req.params.pid
        );
        res.sendSuccess(cart);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const cart = await cartService.deleteProductFromCart(
            req.params.cid,
            req.params.pid
        );
        res.sendSuccess(cart);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const updateCart = async (req, res) => {
    try {
        const cart = await cartService.updateCart(
            req.params.cid,
            req.body.products
        );
        const populatedCart = await cart.populate("products.product");
        res.sendSuccess(populatedCart);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const updateProductFromCart = async (req, res) => {
    try {
        const cart = await cartService.updateProductFromCart(
            req.params.cid,
            req.params.pid,
            req.body.quantity
        );
        res.sendSuccess(cart);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const clearCart = async (req, res) => {
    try {
        const cart = await cartService.clearCart(req.params.cid);
        res.sendSuccess(cart);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const purchaseCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const userEmail = req.user.email;

        const result = await cartService.purchaseCart(cid, userEmail);

        res.sendSuccess(result);
    } catch (error) {
        res.sendServerError(error);
    }
};
