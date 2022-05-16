var express = require('express');
var router = express.Router();
const auth = require("../middleware/authMiddleware.js");
var UserModel = require('../models/userModel.js');
let jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET || "SUPER_SECRET";


router.post("/login", async (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    if (!(username || password)) {
        return response.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }

    UserModel.findOne({username: username}, async function (err, user) {
        if (err) {
            return response.status(500).json({
                message: 'Error when getting user.',
                error: err
            });
        }

        if (!user) {
            return response.status(404).json({
                message: 'No such user'
            });
        }

        bcrypt.compare(password, user.password, (err, res) => {
            if (err) return response.status(404).json({
                message: 'Password validation error'
            });
            if (!res) return response.status(404).json({
                message: 'Invalid password'
            });
            let token = jwt.sign({user: user._id},
                secret,
                {
                    expiresIn: '24h' // expires in 24 hours
                }
            );
            // return the JWT token for the future API calls
            return response.json({
                token: token,
                user: user
            });
        });

    });
});
router.post("/checkToken", auth.permit('user', 'admin'), (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.status(403).json({message: "Not valid token"});
        } else {
            UserModel.findOne({_id: decoded.user}, function (err, user) {
                if (err) {
                    res.status(403).json({message: "Error fetching user from token"});
                }
                if (!user) {
                    res.status(403).json({message: "User from token not found"});
                }
                return res.json({
                    token: token,
                    user: user
                });
            });
        }
    });
});


router.post("/signup", async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let role = req.body.role;

    if(!(username || password || role)) {
        return res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        });
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    var user = new UserModel({
        username : username,
        password : password,
        role : role
    });

    user.save(async function (err, user) {
        if (err) {
            return res.status(500).json({
                message: 'Error when creating user',
                error: err
            });
        }
        return res.status(200).json(user);
    });
});

module.exports = router;
