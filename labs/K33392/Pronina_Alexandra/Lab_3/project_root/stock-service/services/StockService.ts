import { Stock } from '../models/Stock';

export class StockService {
    async updateStock(bookId: number, quantity: number) {
        const stock = await Stock.findOne({ where: { bookId } });
        if (stock) {
            stock.quantity = quantity;
            await stock.save();
        } else {
            await Stock.create({ bookId, quantity });
        }
    }
}
