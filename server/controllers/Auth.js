const User = require('../models/User');
const OTP = require('../models/Otp');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const Profile = require('../models/Profile');
const JWT = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

exports.sendOTP = async (req, res) => {

    try {

        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });
        if (checkUserPresent) {
            //console.log("Email already registered");
            return res.status(401).json({
                success: false,
                message: 'Email already registered',
            })
        }

        //otp generation
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        let uniqueOTP = await OTP.findOne({ otp });

        while (uniqueOTP) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            uniqueOTP = await OTP.findOne({ otp });
        }


        const otpPlayload = { email, otp };

        const OTPbody = await OTP.create(otpPlayload);

        res.status(200).json({
            success: true,
            message: "OTP send successfully",
            otp,
        });


    } catch (err) {

        return res.status(500).json({
            success: false,
            message: "Error in Generating the OTP",
            error: err.message,
        })
    }

};


exports.signUp = async (req, res) => {
    try {

        const { firstName, lastName, email, contactNumber, password, confirmPassword, accountType, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fileds",
            })
        }


        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Password and Confirm Password not matching',
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: true,
                message: 'Email already registered',
            })
        }

        //find most resent otp
        const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);



        //console.log(response);
        if (otp !== response[0].otp) {
            //console.log("OTP not marxh")
            return res.status(400).json({
                success: false,
                message: 'Invalid OTP',
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        let approved = "";
        approved === "Instructor" ? (approved = false) : (approved = true);
        const userProfile = await Profile.create({
            contactNumber: null,
            gender: null,
            dob: null,
            about: null
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            approved,
            additionalDetails: userProfile._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        });

        return res.status(200).json({
            success: true,
            message: "Successfully Registered",
            user
        })


    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "User could not be signed in at this moment",
        })
    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fileds",
            })
        }

        const user = await User.findOne({ email }).populate("additionalDetails");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User does not exist",
            })
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = JWT.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });
            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, options);
            res.status(200).json({
                success: true,
                token,
                user,
                message: "Logged successful",
            })

        } else {
            res.status(401).json({
                success: false,
                message: "Invalid credentials",
            })
        }

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Unable to Login, Please try again",
        })
    }
};

exports.changePassword = async (req, res) => {
    try {

        const userDetails = await User.findById(req.user.id);
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        if (!newPassword || !confirmNewPassword) {
            return res.status(403).json({
                success: false,
                message: "Please fill all the fileds",
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({
                success: false,
                message: 'New Passwords not matching',
            })
        }

        if (await bcrypt.compare(oldPassword, userDetails.password)) {
            const encryptedPassword = await bcrypt.hash(newPassword, 10);
            const updatedUserDetails = await User.findByIdAndUpdate(
                req.user.id,
                { password: encryptedPassword },
                { new: true }
            );

            //mail sending
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password Updated",
                passwordUpdated(
                    updatedUserDetails.email,
                    `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
            );

            //console.log("Email sent successfully:", emailResponse.response);
            return res.status(200).json({
                success: true,
                message: "Password updated successfully",
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Incorrect Password",
            })
        }

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Unable to change password , Please try again later",
        })
    }
};



