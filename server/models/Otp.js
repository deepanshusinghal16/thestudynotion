const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const otpSchema = new mongoose.Schema({

    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 10 * 60 * 1000,
    }

});

//to send the email
async function sendVerificationEmail(email, otp) {
    try {

        const response = await mailSender(email, "Verification Email ", emailTemplate(otp));
        console.log("Verification Email Send Successful" + response);

    } catch (e) {
        console.log("Error sending verification email " + e);
        throw e;
    }
}

otpSchema.pre("save", async function (next) {
    await sendVerificationEmail(this.email, this.otp);
    next();
})

module.exports = mongoose.model("OTP", otpSchema);