import passport from 'passport'
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from '../../models/User.js'
import crypto from "crypto"
import dotenv from 'dotenv'

dotenv.config();


passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback"
},

    async (accessToken, refreshToken, profile, done) => {
        try {
            const email = profile.emails?.[0]?.value;
            if (!email) return done(new Error("Email not found in Google profile"), null);
            // neu da co user voi google ID , return luon 
            let user = await User.findOne({ googleId: profile.id });
            if (user) return done(null, user);
            // neu khong , tim theo email va gan google ID neu can 
            user = await User.findOneAndUpdate(
                { email },
                {
                    $setOnInsert: {
                        username: profile.displayName,
                        googleId: profile.id,
                        password: crypto.randomUUID // chi dung tam , khong dang nhap local 
                    },
                    $set: {
                        googleId: profile.id
                    }
                },
                {
                    new: true,
                    upsert: true
                }
            )
            return done(null, user);

        } catch (error) {
            return done(error, null)
        }
    }

));

//serializeUser: khi xác thực thành công, lưu user.id vào session.
passport.serializeUser((user, done) => {
    done(null, user.id);
})


//deserializeUser: mỗi lần request có session, lấy user.id ra để tìm lại thông tin user trong DB.
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null)
    }
})

