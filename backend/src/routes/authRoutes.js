import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import passport from "passport";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, age, password, cart, role } =
            req.body;
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

        await newUser.save();
        res.json({ msg: "Usuario registrado" });
    } catch (error) {
        res.status(500).json({ msg: "Error en el servidor", error });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        const payload = { id: user.id, role: user.role };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "1h" },
            (err, token) => {
                if (err) {
                    console.error("JWT Error:", err);
                    return res
                        .status(500)
                        .json({ msg: "Error al generar el token", error: err });
                }
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error en el servidor", error });
    }
});

router.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        res.json({ user: req.user });
    }
);

export default router;
