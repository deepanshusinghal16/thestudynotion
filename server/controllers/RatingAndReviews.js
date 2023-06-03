const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');
const { mongo, default: mongoose } = require("mongoose");

//creating ratring
exports.createRating = async (req, res) => {
    try {
        //*****user should be enrolled in that course and should not have dont review earlier,in order to create Review***
        const userId = req.user.id;
        const { rating, review, courseId } = req.body;

        const courseDetails = await Course.findOne({
            _id: courseId,
            studentsEnrolled: { $eleMatch: { $eq: userId } },
        });

        if (!courseDetails) {
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course",
            })
        }

        const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });
        if (alreadyReviewed) {
            return res.status(403).json({
                success: false,
                message: "Student has already reviewed the course",
            })
        }

        const ratingReview = await RatingAndReview.create({ user: userId, course: courseId, rating, review });

        const updateCourse = await Course.findByIdAndUpdate(courseId,
            {
                $push: { ratingAndReviews: ratingReview._id },
            }, { new: true });
        console.log("Updated course" + updateCourse)
        return res.status(200).json({
            success: true,
            message: 'Rating updated successfully',
            ratingReview,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error entring a ratingReview",
        })
    }
};

//avg ratring
exports.getAverageRating = async (req, res) => {
    try {

        const courseId = req.body.courseId;

        //now calculating the avg rating
        const result = await RatingAndReview.aggregate([
            { $match: { course: new mongoose.Types.ObjectId(courseId) }, },
            { $group: { _id: null, averageRating: { $avg: "$rating" } } },
        ]);

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        }
        return res.status(200).json({
            success: true,
            message: "Avg Rating is 0, as no one reviewd it yet..!",
            averageRating: 0,
        });


    } catch (error) {

    }
};

//getingAll Rating
exports.getAllRating = async (req, res) => {
    try {
        const allRating = await RatingAndReview.find({})
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();

        return res.status(200).json({
            success: true,
            message: "Successfully retrieved the ratings...! Swaahaa........",
            rating: allRating,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch the rating at this moment...",
        })
    }
};

exports.getAllRatingOfACourse = async (req, res) => {
    try {
        const courseId = req.body.courseId;

        const courseRating = await RatingAndReview.findOne({ course: courseId })
            .sort({ rating: "desc" })
            .populate({
                path: "user",
                select: "firstName lastName email image"
            })
            .populate({
                path: "course",
                select: "courseName"
            })
            .exec();
        return res.status(200).json({
            success: true,
            message: "Successfully retrieved the ratings for this course...! Swaahaa........",
            rating: courseRating,
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to fetch the rating of this course  at this moment...",
        })
    }
};