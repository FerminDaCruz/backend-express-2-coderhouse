import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userDao } from "../dao/factory.js";

export const registerUser = async ({
    first_name,
    last_name,
    email,
    age,
    password,
    cart,
    role,
}) => {
    const existingUser = await userDao.getByEmail(email);
    if (existingUser) {
        throw new Error("the user already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUserData = {
        first_name,
        last_name,
        email,
        age,
        password: hashedPassword,
        cart,
        role,
    };

    const savedUser = await userDao.create(newUserData);

    return savedUser;
};

export const loginUser = async ({ email, password }) => {
    const user = await userDao.getByEmail(email);
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
