import { Request, Response } from 'express'

import ExchangeService from '../services/ExchangeService'
import handleError from '../utils/handleError'

class ExchangeController {
	public static async createExchange(req: Request, res: Response) {
		const { senderId, recepientId, bookId } = req.body
		try {
			const exchange = await ExchangeService.createExchange(
				senderId,
				recepientId,
				bookId,
			)
			return res.status(201).json(exchange)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при создании обмена',
			})
		}
	}

	public static async deleteExchange(req: Request, res: Response) {
		const exchangeId = Number(req.body.id)
		try {
			const success = await ExchangeService.deleteExchange(exchangeId)
			if (success) {
				return res.status(204).send('Обмен успешно удалён')
			}
			return res.status(404).send('Запись обмена не найдена')
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при удалении запроса на обмен',
			})
		}
	}

	public static async getUserExchanges(req: Request, res: Response) {
		const userId = Number(req.params.userId)
		try {
			const exchanges = await ExchangeService.getUserExchanges(userId)
			return res.status(201).json(exchanges)
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при получении обменов',
			})
		}
	}

	public static async confirmExchange(req: Request, res: Response) {
		const exchangeId = Number(req.params.id)
		try {
			const success = await ExchangeService.confirmExchange(exchangeId)
			if (success) {
				return res.status(200).send('Обмен успешно подтверждён')
			}
			return res.status(404).send('Обмен не найден')
		} catch (error) {
			return handleError({
				res,
				error,
				code: 500,
				text: 'Ошибка при подтверждении обмена',
			})
		}
	}
}

export default ExchangeController
