import express from 'express';
import * as wishlistController from '../controllers/wishlist.controllers';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

// add in wishlist
router.post("",userAuth,wishlistController.AddToWishlist);

// fetch the wishlist
router.get("/",userAuth,wishlistController.fetchWishList);

export default router;