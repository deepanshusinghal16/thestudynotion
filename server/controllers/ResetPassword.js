const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const { passwordUpdated } = require('../mail/templates/passwordUpdate')

exports.resetPasswordToken = async (req, res) => {
    try {

        const { email } = req.body;

        if (!email) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email',
            })
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Email id not registered with StudyNotion",
            })
        }

        const token = crypto.randomUUID();
        const updateDetails = await User.findOneAndUpdate(
            { email },
            {
                token: token,
                resetPasswordToken: Date.now() + 5 * 60 * 1000,
            },
            { new: true });


        const url = `https://localhost:3000/update-password/${token}`;

        await mailSender(email, "Password Reset link", `This reset link is valid for 5 minutes only: ${url}`)

        return res.status(200).json({
            success: true,
            message: 'Password reset link',
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: 'Unable to send reset password link ',
        })
    }

}


exports.resetPassword = async (req, res) => {
    try {
        const { token, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "New Password and Confirm Password are not matching",
            })
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is invalid",
            })
        }

        if (user.resetPasswordExpires < Date.now()) {
            return res.status(403).json({
                success: false,
                message: "Link expired, Please create  a new reset password request",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }); 


        return res.json({
            success: true,
            message: "Password updated successfully",
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Unable to reset Password at this monment. Please try again later",
        })
    }
}