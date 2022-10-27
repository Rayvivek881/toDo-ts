import { Request, Response } from 'express'
import Todo from '../Model/todo'

const addTodo = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const todo = new Todo({ title, description, 
            UserId: req.body.user?._id 
        });
        await todo.save();
        res.status(200).json({ message: 'Todo added successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

const getAllTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find({ UserId: req.body.user?._id });
        res.status(200).json({ todos });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        await Todo.updateOne({_id : id}, {
            $set : {
                title, description, status
            }
        }, { runValidators: true });
        res.status(200).json({ message: 'Todo updated successfully' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default { addTodo, getAllTodos, deleteTodo, updateTodo }