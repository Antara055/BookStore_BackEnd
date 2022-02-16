import Book from '../models/book.model'
import logger from '../config/logger';

//addBook
export const addBook = async (req,res) => {
    const bookModel=new Book({
      title: req.title,
      image: req.file ,
      author: req.author,
      price: req.price,
      quantity: req.quantity,
      description: req.description,
      year: req.year
    })
    return await bookModel.save();
  } 
  
  //get all books
  export const getAllUsers = async () => {
    const data = await Book.find();
    return data;
  };