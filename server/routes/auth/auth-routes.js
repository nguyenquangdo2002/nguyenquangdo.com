import express from 'express'
import authController from '../../controllers/auth/auth-controller.js';
import passport from 'passport';
import { getTransactionHistory } from '../../controllers/auth/mbbank-controller.js';
const router = express.Router();

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser)
router.post("/logout", authController.logoutUser);
router.get("/check-auth", authController.authMiddleware, (req, res) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        message: "Authenticated User!!",
        user
    })
})
router.post('/transactions', getTransactionHistory);

router.get("/google",
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
)
router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "/login",
    session: true
}), (req, res) => {
    res.redirect("http://localhost:5173/shop/home")
})
export default router;
