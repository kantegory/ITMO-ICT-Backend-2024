import { ExchangeRequest } from '../models/ExchangeRequest';

class ExchangeRequestService {
  public static async createExchangeRequest(userId: number, exchangeWithUserId: number, bookId: number, bookTitle: string): Promise<void> {
    try {
      await ExchangeRequest.create({ userId, exchangeWithUserId, bookId, bookTitle });
    } catch (error) {
      throw new Error('Error creating exchange request');
    }
  }

  public static async deleteExchangeRequest(requestId: number): Promise<boolean> {
    try {
      const deletedCount = await ExchangeRequest.destroy({ where: { id: requestId } });
      return deletedCount > 0;
    } catch (error) {
      throw new Error('Error deleting exchange request');
    }
  }

  public static async getUserExchangeRequests(userId: number): Promise<ExchangeRequest[]> {
    try {
      const exchangeRequests = await ExchangeRequest.findAll({ where: { userId } });
      return exchangeRequests;
    } catch (error) {
      throw new Error('Error fetching exchange requests');
    }
  }

  public static async confirmExchangeRequest(requestId: number): Promise<boolean> {
    try {
      const [updatedCount] = await ExchangeRequest.update({ status: 'confirmed' }, { where: { id: requestId } });
      return updatedCount > 0;
    } catch (error) {
      throw new Error('Error confirming exchange request');
    }
  }

}

export { ExchangeRequestService };
