import Cart from '../models/cart.model'
import Book from '../models/book.model'
import logger from '../config/logger'

//add to cart
export const addToCart= async(req,res)=>{
  const bookData = await Book.findById({ _id: req.BookID });
  const avl_quantity=bookData.quantity;
  const extng_cart = await Cart.findOne({UserID:req.data.id})
  if(extng_cart){
    const extng_book=extng_cart.Book.find(bookInCart => bookInCart.BookID == req.BookID)
      if(extng_book){
        extng_book.Quantity += 1;
        extng_cart.TotalAmount=extng_cart.TotalAmount+bookData.price;
        const updateCart= await Cart.findByIdAndUpdate({
          _id: extng_cart._id
      }, {
          Book: extng_cart.Book,
          TotalAmount: extng_cart.TotalAmount
      }).exec();
      updateCart, { upsert: true }
      return updateCart;
      } else{
        bookData.quantity=1;
        const newBook={
          BookId:bookData._id,
          Quantity:bookData.quantity,
          Prices:bookData.price
        }
        extng_cart.Book.push(newBook)
        const cart = await Cart.findByIdAndUpdate({
          _id: extng_cart._id
      }, {
          $set: {
            Book:extng_cart.Book,
            TotalAmount: extng_cart.TotalAmount + bookData.quantity * bookData.price,
          },
      });
      cart, {
          new: true
      }
      return cart;
    }
    }else{
      bookData.quantity=1;
      let userCart = new Cart({
        "UserID": req.data.id,
        "Book": {
            BookID: bookData._id,
            Quantity: bookData.quantity,
            PriceS: bookData.price,
        },
        "TotalAmount": bookData.quantity * bookData.price,
    })
    const newCart = await userCart.save();
    return newCart;
    }
  }


//get all cart item
 export const getCartItems = async (req) => {
    let cartData = await Cart.find({ UserID: req.data.id });
    return cartData;
}; 

