import * as productService from "../services/product.service.js";

export const getProducts = async (req, res) => {
    try {
        const data = await productService.getProducts(req.query);
        res.sendSuccess(data);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.sendCreated(product);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid);
        res.sendSuccess(product);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(
            req.params.pid,
            req.body
        );
        res.sendSuccess(product);
    } catch (error) {
        res.sendServerError(error);
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await productService.deleteProduct(req.params.pid);
        res.sendSuccess(product);
    } catch (error) {
        res.sendServerError(error);
    }
};
