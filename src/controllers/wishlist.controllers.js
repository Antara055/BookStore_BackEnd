import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service'


export const AddToWishlist = async (req, res, next) => {
  try {
    const data = await wishlistService.AddToWishlist(req.body);
    if (data === 'Book is already in wishlist') {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `The Book is already in your wishlist.`
      });
    }
    else {
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: data,
        message: "Sucessfully Added in Wishlist"
      })

    }
  } catch (error) {
    next(error)
  }
}

export const fetchWishList = async (req, res, next) => {
  try {
    const data = await wishlistService.fetchWishList(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: "Sucessfully Fetch  Wishlist"
    })
  } catch (error) {
    next(error)
  }
}

