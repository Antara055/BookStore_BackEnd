import express from 'express';
import * as bookController from '../controllers/book.controllers'
import { adminAuth } from '../middlewares/auth.middleware';
import {userAuth} from '../middlewares/auth.middleware'
import multer from 'multer';
const fileStorageEngine=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'upload')
    },
    filename:(req,file,cb)=>{
cb(null,file.originalname);
    }
})

var upload = multer({ storage: fileStorageEngine });

const router = express.Router();

//Add Books
router.post("",adminAuth,upload.single("image"),bookController.Addbook)

//get all Books
router.get("/",userAuth,bookController.GetAllBooks)

//new arrival
router.get('/newArr', userAuth, bookController.descendingOrder);

//sort books as per price from low to high
router.get('/priceLtoH', userAuth, bookController.priceLowToHighSort);

//sort books as per price from high to low
router.get('/priceHtoL', userAuth, bookController.priceHighToLowSort);

//search
router.get('/:title', userAuth, bookController.searchBook)
export default router;