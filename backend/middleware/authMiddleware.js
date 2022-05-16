let jwt = require('jsonwebtoken');
var UserModel = require('../models/userModel.js');
const dotenv = require('dotenv');
dotenv.config();

const secret = process.env.SECRET || "SUPER_SECRET";

module.exports= {

    permit: function (...permittedRoles) {
        return (req, res, next) => {
            let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
            if(!token){
                res.status(403).json({message: "Token header not found"});
            }

            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
            }

            if (token) {
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
                            if(permittedRoles.includes(user.role)){
                                next();
                            } else {
                                res.status(403).json({message: "Forbidden"});
                            }
                        });
                    }
                });
            } else {
                res.status(403).json({message: "Token not found"});
            }
        }
    }
}
