import sequelize from 'src/database'
import serviceHandleError from 'src/utils/serviceHandleError'

import UserHasBook from '../database/models/UserHasBook'
import Book from '../database/models/UserHasBook'

const bookRepository = sequelize.getRepository(Book)
const userHasBookRepository = sequelize.getRepository(UserHasBook)

class UserBookService {
	public static async getUserBooks(userId: number) {
		try {
			const userBooks = await userHasBookRepository.findAll({
				where: { userId },
				include: [{ model: bookRepository, as: 'book' }],
			})
			return userBooks
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Ошибка при получении книг пользователя',
			})
		}
	}

	public static async addUserBook(userId: number, bookId: number) {
		try {
			const userBook = await userHasBookRepository.create({ userId, bookId })
			return userBook
		} catch (error) {
			return serviceHandleError({
				error,
				message: 'Не удалось присвоить книгу пользователю',
			})
		}
	}

	public static async deleteUserBook(userBookId: number) {
		try {
			const userHasBook = await userHasBookRepository.findByPk(userBookId)
			if (!userHasBook) return { message: 'Такой записи не существует' }
			return await userHasBook.destroy()
		} catch (error) {
			serviceHandleError({
				error,
				message: 'Не удалось удалить книгу у пользователя',
			})
		}
	}
}

export default UserBookService
