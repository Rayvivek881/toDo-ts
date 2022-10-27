import { Request, Response } from 'express'
import User from '../Model/user'
import encryption from '../middlewares/encryption'
import jwt from 'jsonwebtoken'

const SignUp = async (req: Request, res: Response) => {
    try {
        const { name, username, password } = req.body;
        const result = await User.findOne({ username });
        if (result) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = new User({
            name, username,
            password: encryption(password)
        });
        await user.save();
        const token = jwt.sign({ _id: user._id }, 'secretKey', {
            expiresIn: '3h'
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}



const SignIn = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, 
           password : encryption(password) }).select('-password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        const token = jwt.sign({ _id: user._id }, 'secretKey', {
            expiresIn: '3h'
        });
        res.status(200).json({ token, name : user.name });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export default { SignUp, SignIn }