import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { resetCourseState, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { editCourseDetails } from '../../../../../services/operations/courseDetailsAPI';

const PublishCourseForm = () => {

    const { register, handleSubmit, setValue, formState: { errors }, getValues } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    useEffect(() => {
        if (course?.status === COURSE_STATUS.PUBLISHED) {
            setValue("public")
        }
    }, [])

    const goToCourses = () => {
        dispatch(resetCourseState());
        navigate("/dashboard/my-courses");
    }

    const handleCoursePublish = async () => {
        if (course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true ||
            (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)) {
            goToCourses();
            return;
        }

        const formData = new FormData();
        formData.append("courseId", course._id);
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
        formData.append("status", courseStatus);

        setLoading(true);

        const result = await editCourseDetails(formData, token)
        if (result) {
            goToCourses();
        }
        setLoading(false);
    }

    const onSubmit = () => {
        handleCoursePublish();
    }

    const goBack = () => {
        !loading && dispatch(setStep(2));
    }


    return (
        <div className='py-4 px-2 sm:py-10 sm:mx-10 '>
            <header className='text-md'>Publish Settings</header>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col px-2'>
                <div className='flex gap-2 py-6 items-center'>
                    <input
                        type="checkbox"
                        id="public"
                        {...register("public")}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className='rounded-2xl h-4 w-4'
                    />
                    <label htmlFor="public" className='text-sm'>Make this course Public</label>
                </div>

                <div className='flex justify-end items-center gap-2 sm:gap-4'>
                    <button
                        className='text-richblack-5 bg-richblack-600 px-4 py-1 rounded-lg text-sm '
                        disabled={loading}
                        onClick={() => goBack()}>
                        Back
                    </button>
                    <button
                        className='text-black bg-yellow-50 px-4 py-1 rounded-lg text-sm'
                        disabled={loading}
                        type='submit' >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PublishCourseForm
