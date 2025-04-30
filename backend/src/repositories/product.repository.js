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

    async getPaginateProducts({
        page = 1,
        limit = 10,
        category,
        available,
        sort,
        name,
    }) {
        const query = {};
        if (category) query.category = category;

        if (available !== undefined)
            query.stock = available === "true" ? { $gt: 0 } : { $eq: 0 };

        if (name) {
            query.name = { $regex: name, $options: "i" };
        }

        const sortOptions = { asc: { price: 1 }, desc: { price: -1 } };
        const options = {
            page: parseInt(page),
            limit: parseInt(limit),
            sort: sortOptions[sort] || {},
        };

        return await this.dao.paginate(query, options);
    }
}
