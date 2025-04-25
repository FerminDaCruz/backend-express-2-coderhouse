import Product from "../models/Product.js";
import { productRepository } from "../repositories/repositories.js";

export const getProducts = async (params) => {
    return await productRepository.getPaginateProducts(params);
};

export const createProduct = async (product) => {
    const newProduct = new Product(product);
    return await productRepository.create(newProduct);
};

export const getProductById = async (pid) => {
    const product = await productRepository.getById(pid);
    if (!product) throw new Error("Product not found");
    return product;
};

export const updateProduct = async (pid, product) => {
    const updatedProduct = await productRepository.update(pid, product);
    if (!updatedProduct) throw new Error("Product not found");
    return updatedProduct;
};

export const deleteProduct = async (pid) => {
    const deletedProduct = await productRepository.delete(pid);
    if (!deletedProduct) throw new Error("Product not found");
    return deletedProduct;
};
