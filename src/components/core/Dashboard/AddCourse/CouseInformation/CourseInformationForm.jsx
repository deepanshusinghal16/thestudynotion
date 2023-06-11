import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import ChipInput from "./ChipInput";
import Upload from "./Upload";
import RequirementsField from './RequirementsField';
import { setCourse, setStep } from '../../../../../slices/courseSlice';
import { toast } from 'react-hot-toast';
import { COURSE_STATUS } from '../../../../../utils/constants';

const CourseInformationForm = () => {
    const { token } = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const { course, editCourse } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const [courseCategories, setCourseCategories] = useState([]);


    const getCategories = async () => {
        setLoading(true);
        // const categories = await fetchCourseCategories();
        // if (categories.length > 0) {
        //     setCourseCategories(categories);
        // }
        setLoading(false);
    }
    useEffect(() => {
        getCategories()

        if (editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
            setValue("courseBenifits", course.whatYouWillLearn)
            setValue("courseTags", course.tag)
            //rest items also you have to set
        }
    }, [])

    const isFormUpdated = () => {
        const currentValues = getValues();
        return (currentValues.courseTitle !== course.courseName ||
            currentValues.courseShortDesc !== course.courseDescription ||
            currentValues.coursePrice !== course.price ||
            currentValues.courseTags.toString() !== course.tag.toString() ||
            currentValues.courseBenifits !== course.whatYouWillLearn ||
            currentValues.courseCategory._id !== course.category._id ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString()
        );

    }
    const onSubmit = async (data) => {
        if (editCourse) {
            if (isFormUpdated()) {
                const currentValues = getValues();
                const formData = new FormData();
                formData.append("courseId", course._id);
                if (currentValues.courseTitle !== course.courseName) {
                    formData.append("courseName", data.courseTitle);
                }
                if (currentValues.courseShortDesc !== course.courseDescription) {
                    formData.append("courseDescription", data.courseShortDesc);
                }
                if (currentValues.coursePrice !== course.price) {
                    formData.append("price", data.coursePrice);
                }
                if (currentValues.courseTags !== course.tag) {
                    formData.append("tag", data.courseTags);
                }
                if (currentValues.courseBenifits !== course.whatYouWillLearn) {
                    formData.append("whatYouWillLearn", data.courseBenifits);
                }
                if (currentValues.courseCategory._id !== course.category._id) {
                    formData.append("category", data.courseCategory);
                }

                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnail", data.courseImage);
                }
                if (currentValues.courseRequirements.toString() !== course.instructions.toString()) {
                    formData.append("instructions", JSON.stringify(data.courseRequirements));
                }

                setLoading(true);

                // const response = await editCourseDetails(formData, token);

                setLoading(false);
                // if (response) {
                //     setStep(2);
                //     dispatch(setCourse(response))
                // }
            }

            else {
                toast.error("No changes were made")
            }

        }
        else {

            const formData = new FormData();
            formData.append("courseName", data.courseTitle);
            formData.append("courseDescription", data.courseShortDesc);
            formData.append("price", data.coursePrice);
            formData.append("tag", data.courseTags);
            formData.append("whatYouWillLearn", data.courseBenifits);
            formData.append("category", data.courseCategory);
            formData.append("thumbnail", data.courseImage);
            formData.append("instructions", JSON.stringify(data.courseRequirements));
            formData.append("status", COURSE_STATUS.DRAFT);


            setLoading(true);
            // const response = await addCourseDetails(formData,token);
            // if (response) {
            //     setStep(2);
            //     dispatch(setCourse(response))
            // }
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className=' py-4 px-2 space-y-4'
        >

            {/* CourseTitle */}
            <div className='px-1 space-y-1'>
                <label htmlFor='courseTitle' >Course Title <sup className='text-pink-500'>*</sup></label>
                <input
                    type="text"
                    id='courseTitle'
                    placeholder='Enter Course Title'
                    {...register("courseTitle", { required: true })}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800  py-2 px-2 text-richblack-5"
                />
                {
                    errors.courseTitle && (
                        <span className='text-xs '>Course Title is Required</span>
                    )
                }
            </div>


            {/* Description */}
            <div className='px-1 space-y-1'>
                <label htmlFor='courseShortDesc' >Course Description <sup className='text-pink-500'>*</sup></label>
                <textarea
                    id='courseShortDesc'
                    placeholder='Enter Course Description'
                    {...register("courseShortDesc", { required: true })}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full min-h-[100px] rounded-[0.5rem] bg-richblack-800  py-2 px-2 text-richblack-5"
                />
                {
                    errors.courseShortDesc && (
                        <span className='text-xs '>Course Description is Required</span>
                    )
                }
            </div>


            {/* Course Price */}
            <div className='px-1 space-y-1 relative'>
                <label htmlFor='coursePrice' >Course Price <sup className='text-pink-500'>*</sup></label>
                <HiOutlineCurrencyRupee className='absolute top-[45%] left-3 text-richblack-300 text-2xl ' />
                <input
                    type='number'
                    id='coursePrice'
                    placeholder='Enter Course Price'
                    {...register("coursePrice", { required: true, valueAsNumber: true })}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800  py-2 px-10 text-richblack-5"
                />
                {
                    errors.coursePrice && (
                        <span className='text-xs '>Course Price is Required</span>
                    )
                }
            </div>

            {/*Course Categories */}
            <div className='px-1 space-y-1'>
                <label htmlFor='courseCategory'> Course Categories <sup className='text-pink-500'>*</sup></label>
                <select
                    id='courseCategory'
                    defaultValue={""}
                    {...register("courseCategory", { required: true })}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 px-2 py-2 text-richblack-5"
                >

                    <option value="" disabled>Choose a  Category</option>

                    {
                        !loading && courseCategories.map((category, index) => (
                            <option value={category?._id} key={index} >
                                {category?.name}
                            </option>
                        ))
                    }

                </select>
                {
                    errors.courseCategory && (
                        <span>
                            Please select atleast one category
                        </span>
                    )
                }
            </div>

            {/* Now tags Component */}
            <ChipInput
                label="Tags"
                name="courseTags"
                placeholder="Enter the tags and press enter"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <Upload
                label="thumbnail"
                name="courseThumbnail"
                placeholder="Upload a thumbnail"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            {/* Benifits of the course */}
            <div className='px-1 space-y-1'>
                <label htmlFor='courseBenifits' >Course Description <sup className='text-pink-500'>*</sup></label>
                <textarea
                    id='courseBenifits'
                    placeholder='Enter Course Benifits'
                    {...register("courseBenifits", { required: true })}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full min-h-[100px] rounded-[0.5rem] bg-richblack-800  py-2 px-2 text-richblack-5"
                />
                {
                    errors.courseBenifits && (
                        <span className='text-xs '>Course Benifits is Required</span>
                    )
                }
            </div>

            {/* Requirement Fields */}
            <RequirementsField
                label="Requirements/Instructions"
                name="courseRequirements"
                placeholder="Enter the course requirements"
                register={register}
                errors={errors}
                setValue={setValue}
                getValues={getValues}
            />

            <div className='flex flex-row  justify-end gap-2'>
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            className='py-1 px-4 font-semibold bg-richblack-700 rounded-md'
                        >
                            Continue without saving
                        </button>
                    )
                }

                <button type='submit' className='flex gap-2 py-1 px-4 font-semibold bg-yellow-25 text-richblack-700 rounded-md'>
                    {
                        !editCourse ? "Next" : "Save Changes"
                    }
                </button>

            </div>
        </form>
    )
}

export default CourseInformationForm
