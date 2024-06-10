import sequelize from 'src/database'
import Exchange from 'src/database/models/Exchange'
import serviceHandleError from 'src/utils/serviceHandleError'

const exchangeRepository = sequelize.getRepository(Exchange)

class ExchangeService {
	public static async getUserExchanges(userId: number) {
		try {
			return await exchangeRepository.findAll({ where: { userId } })
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Не удалось получить обмены пользователя',
			})
		}
	}

	public static async confirmExchange(exchangeId: number) {
		try {
			return await exchangeRepository.update(
				{ status: 'confirmed' },
				{ where: { id: exchangeId } },
			)
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Не удалось подтвердить обмен',
			})
		}
	}

	public static async createExchange(
		senderId: number,
		recepientId: number,
		bookId: number,
	) {
		try {
			const exchange = await exchangeRepository.create({
				senderId,
				recepientId,
				bookId,
			})
			return exchange
		} catch (error) {
			return serviceHandleError({ error, message: 'Не удалось создать обмен' })
		}
	}

	public static async deleteExchange(exchangeId: number) {
		try {
			const exchange = await exchangeRepository.findByPk(exchangeId)
			if (!exchange) return { message: 'Такой записи не существует' }
			return await exchange.destroy()
		} catch (error) {
			return serviceHandleError({ error, message: 'Не удалось удалить обмен' })
		}
	}
}

export default ExchangeService
