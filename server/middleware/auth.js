const JWT = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');


exports.auth = async (req, res, next) => {
    try {
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorization").replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            })
        }
        //verification of token
        try {
            const decode = JWT.verify(token, process.env.JWT_SECRET);
            req.user = decode;


        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }

        next();


    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating token",
        })
    }
}

exports.isStudent = async (req, res, next) => {
    try {

        if (req.user.accountType !== 'Student') {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students only"
            })
        }

        next();


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Student cant be verified",
        })
    }
};

exports.isInstructor = async (req, res, next) => {
    try {

        if (req.user.accountType !== 'Instructor') {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Instructor only"
            })
        }

        next();


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Instructor cant be verified",
        })
    }
};

exports.isAdmin = async (req, res, next) => {
    try {
        console.log(req.user.accountType);
        if (req.user.accountType !== "Admin") {
            return res.status(401).json({
                success: false,
                message: "This is a protected route for Admin only"
            })
        }

        next();


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Role cant be verified",
            error: err.message
        })
    }
};