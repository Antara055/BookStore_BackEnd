import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

//Add Book
export const Addbook = async (req, res, next) => {
    try {
      const data = await bookService.addBook(req.body);
      console.log(req.body)
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: 'Book added successfully'
      });
    } catch (error) {
      next(error);
    }
  };
  
  //GetAllBooks
  export const GetAllBooks = async (req, res, next) => {
    try {
      const data = await bookService.getAllUsers();
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: 'All books fetched successfully'
      });
    } catch (error) {
      next(error);
    }
  };

  //ascendingOrder
  export const ascendingOrder = async (req, res, next) => {

  };

  //