import * as userService from "../services/user.service.js";

export const register = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        return res.sendCreated("Usuario registrado", result);
    } catch (error) {
        console.error(
            "Error al registrar usuario en controller",
            error.message,
            req.body
        );
        return res.sendServerError(error.message);
    }
};

export const login = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        res.cookie("jwt", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 24 * 60 * 60 * 1000,
        });
        return res.sendSuccess("Login successfully");
    } catch (error) {
        return res.sendServerError(error.message);
    }
};

export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.sendSuccess("Logout successfully");
    } catch (error) {
        return res.sendServerError(error);
    }
};

export const getProfile = (req, res) => {
    res.sendSuccess({ user: req.user });
};

export const updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        const updates = req.body;

        const allowedUpdates = ["first_name", "last_name", "email", "age"];
        const actualUpdates = Object.keys(updates);

        const isValidOperation = actualUpdates.every((key) =>
            allowedUpdates.includes(key)
        );

        if (!isValidOperation) {
            return res.sendClientError("Operation not allowed");
        }

        const updatedUser = await updateUserProfile(userId, updates);

        res.sendSuccess("Updated profile successfully", updatedUser);
    } catch (error) {
        res.sendServerError(error);
    }
};
