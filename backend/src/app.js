import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import authRoutes from "./routes/authRoutes.js";
import configurePassport from "./config/passport.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());

configurePassport(passport);

app.use("/api/auth", authRoutes);

mongoose
    .connect("mongodb://localhost:27017/coder-auth")
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error conectando a MongoDB: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
