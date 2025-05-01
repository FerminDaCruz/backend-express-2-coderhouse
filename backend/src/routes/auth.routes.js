import express from "express";
import passport from "passport";
import {
    getProfile,
    login,
    logout,
    register,
    updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post(
    "/logout",
    passport.authenticate("current", { session: false }),
    logout
);
router.get(
    "/profile",
    passport.authenticate("current", { session: false }),
    getProfile
);
router.put(
    "/profile",
    passport.authenticate("current", { session: false }),
    updateProfile
);

export default router;
