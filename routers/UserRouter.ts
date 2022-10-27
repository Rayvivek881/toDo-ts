import express from 'express'
import UserController from '../controllers/UserController'
const Router = express.Router()

Router.route('/signup').post(UserController.SignUp);
Router.route('/signin').post(UserController.SignIn);

export default Router