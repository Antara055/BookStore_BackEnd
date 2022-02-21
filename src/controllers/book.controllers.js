import HttpStatus from 'http-status-codes';
import * as bookService from '../services/book.service';

//Add Book
export const Addbook = async (req, res, next) => {
  try {
    const bookData = {
      title: req.body.title,
      image: req.file.path,
      author: req.body.author,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      year: req.body.year
    };
    const data = await bookService.addBook(bookData);
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


//new Arrivals
export const descendingOrder = async (req, res, next) => {
  try {
    const data = await bookService.descendingOrder();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `New Arrivals books fetched successfully`
    });
  } catch (err) {
    next(err);
  }
};
//Price Low to High
export const priceLowToHighSort = async (req, res, next) => {
  try {
    const data = await bookService.priceLowToHighSort();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `All books fetched successfully as per price low to high`
    });
  } catch (err) {
    next(err);
  }
};
//Price High to Low
export const priceHighToLowSort = async (req, res, next) => {
  try {
    const data = await bookService.priceHighToLowSort();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: `All books fetched successfully as per price high to low`
    });
  } catch (err) {
    next(err);
  }
};

//Search book
export const searchBook = async (req, res, next) => {
  try {
    const data = await bookService.searchBook(req.params.title);
      res.status(HttpStatus.OK).json({
        code: HttpStatus.OK,
        data: data,
        message: `Search result`
      });
    }
 catch (err) {
    next(err);
  }
};