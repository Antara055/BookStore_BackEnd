import Book from '../models/book.model'
import logger from '../config/logger';

//addBook
export const addBook = async (req, res) => {
  const bookModel = new Book({
    title: req.title,
    image: req.image,
    author: req.author,
    o_price: req.o_price,
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

//new arrivals
export const descendingOrder = async () => {
  const data = await Book.find().sort([['createdAt', -1]]);
  return data;
};

//sort order of books as per price from low to high
export const priceLowToHighSort = async () => {
  const data = await Book.find().sort({ price: 'asc' })
  return data;
};

//sort order of books as per price from high to low
export const priceHighToLowSort = async () => {
  const data = await Book.find().sort({ price: -1 })
  return data;
};

//Search
export const searchBook = async (req) => {
  const data = await Book.find({
    title: { $regex: req, $options: 'i' }
  });
  if (data) {
    return data;
  }
  else
  return 'book not found';
};