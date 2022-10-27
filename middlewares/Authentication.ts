import jwt from 'jsonwebtoken';
import User from '../Model/user';
import { Request, Response, NextFunction } from 'express';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    try {
        const { _id } = jwt.verify(token, 'secretKey') as { _id: string };
        req.body.user = await User.findById(_id).select('-password');
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}

export default verifyToken;