import Product from "../models/Product.js";

export const getProducts = async ({
    page = 1,
    limit = 10,
    category,
    available,
    sort,
}) => {
    const query = {};
    if (category) query.category = category;
    if (available !== undefined) query.available = available === "true";

    const sortOptions = { asc: { price: 1 }, desc: { price: -1 } };

    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: sortOptions[sort] || {},
    };

    return await Product.paginate(query, options);
};

export const createProduct = async (product) => {
    const newProduct = new Product(product);
    return await newProduct.save();
};

export const getProductById = async (pid) => {
    const product = await Product.findById(pid);
    if (!product) throw new Error("Product not found");
    return product;
};

export const updateProduct = async (pid, product) => {
    const updatedProduct = await Product.findByIdAndUpdate(pid, product, {
        new: true,
    });
    if (!updatedProduct) throw new Error("Product not found");
    return updatedProduct;
};

export const deleteProduct = async (pid) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) throw new Error("Product not found");
    return deletedProduct;
};
