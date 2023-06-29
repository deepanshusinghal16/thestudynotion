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
    const { courseEntireData } = useSelector((state) => state.viewCourseSlice)
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
            }, token
        )
    }

    return (
        <div>
            <div>
                <h2>Add Review</h2>
                <button onClick={() => setReviewModal(false)}>
                    <AiOutlineClose />
                </button>
            </div>

            {/* Body*/}
            <div>

                <div>
                    <img
                        src={user?.image}
                        className='aspect-square w-12'
                    />
                    <div>
                        <p>{user.firstName} {user.lastName}</p>
                        <p>Posting Publically</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <ReactStars
                        count={5}
                        onChange={(newRating) => setValue("courseRating", newRating)}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div>
                        <label htmlFor="courseExperience">Add Your Experience</label>
                        <textarea name="courseExperience" id="courseExperience" cols="30" rows="10"
                            placeholder='Add your experience'
                            {...register("courseExperience", { required: true })}
                            className='form-style'
                        />
                        {
                            errors.courseExperience && (<span className='text-xs text-pink-500'>{errors.courseExperience}</span>)
                        }
                    </div>

                    <div>
                        <button
                            onClick={() => setReviewModal(false)}>Cancel
                        </button>
                        <button type='submit'>
                            Save
                        </button>
                    </div>
                </form>


            </div>


        </div>
    )
}

export default CourseReviewModal
