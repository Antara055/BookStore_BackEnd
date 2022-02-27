import Book from "../models/book.model";
import WishList from "../models/wishlist.model";


//add to cart
export const AddToWishlist= async(req,res)=>{
    const bookData = await Book.findById({ _id: req.BookID });
    const extng_wl = await WishList.findOne({UserID:req.data.id})
    if(extng_wl){
      const extng_book=extng_wl.Book.find(bookInCart => bookInCart.BookID == req.BookID)
        if(extng_book){
        return "Book is already in wishlist";
        } else{
          const newBook={
            BookId:bookData._id,
            Prices:bookData.price
          }
          extng_wl.Book.push(newBook)
          const cart = await WishList.findByIdAndUpdate({
            _id: extng_wl._id
        }, {
            $set: {
              Book:extng_wl.Book,
            },
        });
        cart, {
            new: true
        }
        return cart;
      }
      }else{
        let userWl = new WishList({
          "UserID": req.data.id,
          "Book": {
              BookID: bookData._id,
              Prices: bookData.price,
          },
      })
      const newWl = await userWl.save();
      return newWl;
      }
    }

//get all wishlist item
export const fetchWishList = async (body) => {
    const user_Active_WishList = await WishList.find({
        UserID: body.data.id
    });
    return user_Active_WishList;
}

