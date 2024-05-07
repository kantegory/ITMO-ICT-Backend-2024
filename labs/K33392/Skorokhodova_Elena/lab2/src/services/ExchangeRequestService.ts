import { ExchangeRequestRepository } from '../repositories/ExchangeRequestRepository';
import { ExchangeRequest } from '../models/ExchangeRequest';

class ExchangeRequestService {
  public static async createExchangeRequest(userId: number, exchangeWithUserId: number, bookId: number, bookTitle: string): Promise<void> {
    try {
      await ExchangeRequestRepository.createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle);
    } catch (error) {
      throw new Error('Error creating exchange request');
    }
  }

  public static async deleteExchangeRequest(requestId: number): Promise<boolean> {
    try {
      return await ExchangeRequestRepository.deleteExchangeRequest(requestId);
    } catch (error) {
      throw new Error('Error deleting exchange request');
    }
  }

  public static async getUserExchangeRequests(userId: number): Promise<ExchangeRequest[]> {
    try {
      return await ExchangeRequestRepository.getUserExchangeRequests(userId);
    } catch (error) {
      throw new Error('Error fetching exchange requests');
    }
  }

  public static async confirmExchangeRequest(requestId: number): Promise<boolean> {
    try {
      return await ExchangeRequestRepository.confirmExchangeRequest(requestId);
    } catch (error) {
      throw new Error('Error confirming exchange request');
    }
  }
}

export { ExchangeRequestService };
