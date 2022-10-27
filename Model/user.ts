import mongoose from 'mongoose';
const UserSchema = new  mongoose.Schema({
    name: String,
    username: String,
    password: Number
}, { timestamps: true });

export default mongoose.model('User', UserSchema);