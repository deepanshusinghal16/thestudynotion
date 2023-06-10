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
        } catch (error) {
            console.log("Unable to the enrooled courses data")
        }
    }

    useEffect(
        () => { getEnrolledCourses() }
        , [])

    return (
        <div className='flex flex-col gap-4 w-10/12 mx-auto text-white my-4'>
            <h2 className='text-3xl text-center'>Enrolled Courses</h2>


            {
                !enrolledCourses ? (<div className='h-[calc(100vh-3.5rem)] flex items-center justify-center'><Spinner /></div>) : (
                    !enrolledCourses.length ?
                        (<div className='text-lg flex flex-col gap-4 items-center justify-center h-[50vh]'>
                            <p>You have not enrolled in any course </p>
                        </div>)
                        : (
                            <div>
                                <div>
                                    <p>Course Name</p>
                                    <p>Duration</p>
                                    <p>Progess</p>
                                </div>


                                {
                                    enrolledCourses.map((course, index) => (
                                        <div>
                                            <div className='flex' key={index}>
                                                <img src={course.thumbnail} className='' alt='Loading...' />
                                                <div>
                                                    <p>{course.courseName}</p>
                                                    <p>{course.courseDescription}</p>
                                                </div>
                                            </div>

                                            <div>
                                                {course?.totalDuration}
                                            </div>

                                            <div>
                                                <div>Progress: {course.progressPercentage || 0} % </div>
                                                <div>
                                                    <ProgressBar
                                                        height='8px'
                                                        isLabelVisible={false}
                                                        completed={course.progressPercentage || 0}
                                                    />
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
