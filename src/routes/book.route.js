import express from 'express';
import * as bookController from '../controllers/book.controllers'
import { adminAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//Add Books
router.post("",adminAuth,bookController.Addbook)
//

//get all Books
router.get("/",adminAuth,bookController.GetAllBooks)

/* //route to sort books in ascending order
router.get('/ascendingOrder', adminAuth, bookController.ascendingOrder);

//route to sort books in descending order
descendingOrderRouter.get('/', adminAuth, bookController.descendingOrder);

//sort books as per price from low to high
router.get('/priceLtoH', adminAuth, bookController.priceLowToHighSort);

//sort books as per price from high to low
router.get('/priceHtoL', adminAuth, bookController.priceHighToLowSort); */

export default router;