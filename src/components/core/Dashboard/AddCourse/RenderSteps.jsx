import React from 'react'
import { useSelector } from 'react-redux';
import { FaCheck } from "react-icons/fa";
import CourseInformationForm from './CouseInformation/CourseInformationForm';
import CourseBuilderForm from './CourseBuilder/CourseBuilderForm';
import PublishCourseForm from './PublishCourse/PublishCourseForm';

const RenderSteps = () => {
    const { step } = useSelector((state) => state.course);

    const steps = [
        {
            id: 1,
            title: "Course Info",
        },
        {
            id: 2,
            title: "Build",
        },
        {
            id: 3,
            title: "Publish",
        },
    ];




    return (
        <div className='w-full '>

            <div className='grid grid-cols-3 place-content-center place-items-center  w-full gap-10'>
                {
                    steps.map((item) => (
                        <>
                            <div className='flex flex-col relative gap-2'>
                                <div className={`${step === item.id ? "bg-yellow-500 border-yellow-5" : "border-richblack-700 bg-richblack-800 text-richblack-300"} w-fit p-2 rounded-full aspect-square flex item justify-center mx-auto z-[10]`} key={item.id} >
                                    {
                                        step > item.id ? (<FaCheck className='text-xl' />) : (item.id)
                                    }
                                </div>
                                <div>
                                    <p className={`${item.id <= step ? "text-richblack-100" : "text-richblack-500"}`}>{item.title}</p>
                                </div>


                                <div className='absolute top-[30%] right-[10%] translate-x-[100%]'>
                                    {
                                        item.id !== steps.length && (
                                            <div className={`w-28 h-[1px]  border-dashed border-[1px] 
                                            ${item.id < step ? "border-yellow-25 " : "border-richblack-25"}`}></div>
                                        )
                                    }
                                </div>

                            </div>


                        </>
                    ))
                }
            </div>


            {/* here start the course form */}
            <div className='mx-auto my-4 px-3 rounded-lg bg-richblack-800 w-full'>
                {step === 1 && <CourseInformationForm />}
                {step === 2 && <CourseBuilderForm />}
                {step === 3 && <PublishCourseForm />}
            </div>

        </div >
    )
}

export default RenderSteps
