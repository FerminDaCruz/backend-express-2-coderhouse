import { cartDao, productDao, userDao } from "../dao/factory.js";
import CartRepository from "./cart.repository.js";
import ProductRepository from "./product.repository.js";
import UserRepository from "./user.repository.js";

export const cartRepository = new CartRepository(cartDao);
export const productRepository = new ProductRepository(productDao);
export const userRepository = new UserRepository(userDao);
