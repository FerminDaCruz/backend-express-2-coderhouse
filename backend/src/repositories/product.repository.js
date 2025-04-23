export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        return await this.dao.getAll();
    }

    async getById(id) {
        return await this.dao.getById(id);
    }

    async create(productData) {
        return await this.dao.create(productData);
    }

    async update(id, updateData) {
        return await this.dao.update(id, updateData);
    }

    async delete(id) {
        return await this.dao.delete(id);
    }

    async paginate(query, options) {
        return await this.dao.paginate(query, options);
    }

    // Cualquier lógica extra que combine múltiples DAO calls también va acá
}
