// Filename : user.js
const express = require("express");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../../middleware/auth");
const Admin = require("../../models/admin.model");
require("dotenv").config();

const email = process.env.EMAiL
const envpass = process.env.PASS

// for date
const options = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};


router.post("/login", async (req, res) => {

    const { password } = req.body;

    if (!password) {
        return res.status(400).json({
            message: "کلمه عبور وارد کنید"
        });
    }
  
    if (password != envpass) {
        res.status(400).json({
            message: "کلمه عبور نادرست است !"
        });
    } else {
        const payload = {
            user: {
                email
            }
        };

        jwt.sign(
            payload,
            "randomString",
            {
                expiresIn: 3600 * 1.5
            },
            
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token,
                    "validityTime": new Date().getTime() + ((3600 * 1.5) * 1000),
                    "validityTimeFa": new Date(new Date().getTime() + ((3600 * 1.5) * 1000)).toLocaleString('fa-IR', options)
                });
            }
        );
    }

})

/**
 * @method - POST
 * @description - Get LoggedIn User
 * @param - /user/me
 */

router.get("/me", auth, async (req, res) => {
    try {
        // request.user is getting fetched from Middleware after token authentication
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
});

module.exports = router