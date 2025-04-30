import mongoose from "mongoose";

const userCollection = "users";

const UserSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
    },
});

const User = mongoose.model(userCollection, UserSchema);
export default User;
