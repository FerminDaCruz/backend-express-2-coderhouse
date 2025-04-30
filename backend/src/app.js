import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import authRoutes from "./routes/auth.routes.js";
import productsRouter from "./routes/product.routes.js";
import cartsRouter from "./routes/cart.routes.js";
import configurePassport from "./config/passport.js";
import dotenv from "dotenv";
import cors from "cors";
import customResponse from "./middlewares/customResponse.js";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsConfig.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const MONGO_URI = process.env.MONGO_URI;

const FRONTEND_URL =
    process.env.NODE_ENV === "production"
        ? process.env.FRONTEND_URL_PROD
        : process.env.FRONTEND_URL_LOCAL;

mongoose
    .connect(MONGO_URI)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error conectando a MongoDB: ", err));

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(passport.initialize());
configurePassport(passport);

app.use(customResponse);

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
