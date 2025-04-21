import express from "express";
import passport from "passport";
import { getProfile, login, register } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    getProfile
);

export default router;
