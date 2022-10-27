import express from 'express'
import ToDoController from '../controllers/ToDoController'
import Authentication from '../middlewares/Authentication'
const Router = express.Router()

Router.route('/add').post(Authentication, ToDoController.addTodo);
Router.route('/all').get(Authentication, ToDoController.getAllTodos);
Router.route('/delete/:id').delete(Authentication, ToDoController.deleteTodo);
Router.route('/update/:id').put(Authentication, ToDoController.updateTodo);

export default Router