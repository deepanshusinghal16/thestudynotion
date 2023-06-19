// crreate update nd delete the secton
const Section = require('../models/Section');
const Course = require('../models/Course');
const SubSection = require('../models/Subsection');

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;
        console.log("Inside AAPI of createSection", sectionName, courseId);
        if (!sectionName || !courseId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the fields",
            })
        }

        const newSection = await Section.create({ sectionName: sectionName });

        // now listing this section in its course also ( updating the course)
        const updateCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            { new: true }
        )
            .populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            }).exec();

        return res.status(200).json({
            success: true,
            message: "Section added successfully",
            updateCourse,
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error while adding the section. Please try again.",
        })
    }
};


exports.updateSection = async (req, res) => {
    try {
        const { sectionId, sectionName, courseId } = req.body;

        if (!sectionName || !sectionId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all details",
            })
        }

        const updateSection = await Section.findByIdAndUpdate(
            sectionId,
            {
                sectionName,
            },
            { new: true }
        )

        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        return res.status(200).json({
            success: true,
            message: "Sections updated successfully",
            data: course,
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error updating section",
        })
    }
};

exports.deleteSection = async (req, res) => {
    try {
        const { sectionId, courseId } = req.body;
        const section = await Section.findById(sectionId);

        await SubSection.deleteMany({ _id: { $in: section.subSection } })
        await Section.findByIdAndDelete(sectionId);
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted section',
            data: course
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "unable to delete section at this moment ! Please try again"
        })
    }
};