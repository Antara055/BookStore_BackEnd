import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to add book to cart
router.post('/addCartItem', userAuth, cartController.addToCart);

//route to view all cart item
router.get('/:getCartItem', userAuth, cartController.getCartItem);

//route to remove book from cart
router.delete('/removeCartItem',userAuth,cartController.removeCartItem)

export default router;