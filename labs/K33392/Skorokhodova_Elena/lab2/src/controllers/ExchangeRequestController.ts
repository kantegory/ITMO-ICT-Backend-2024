import { Request, Response } from 'express';

import { ExchangeRequestService } from '../services/ExchangeRequestService';

class ExchangeRequestController {
  public static async createExchangeRequest(req: Request, res: Response): Promise<void> {
    const { userId, exchangeWithUserId, bookId, bookTitle } = req.body;
    try {
      await ExchangeRequestService.createExchangeRequest(userId, exchangeWithUserId, bookId, bookTitle);
      res.status(201).send('Exchange request created successfully');
    } catch (error) {
      console.error('Error creating exchange request:', error);
      res.status(500).send('Error creating exchange request');
    }
  }

  public static async deleteExchangeRequest(req: Request, res: Response): Promise<void> {
    const requestId = parseInt(req.params.id);
    try {
      const success = await ExchangeRequestService.deleteExchangeRequest(requestId);
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('Exchange request not found');
      }
    } catch (error) {
      console.error('Error deleting exchange request:', error);
      res.status(500).send('Error deleting exchange request');
    }
  }

  public static async getUserExchangeRequests(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId);
    try {
      const exchangeRequests = await ExchangeRequestService.getUserExchangeRequests(userId);
      res.json(exchangeRequests);
    } catch (error) {
      console.error('Error fetching exchange requests:', error);
      res.status(500).send('Error fetching exchange requests');
    }
  }

  public static async confirmExchangeRequest(req: Request, res: Response): Promise<void> {
    const requestId = parseInt(req.params.id);
    try {
      const success = await ExchangeRequestService.confirmExchangeRequest(requestId);
      if (success) {
        res.status(200).send('Exchange request confirmed successfully');
      } else {
        res.status(404).send('Exchange request not found');
      }
    } catch (error) {
      console.error('Error confirming exchange request:', error);
      res.status(500).send('Error confirming exchange request');
    }
  }

}

export { ExchangeRequestController };
