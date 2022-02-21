import Book from "../models/book.model";
import WishList from "../models/wishlist.model";

export const AddToWishlist = async (req) => {
    const Book_Available = await Book.findOne({
        _id: req.body.BookID
    })
    console.log(req.body);
    const user_Active_WishList = await WishList.findOne({
        UserID: req.body.data.id
    });

    if (Book_Available) {
        if (!user_Active_WishList) {
            const NewWishList = new WishList({
                UserID: req.body.data.id,
                BookID: req.body.BookID,
                BookName: Book_Available.title,
                Price: Book_Available.price,
                image: Book_Available.image
            });
            return await NewWishList.save()
        } else {
            const previous_WishList = await WishList.findOne({
                BookID: req.body.BookID
            });
            if(!previous_WishList){
                const NWishList = new WishList({
                    UserID: req.body.data.id,
                    BookID: req.body.BookID,
                    BookName: Book_Available.title,
                    Price: Book_Available.price,
                    image: Book_Available.image
                });
                return await NWishList.save() 
            }
            else{
            return 'Cannot add to wishlist';
            }
        }
    }
}


export const fetchWishList = async (body) => {
    const user_Active_WishList = await WishList.find({
        UserID: body.USER_ID
    });
    return user_Active_WishList;
}

