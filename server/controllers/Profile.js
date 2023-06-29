const User = require('../models/User');
const Profile = require('../models/Profile');
const { uploadImageToCloudinary } = require('../utils/imageUploader')

exports.updateProfile = async (req, res) => {
  console.log("Inside API")
  try {
    const { dob = "", about = "", contactNumber = "**********", gender = "" } = req.body;
    const id = req.user.id;

    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    profileDetails.dob = dob;
    profileDetails.contactNumber = contactNumber;
    profileDetails.about = about;
    profileDetails.gender = gender;
    await profileDetails.save();


    const updatedUserDetails = await User.findById(id).populate('additionalDetails');
    return res.status(200).json({
      success: true,
      message: 'Profile saved successfully',
      updatedUserDetails
    });


  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Unable to update profile"
    })
  }
};

//how can we sechule this delete profile  ---------   HW
exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Profile not found",
      })
    }


    await Profile.findByIdAndDelete(userDetails.additionalDetails);
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: 'Account deleted successfully',
    })


  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
      error: e.message
    })
  }
};


exports.getAllUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetails = await User.findById(id).populate('additionalDetails').exec();
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      })
    }

    return res.status(200).json({
      success: true,
      message: "User Details fetched successfully",
      userDetails,
    })


  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch profileDetails at this moment",
      error: e.message,
    })
  }
};


exports.updateDisplayPicture = async (req, res) => {
  try {

    const displayPicture = req.files.displayPicture
    const userId = req.user.id

    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log(image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating profile",
      error: error.message,
    })
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    const userDetails = await User.findOne({
      _id: userId,
    })
      .populate({
        path: "courses",
        populate: [
          { path: "category", model: "Category" },
          { path: "instructor", model: "User" },
          { path: 'courseContent', model: "Section", populate: { path: "subSection", model: 'SubSection' } }
        ]
      })
      .exec();
    // const userDetails = await User.findOne({ _id: userId })
    //   .populate({
    //     path: 'courses',
    //     populate: {
    //       path: 'instructor',
    //       model: 'User'
    //     }
    //   })
    //   .populate({
    //     path: 'courses',
    //     populate: {
    //       path: 'category',
    //       model: 'Category'
    //     }
    //   })
    //   .populate({
    //     path: 'courses',
    //     populate: {
    //       path: 'section.subsection',
    //       model: 'Subsection'
    //     }
    //   })
    //   .exec();

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetails}`,
      })
    }
    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
};
