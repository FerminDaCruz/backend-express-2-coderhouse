import User from "../../models/User.js";

export default class MongoUserDao {
    async getByEmail(email) {
        return await User.findOne({ email });
    }

    async getById(id) {
        return await User.findById(id);
    }

    async create(userData) {
        return await User.create(userData);
    }

    async update(userId, updates) {
        console.log("-> Actualizando usuario:", userId, updates);
        return await User.findOneAndUpdate({ _id: userId }, updates, {
            new: true,
        });
    }
}
