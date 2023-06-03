// crreate update nd delete the secton
const Section = require('../models/Section');
const Course = require('../models/Course');

exports.createSection = async (req, res) => {
    try {
        const { sectionName, courseId } = req.body;

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
        const { sectionId, sectionName } = req.body;

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

        return res.status(200).json({
            success: true,
            message: "Sections updated successfully",
            updateSection,
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
        
        await Section.findByIdAndDelete(sectionId);
        await Course.findByIdAndUpdate(courseId, { $pull: { courseContent: sectionId } }, { new: true })
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted section'
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "unable to delete section at this moment ! Please try again"
        })
    }
};