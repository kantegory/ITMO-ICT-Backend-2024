import sequelize from '../database/index'
import UserHasBook from '../database/models/UserHasBook'
import Book from '../database/models/UserHasBook'
import serviceHandleError from '../utils/serviceHandleError'

const bookRepository = sequelize.getRepository(Book)
const userHasBookRepository = sequelize.getRepository(UserHasBook)

class UserHasBookService {
	public static async getUserBooks(userId: number) {
		try {
			const userBooks = await bookRepository.findAll({ where: { userId } })
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

export default UserHasBookService
