import { Model } from 'sequelize-typescript';
import { ExchangeRequest } from '../models/ExchangeRequest';

class ExchangeRequestRepository {
  public static async createExchangeRequest(userId: number, exchangeWithUserId: number, bookId: number, bookTitle: string): Promise<void> {
    try {
      await ExchangeRequest.create({ userId, exchangeWithUserId, bookId, bookTitle });
    } catch (error) {
      throw new Error('Ошибка при создании запроса на обмен');
    }
  }

  public static async deleteExchangeRequest(requestId: number): Promise<boolean> {
    try {
      const deletedCount = await ExchangeRequest.destroy({ where: { id: requestId } });
      return deletedCount > 0;
    } catch (error) {
      throw new Error('Ошибка при удалении запроса на обмен');
    }
  }

  public static async getUserExchangeRequests(userId: number): Promise<ExchangeRequest[]> {
    try {
      const exchangeRequests = await ExchangeRequest.findAll({ where: { userId } });
      return exchangeRequests;
    } catch (error) {
      throw new Error('Ошибка при получении запросов на обмен');
    }
  }

  public static async confirmExchangeRequest(requestId: number): Promise<boolean> {
    try {
      const [updatedCount] = await ExchangeRequest.update({ status: 'confirmed' }, { where: { id: requestId } });
      return updatedCount > 0;
    } catch (error) {
      throw new Error('Ошибка при подтверждении запроса на обмен');
    }
  }
}

export { ExchangeRequestRepository };
