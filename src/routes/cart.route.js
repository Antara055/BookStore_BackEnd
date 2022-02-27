import express from 'express';
import * as cartController from '../controllers/cart.controller';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();


//route to add book to cart
router.post('', userAuth, cartController.addToCart);

//route to view all cart item
router.get('/', userAuth, cartController.getCartItem);

export default router;