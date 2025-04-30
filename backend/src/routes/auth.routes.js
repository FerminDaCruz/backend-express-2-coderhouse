import express from "express";
import passport from "passport";
import {
    getProfile,
    login,
    register,
    updateProfile,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
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
