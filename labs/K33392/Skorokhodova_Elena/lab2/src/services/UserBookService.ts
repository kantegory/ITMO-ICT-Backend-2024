import { UserBook } from '../models/UserBook';
import { Book } from '../models/Book';

class UserBookService {
  public static async addUserBook(userId: number, bookId: number): Promise<UserBook> {
    const userBook = await UserBook.create({ userId, bookId });
    return userBook;
  }

  public static async deleteUserBook(userBookId: number): Promise<boolean> {
    const deletedCount = await UserBook.destroy({ where: { id: userBookId } });
    return deletedCount > 0;
  }

  public static async getUserBooks(userId: number): Promise<any> {
    try {
      const userBooks = await UserBook.findAll({
        where: { userId },
        include: [{ model: Book, as: 'book' }] 
      });
      return userBooks;
    } catch (error: any) {
      throw new Error('Error getting user books: ' + error.message);
    }
  }
}

export { UserBookService };

