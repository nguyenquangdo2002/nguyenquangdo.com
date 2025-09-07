import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User.js';


//register

const registerUser = async (req, res) => {
    const { username, email, password } = req.body;
    console.log("REGISTER REQ BODY:", req.body);
    try {
        const hashPassword = await bcrypt.hash(password, 12);
        const checkUser = await User.findOne({ email });
        const newUser = new User({
            username,
            email,
            password: hashPassword
        })

        if (checkUser) return res.json({ success: false, message: "User already exists email! please try again!" })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registration Successfull"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Some Error",
        })

    }
}

//login USER 

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        const checkUser = await User.findOne({ email });
        if (!checkUser) return await res.status(400).json({ success: false, message: "Invaid user data , try again" });
        if (!checkUser)
            return await res.status(300).json({ success: false, message: "User doesn't exists!!" });


        console.log("1");
        const token = jwt.sign({
            id: checkUser.id,
            role: checkUser.role,
            email: checkUser.email,
            username: checkUser.username
        },
            "CLIENT_SECRET_KEY",
            { expiresIn: "60m" })
        console.log("token", token);
        res.cookie("token", token, { httpOnly: true, secure: false })
            .json({
                success: true,
                message: "Logged in Successfully",
                user: {
                    email: checkUser.email,
                    role: checkUser.role,
                    id: checkUser.id,
                    username: checkUser.username
                }
            })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "some error"
        })
    }
}
// logoutUser
const logoutUser = async (req, res) => {
    res.clearCookie("token").json(
        {
            success: true,
            message: "Logged out successfully"
        }
    )
}

/// auth middlewart (check decode token xem giong khong )
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        })
    }
    try {
        const decode = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decode;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorised User!!"
        })
    }

}
export default { registerUser, loginUser, authMiddleware, logoutUser }


