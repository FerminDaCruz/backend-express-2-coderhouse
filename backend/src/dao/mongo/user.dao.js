import User from "../../models/User.js";

export default class MongoUserDao {
    async getByEmail(email) {
        return await User.findOne({ email });
    }

    async create(userData) {
        return await User.create(userData);
    }
}
