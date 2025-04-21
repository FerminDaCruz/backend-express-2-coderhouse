import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async ({
    first_name,
    last_name,
    email,
    age,
    password,
    cart,
    role,
}) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error("the user already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        cart,
        role,
    });

    const savedUser = await newUser.save();

    return savedUser;
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    const payload = { id: user.id, role: user.role };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
