import Ticket from "../../models/Ticket.js";

export default class MongoTicketDao {
    async create(data) {
        return await Ticket.create(data);
    }
}
