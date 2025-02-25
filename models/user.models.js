import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobileNo: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
      },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods.generateAccessToken = async function(){
    const user = this;
    const accessToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    return accessToken;
}
userSchema.methods.generateRefreshToken = async function(){
    const user = this;
    const refreshToken = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    return refreshToken;
}

 const User = mongoose.model('User', userSchema);

 export default User;