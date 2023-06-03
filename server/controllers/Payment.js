const { instance } = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');

// capture the payment and iniitalatie the rayzorpay payment
exports.capturePayment = async (req, res) => {
    try {

        const { courseId } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return res.status(401).json({
                success: false,
                message: "Please enter a valid course ID",
            })
        }

        const courseDetails = await Course.findById(courseId);
        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "This is not a valid course"
            })
        }

        const uid = new mongoose.Types.ObjectId(userId);
        if (courseDetails.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success: false,
                message: "Already Purchased the course",
            })
        }

        const amount = courseDetails.price;
        const currency = "INR";

        const options = {
            amount: amount * 100,
            currency,
            recipt: Math.random(Date.now()).toString(),
            notes: {
                courseId,
                userId,
            }
        };

        const paymentResponse = await instance.order.create(options);
        console.log("PaymentResponse: " + paymentResponse);

        return res.status(200).json({
            success: true,
            courseName: courseDetails.courseName,
            courseDescription: courseDetails.courseDescription,
            thumbnail: courseDetails.thumbnail,
            orderId: paymentResponse.orderId,
            currency: paymentResponse.currency,
            amount: paymentResponse.amount,
            recipt: paymentResponse.recipt,
        })

    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Could not create payment",
        })

    }
};

exports.verifySignature = async (req, res) => {
    const webhookSecret = "12345678";
    const signature = req.headers["x-rayzor-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
        console.log("Payment is authorized");

        const { courseId, userId } = req.body.payload.payment.entity.notes;

        try {

            const enrolledCourse = await Course.findByIdAndUpdate(courseId,
                { $push: { studentsEnrolled: userId } },
                { new: true }
            );

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: 'Course not found',
                })
            }

            console.log("Enrolled Course " + enrolledCourse);

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                { $push: { courses: courseId } },
                { new: true }
            );

            console.log("Enrolled Course " + enrolledStudent);

            //mail sending
            const emailResponse = await mailSender(enrolledStudent.email,
                "Congratulations",
                "Yooo, you have successfully joined the journey with StudyNotion"
            );

            return res.status(200).json({
                success: true,
                message: "Successfully purchasedt the course",
            })


        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "Something went wrong while entrolling in the course"
            })
        }
    }
    else {
        // signture didnt matched
        return res.status(400).json({
            success: false,
            message: "Invalid request",
        })
    }
};

