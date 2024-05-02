import { Request, Response } from "express";
import { BookService } from "../services/BookService";

class BookController {
  public static async createBook(req: Request, res: Response): Promise<void> {
    const { title, author } = req.body;
    try {
      await BookService.createBook(title, author);
      res.status(201).send("Book created successfully");
    } catch (error) {
      console.error("Error creating book:", error);
      res.status(500).send("Error creating book");
    }
  }

  public static async getAllBooks(req: Request, res: Response): Promise<void> {
    try {
      const books = await BookService.getAllBooks();
      res.json(books);
    } catch (error) {
      console.error("Error fetching books:", error);
      res.status(500).send("Error fetching books");
    }
  }
}

export { BookController };
