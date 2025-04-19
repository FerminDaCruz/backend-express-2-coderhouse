import * as userService from "../services/user.service.js";

export const register = async (req, res) => {
    try {
        const result = await userService.registerUser(req.body);
        res.sendCreated("Usuario registrado");
    } catch (error) {
        res.sendServerError(error);
    }
};

export const login = async (req, res) => {
    try {
        const token = await userService.loginUser(req.body);
        res.sendSuccess(token);
    } catch (error) {
        res.sendClientError(error);
    }
};

export const getProfile = (req, res) => {
    res.json({ user: req.user });
};
