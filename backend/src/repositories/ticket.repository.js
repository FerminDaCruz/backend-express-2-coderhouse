export default class TicketRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async create() {
        return await this.dao.create(data);
    }
}
