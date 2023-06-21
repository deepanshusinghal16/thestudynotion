import React from 'react'
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './CouseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourseForm from './PublishCourse/PublishCourseForm';
import StepProgressBar from './ProgressBar';

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);






    return (
        <div className='w-full px-2'>

            <div className='mx-auto my-4 pb-6 px-1 sm:px-3 rounded-lg  w-full'>
                <StepProgressBar />
            </div>

            {/* here start the course form */}
            <div className='mx-auto my-4 px-1 sm:px-3 rounded-lg bg-richblack-800 w-full'>
                {step === 1 && <CourseInformationForm />}
                {step === 2 && <CourseBuilderForm />}
                {step === 3 && <PublishCourseForm />}
            </div>

        </div >
    )
}

export default RenderSteps
