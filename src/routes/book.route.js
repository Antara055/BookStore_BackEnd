import express from 'express';
import * as userController from '../controllers/user.controller';
import { adminAuth } from '../middlewares/auth.middleware';


const router = express.Router();



export default router;