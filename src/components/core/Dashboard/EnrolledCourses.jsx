import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI';
import Spinner from '../../common/Spinner';
import ProgressBar from '@ramonak/react-progress-bar';
const EnrolledCourses = () => {

    const { token } = useSelector((state) => state.auth);

    const [enrolledCourses, setEnrolledCourses] = useState(null);

    const getEnrolledCourses = async () => {
        try {
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response)
            console.log(response)
        } catch (error) {
            console.log("Unable to the enrooled courses data")
        }
    }

    useEffect(
        () => { getEnrolledCourses() }
        , [])

    return (
        <div className='flex flex-col gap-4 px-2 md:w-10/12 mx-auto text-white my-4'>
            <h2 className='text-xl text-center'>Enrolled Courses</h2>


            {
                !enrolledCourses ? (<div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'><Spinner /></div>) : (
                    !enrolledCourses.length ?
                        (<div className='text-lg flex flex-col gap-4 items-center justify-center h-[50vh]'>
                            <p>You have not enrolled in any course </p>
                        </div>)
                        : (
                            <div className='flex flex-wrap'>
                                {
                                    enrolledCourses.map((course, index) => (
                                        <div className='max-w-[300px] lg:px-6 lg:max-w-full w-full mx-auto flex flex-col lg:flex-row justify-between items-center my-4 gap-4 py-4 px-2 rounded-xl bg-richblack-700' key={index}>

                                            <div className='flex flex-col lg:flex-row gap-4 items-center w-full' >
                                                <img src={course.thumbnail} className='w-full lg:w-[450px] rounded-md aspect-video' alt='Loading...' />
                                                <div className='flex flex-col w-full gap-1 justify-center px-2'>
                                                    <p className='text-md text-richblack-5'>{course.courseName}</p>
                                                    <p className='text-[0.6rem] text-richblack-200 '>{course.courseDescription}</p>
                                                    <div className='w-full flex flex-row justify-between items-center'>
                                                        <p className='text-sm font-bold'>{course?.category?.name}</p>
                                                        <p className='italic text-[0.7rem] text-richblack-200 w-max'>~By {course?.instructor?.firstName}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className='flex w-full lg:w-max flex-row lg:flex-col items-center gap-4 justify-between px-2'>
                                                <div>
                                                    <div className='text-sm w-max'>Progress: {course.progressPercentage || 50} % </div>
                                                    <div>
                                                        <ProgressBar
                                                            height='0.4rem'
                                                            isLabelVisible={false}
                                                            completed={course.progressPercentage || 50}
                                                        />
                                                    </div>
                                                </div>

                                                <div className='flex flex-col gap-1 items-center justify-center'>
                                                    <p className='text-xs w-16'>
                                                        {course?.totalDuration || "2 hr 30 min"}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        )
                )
            }

        </div>
    )
}

export default EnrolledCourses
