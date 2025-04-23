export default class CartRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return this.dao.getAll();
    }

    async getById(id) {
        return this.dao.getById(id);
    }

    async create() {
        return this.dao.create();
    }

    async addProductToCart(cartId, productId, quantity = 1) {
        return this.dao.addProduct(cartId, productId, quantity);
    }

    async removeProduct(cartId, productId) {
        return this.dao.removeProduct(cartId, productId);
    }

    async clearCart(cartId) {
        return this.dao.clearCart(cartId);
    }

    async updateQuantity(cartId, productId, quantity) {
        return this.dao.updateQuantity(cartId, productId, quantity);
    }
}
