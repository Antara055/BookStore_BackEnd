import HttpStatus from 'http-status-codes';
import * as cartService from '../services/cart.service';

//add items to cart
export const addToCart = async (req, res, next) => {
    try {
       // const cartUserId=req.body.data.id,
        
        console.log("controller data",req.body)
        const data = await cartService.addToCart(req.body);
            res.status(HttpStatus.CREATED).json({
                code: HttpStatus.CREATED,
                data: data,
                message: 'Book added in cart'
            });
    } catch (error) {
        next(error);
    }
};

//get cart items
export const getCartItem = async (req, res, next) => {
    try {
        const data = await cartService.getCartItems(req.body, res);
        if (data) {
            res.status(HttpStatus.OK).json({
                code: HttpStatus.OK,
                data: data,
                message: 'Cart items are there..'
            });
        }
        else {
            res.status(HttpStatus.NOT_FOUND).json({
                code: HttpStatus.NOT_FOUND,
                data: "",
                message: 'Cart is empty'
            });
        }
    } catch (error) {
        next(error);
    }
};

