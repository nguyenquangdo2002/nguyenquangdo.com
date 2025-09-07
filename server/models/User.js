import mongoose from 'mongoose';


// cach taoj 1 schema 
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: [true, "Password is required"],
    },
    role: {
        type: String,
        default: "user"
    }


})

// tao 1 model 
const User = mongoose.model("User", UserSchema);
export default User; 