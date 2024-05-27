import { Request, Response } from 'express';
import { UserBookService } from '../services/UserBookService';
import { BookService } from '../services/BookService';
import { UserBook } from '../models/UserBook';
import { Book } from '../models/Book';

class UserBookController {
  public static async addUserBook(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId); 
    const bookId = req.body.bookId; 

    try {
      const userBook = await UserBookService.addUserBook(userId, bookId);
      res.status(201).json(userBook);
    } catch (error) {
      console.error('Error adding user book:', error);
      res.status(500).send('Error adding user book');
    }
  }

  public static async deleteUserBook(req: Request, res: Response): Promise<void> {
    const userBookId = parseInt(req.params.id);
    try {
      const success = await UserBookService.deleteUserBook(userBookId); 
      if (success) {
        res.status(204).send();
      } else {
        res.status(404).send('User book not found');
      }
    } catch (error) {
      console.error('Error deleting user book:', error);
      res.status(500).send('Error deleting user book');
    }
  }

  public static async getUserBooks(req: Request, res: Response): Promise<void> {
    const userId = parseInt(req.params.userId);
    try {
      
      const userBooks = await UserBookService.getUserBooks(userId);

     
      const booksWithDetails = await Promise.all(userBooks.map(async (userBook: UserBook) => {
        const bookId = userBook.bookId;
        const book = await BookService.getBookById(bookId);
        if (book) {
          return {
            id: userBook.id,
            title: book.title,
            author: book.author
          };
        } else {
          return null;
        }
      }));

      const filteredBooks = booksWithDetails.filter(book => book !== null) as { id: number, title: string, author: string }[];
      res.json(filteredBooks); 
    } catch (error) {
      console.error('Error getting user books:', error);
      res.status(500).send('Error getting user books');
    }
  }
}

export { UserBookController };
