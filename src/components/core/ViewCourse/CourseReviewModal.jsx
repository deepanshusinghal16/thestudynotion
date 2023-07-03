import React from 'react'
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AiOutlineClose } from "react-icons/ai";
import { useSelector } from 'react-redux';
import ReactStars from "react-rating-stars-component";
import { createRating } from '../../../services/operations/courseDetailsAPI';

const CourseReviewModal = ({ setReviewModal }) => {


    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const { courseEntireData } = useSelector((state) => state.viewCourse)
    useEffect(() => {
        setValue("courseExperience", "");
        setValue("courseRating", 0);
    }, [])


    const onSubmit = async (data) => {
        await createRating(
            {
                courseId: courseEntireData._id,
                rating: data.courseRating,
                review: data.courseExperience,
            },
            token
        );
        setReviewModal(false);
    }

    return (
        <div className='top-[20%] absolute z-[1000] text-white w-[100vw] 
        flex  justify-center'>
            <div className='bg-richblack-700 py-4 px-4 max-w-maxContent h-max rounded-lg'>

                <div className='flex justify-between border-b-2 border-richblack-400'>
                    <h2>Add Review</h2>
                    <button
                        onClick={() => setReviewModal(false)}
                    >
                        <AiOutlineClose />
                    </button>
                </div>

                {/* Body*/}
                <div className='flex flex-col items-center'>

                    <div className='flex flex-col items-center gap-1 mt-6'>
                        <img
                            src={user?.image}
                            className='aspect-square w-12 rounded-full'
                        />
                        <div className='text-sm text-center'>
                            <p>{user.firstName} {user.lastName}</p>
                            <p >Posting Publically</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col items-center '>
                        <ReactStars
                            count={5}
                            onChange={(newRating) => setValue("courseRating", newRating)}
                            size={24}
                            activeColor="#ffd700"
                        />

                        <div className='flex flex-col'>
                            <label htmlFor="courseExperience" className='text-xs'>Add Your Experience</label>
                            <textarea name="courseExperience" id="courseExperience" cols="30" rows="5"
                                placeholder='Add your experience'
                                {...register("courseExperience", { required: true })}
                                style={{
                                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5
                                text-sm"
                            />
                            {
                                errors.courseExperience && (<span className='text-xs text-pink-300'>Please add your experience</span>)
                            }
                        </div>

                        <div className='w-full flex justify-end gap-2 my-3 text-sm'>
                            <button
                                className='bg-richblack-900 text-richblack-5 py-1 px-2 rounded-lg'
                                onClick={() => setReviewModal(false)}
                            >Cancel
                            </button>
                            <button
                                className='text-richblack-900 bg-yellow-25 py-1 px-2 rounded-lg'
                                type='submit'>
                                Save
                            </button>
                        </div>
                    </form>


                </div>


            </div>
        </div>
    )
}

export default CourseReviewModal
