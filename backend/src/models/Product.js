import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    brand: { type: String, required: true },
    color: { type: String },
    size: { type: String },
    weight: { type: Number },
    height: { type: Number },
    model: { type: String },
    condition: { type: String, enum: ["new", "used"] },
});

productSchema.plugin(mongoosePaginate);

const Product = mongoose.model(productsCollection, productSchema);

export default Product;
