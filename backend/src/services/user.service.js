import { userRepository } from "../repositories/repositories.js";
import { hashPassword, comparePassword } from "../utils/encryption.js";
import { generateToken } from "../utils/jwt.js";

export const registerUser = async ({
    first_name,
    last_name,
    email,
    age,
    password,
    cart,
    role,
}) => {
    const existingUser = await userRepository.getByEmail(email);
    if (existingUser) {
        throw new Error("the user already exists");
    }

    const newUserData = {
        first_name,
        last_name,
        email,
        age,
        password: hashPassword(password),
        cart,
        role,
    };

    const savedUser = await userRepository.create(newUserData);

    return savedUser;
};

export const loginUser = async ({ email, password }) => {
    const user = await userRepository.getByEmail(email);
    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = comparePassword(password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }

    const payload = { id: user.id, role: user.role };

    return generateToken({ id: user.id, role: user.role });
};
