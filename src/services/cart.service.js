import Cart from '../models/cart.model'
import Book from '../models/book.model'

//add to cart
export const addToCart = async (req, res) => {
    const Book_Available = await Book.findOne({
        _id: req.body.BookID
    })
    const user_Active_Cart = await Cart.findOne({
        UserID: req.body.data.id
    });

    if (Book_Available) {
        if (!user_Active_Cart) {
            const NewCart = new Cart({
                UserID: req.body.data.id,
                BookID: req.body.BookID,
                Quantity: req.body.Quantity,
                BookName: Book_Available.title,
                Price: Book_Available.price,
                TotalAmount: Book_Available.price * req.body.Quantity
            });
            return await NewCart.save()
        }
        else {
            const previous_addedBook = await Cart.findOne({
                BookID: req.body.BookID
            });
            if (!previous_addedBook) {
                const NWishList = new Cart({
                    UserID: req.body.data.id,
                    BookID: req.body.BookID,
                    Quantity: req.body.Quantity,
                    BookName: Book_Available.title,
                    Price: Book_Available.price,
                    TotalAmount: Book_Available.price * req.body.Quantity
                });
                return await NWishList.save()
            }
            else {
                const cartdata = {
                    UserID: req.body.data.id,
                    BookID: req.body.BookID,
                    Quantity: previous_addedBook.Quantity + req.body.Quantity,
                    BookName: Book_Available.title,
                    Price: Book_Available.price,
                    TotalAmount: previous_addedBook.TotalAmount + (Book_Available.price * req.body.Quantity)
                }
                await Cart.findByIdAndUpdate(user_Active_Cart._id, cartdata, { new: true })

            }
        }
    }
}


//get all cart item
 export const getCartItems = async (req) => {
    let cartData = await Cart.find({ UserID: req.data.id });
    return cartData;
}; 

