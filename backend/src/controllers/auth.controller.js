import * as userService from "../services/user.service.js";

export const register = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        return res.sendCreated("Usuario registrado", result);
    } catch (error) {
        return res.sendServerError(error.message);
    }
};

export const login = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        return res.sendSuccess(token);
    } catch (error) {
        return res.sendClientError(error.message);
    }
};

export const getProfile = (req, res) => {
    res.json({ user: req.user });
};
