import mongoose from 'mongoose';
const TodoSchema = new  mongoose.Schema({
    title: String,
    description: String,
    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        enum: ['open', 'in-progress', 'done'],
        default: 'open'
    }
});

export default mongoose.model('Todo', TodoSchema);