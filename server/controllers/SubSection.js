const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


exports.createSubSection = async (req, res) => {
    try {
        const { sectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;

        if (!sectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "Plase enter all the information"
            })
        }

        const videoDetail = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        const subSectionDetails = await SubSection.create({
            title,
            timeDuration,
            description,
            videoUrl: videoDetail.secure_url
        });



        const updatedSection = await Section.findByIdAndUpdate(sectionId, {
            $push: {
                subSection: subSectionDetails._id,
            }
        },
            { new: true }
        ).populate("subSection")

        return res.status(200).json({
            success: true,
            message: "SubSection successfully created",
            updatedSection,
        })



    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error creating SubSection"
        })
    }
};

exports.updateSubSection = async (req, res) => {
    try {

        const { subSectionId, title, timeDuration, description } = req.body;
        const video = req.files.videoFile;

        if (!subSectionId || !title || !timeDuration || !description || !video) {
            return res.status(400).json({
                success: false,
                message: "Plase enter all the information"
            })
        }

        const videoDetail = uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // const subSectionDetails = await SubSection.create({
        //     title,
        //     timeDuration,
        //     description,
        //     videoUrl: videoDetail.secure_url
        // })

        const subSectionDetails = await SubSection.findByIdAndUpdate(subSectionId, {
            title,
            timeDuration,
            description,
            video: videoDetail.secure_url
        }, { new: true })

        return res.status(200).json({
            success: true,
            message: "SubSection updated successfully",
            subSectionDetails
        })


    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error updating SubSection",
            error: e.message
        })
    }
};

exports.deleteSubSection = async (req, res) => {
    try {
        const { subSectionId } = req.params;
        await SubSection.findByIdAndDelete(subSectionId);

        return res.status(200).json({
            success: true,
            messsage: 'Subsection deleted successfully',
        })

    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error deleting SubSection"
        })
    }
};