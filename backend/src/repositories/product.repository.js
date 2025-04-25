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

    async getPaginateProducts({ page, limit, category, available, sort }) {
        const query = {};
        if (category) query.category = category;
        if (available !== undefined) query.available = available === "true";

        const sortOptions = { asc: { price: 1 }, desc: { price: -1 } };
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sortOptions[sort] || {},
        };

        return await this.dao.paginate(query, options);
    }
}
