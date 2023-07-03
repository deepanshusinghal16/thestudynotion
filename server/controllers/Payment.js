const { instance } = require('../config/razorpay');
const Course = require('../models/Course');
const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const { courseEnrollmentEmail } = require('../mail/templates/courseEnrollmentEmail');
const { default: mongoose } = require('mongoose');
const { paymentSuccessEmail } = require('../mail/templates/paymentSuccessEmail');
const crypto = require('crypto');
const CourseProgress = require('../models/CourseProgress');

// capture the payment and iniitalatie the rayzorpay payment
exports.capturePayment = async (req, res) => {
    const { courses } = req.body;
    const userId = req.user.id;

    if (courses.length === 0) {
        return res.json({
            success: false,
            message: "Please provide atleast one courseId"
        })
    }

    let totalAmount = 0;
    for (const course_id of courses) {
        let course;
        try {
            course = await Course.findById(course_id);
            if (!course) {
                return res.status(200).json({
                    success: false,
                    message: "Course not found"
                })
            }

            const uid = new mongoose.Types.ObjectId(userId);
            if (course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({
                    success: false,
                    message: "Already enrolled",
                })
            }

            totalAmount += course.price;
        }
        catch (error) {
            //console.log(error);
            return res.status(500).json({
                success: false,
                message: error.message,
            })
        }
    }

    const options = {
        amount: totalAmount * 100,
        currency: "INR",
        receipt: Math.random(Date.now()).toString(),
    }

    try {
        const paymentResponse = await instance.orders.create(options);
        //console.log("paymentResponse", paymentResponse)
        return res.json({
            success: true,
            message: paymentResponse
        })
    }
    catch (error) {
        //console.log("ERROR AAYI GYI", error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

exports.verifyPayment = async (req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;
    //console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, userId);
    if (!razorpay_payment_id || !razorpay_signature || !razorpay_order_id) {
        return res.status(200).json({
            success: false,
            message: "Payment Failed",
        })
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET).update(body.toString()).digest("hex");

    if (expectedSignature === razorpay_signature) {

        //  lets enroll the student in the courses he/she buyed
        await enrollStudents(courses, userId, res);

        return res.status(200).json({
            success: true,
            message: "Payment Verified",
        })
    }
    return res.status(200).json({
        success: false,
        message: "Payment Failed",
    })

}

const enrollStudents = async (courses, userId, res) => {

    if (!courses || !userId) {
        return res.status(400).json({
            success: false,
            message: "Please provide valid userId and courses",
        })
    }
    for (const courseId of courses) {
        try {
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { new: true }
            )

            if (!enrolledCourse) {
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                })
            }

            const courseProgess = await CourseProgress.create({
                courseId: courseId,
                userId: userId,
                completedVideos: []
            })

            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {
                    $push: {
                        courses: courseId,
                        courseProgess: courseProgess._id,
                    }
                },
                { new: true });

            //now email sending just for verification for the sutdent
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled in ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName}  ${enrolledStudent.lastName} `)
            )
            //console.log("Email sent successfully");

        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body;

    const userId = req.user.id;

    if (!userId || !paymentId || !amount || !orderId) {
        return res.status(400).json({ success: false, message: "Details missing" })
    }

    try {
        const enrollStudent = await User.findById(userId);
        await mailSender(
            enrollStudent.email,
            'Payment Recieved',
            paymentSuccessEmail(`${enrollStudent.firstName}  ${enrollStudent.lastName}`, amount / 100, orderId, paymentId)
        )
    }
    catch (err) {
        //console.log("Error in sending payment recived mail");
        return res.status(500).json({ success: false, message: "Could not send payment recived mail" })
    }

}
