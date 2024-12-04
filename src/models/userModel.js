import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a valid username'],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please provide a valid email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please provide a valid password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifiedToken: String,
    verifiedTokenExpiry: Date

})

const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;