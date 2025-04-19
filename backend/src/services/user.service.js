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
        return res.status(400).json({ msg: "El usuario ya existe" });
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

    return await newUser.save();
};

export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: "Usuario no encontrado" });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    const payload = { id: user.id, role: user.role };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
