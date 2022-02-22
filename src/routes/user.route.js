import express from 'express';
import * as userController from '../controllers/user.controller';
import { newUserValidator } from '../validators/user.validator';
import { setRole } from '../middlewares/auth.middleware'

const router = express.Router();

//register for user
router.post('/registrationUser',newUserValidator,setRole('user'),userController.registration)

//register for admin
router.post('/registrationAdmin',newUserValidator,setRole('admin'),userController.registration)

//login
router.post("/login", userController.login);

export default router;
