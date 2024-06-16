import { Book } from '../models/Book';

class BookService {
  public static async createBook(title: string, author: string): Promise<void> {
    try {
      const book = await Book.create({ title, author });
      console.log('Book created:', book.toJSON());
    } catch (error) {
      console.error('Error creating book:', error);
      throw error; 
    }
  }

  public static async getAllBooks(): Promise<Book[]> {
    try {
      const books = await Book.findAll();
      return books;
    } catch (error) {
      console.error('Error fetching books:', error);
      throw new Error('Error fetching books');
    }
  }

  public static async addBook(title: string, author: string): Promise<Book> {
    const book = await Book.create({ title, author });
    return book;
  }

  public static async deleteBook(id: number): Promise<boolean> {
    const deletedCount = await Book.destroy({ where: { id } });
    return deletedCount > 0;
  }

  public static async getBookById(id: number): Promise<Book | null> {
    try {
      const book = await Book.findByPk(id);
      return book;
    } catch (error) {
      console.error('Error fetching book by id:', error);
      throw new Error('Error fetching book by id');
    }
  }
}

export { BookService };
