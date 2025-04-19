import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    available: { type: Boolean, required: true },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productsCollection, productSchema);

export default Product;
