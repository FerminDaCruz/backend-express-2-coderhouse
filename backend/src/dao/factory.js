import dotenv from "dotenv";

dotenv.config();

let userDao;
let productDao;
let cartDao;
let ticketDao;

switch (process.env.PERSISTENCE) {
    case "MONGO":
        const { default: MongoUserDao } = await import("./mongo/user.dao.js");
        const { default: MongoProductDao } = await import(
            "./mongo/product.dao.js"
        );
        const { default: MongoCartDao } = await import("./mongo/cart.dao.js");
        const { default: MongoTicketDao } = await import(
            "./mongo/ticket.dao.js"
        );

        userDao = new MongoUserDao();
        productDao = new MongoProductDao();
        cartDao = new MongoCartDao();
        ticketDao = new MongoTicketDao();
        break;

    case "MEMORY":
        const { default: MemoryUserDao } = await import("./memory/user.dao.js");
        const { default: MemoryProductDao } = await import(
            "./memory/product.dao.js"
        );
        const { default: MemoryCartDao } = await import("./memory/cart.dao.js");
        const { default: MemoryTicketDao } = await import(
            "./memory/ticket.dao.js"
        );

        userDao = new MemoryUserDao();
        productDao = new MemoryProductDao();
        cartDao = new MemoryCartDao();
        ticketDao = new MemoryTicketDao();
        break;
    default:
        throw new Error(
            "configure la persistencia en las variables de entorno"
        );
}

export { userDao, productDao, cartDao, ticketDao };
