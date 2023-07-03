import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import Spinner from "../../../common/Spinner";
import Wave from "../../../../assets/Images/wave.png";
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor = () => {
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const [loading, setLoading] = useState(false);
    const [instructorData, setInstructorData] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const getCourseDataWithStats = async () => {
            setLoading(true);

            const instructorApiData = await getInstructorData(token);
            const result = await fetchInstructorCourses(token);

            //console.log(instructorApiData);

            if (instructorApiData.length)
                setInstructorData(instructorApiData);

            if (result) {
                setCourses(result);
            }
            setLoading(false);
        }
        getCourseDataWithStats();
    }, [])

    const totalAmount = instructorData?.reduce((acc, curr) => acc + curr.totalAmountGenerated, 0);
    const totalStudents = instructorData?.reduce((acc, curr) => acc + curr.totalStudentsEnrolled, 0);

    return (
        <div className=' px-2 md:w-2/3 mx-auto pt-6'>
            <div className='text-white '>
                <div className='mx-auto max-w-maxContent'>
                    <h1 className='flex w-maxContent items-center gap-1 '>Hi {user?.firstName}
                        <div>
                            <img src={Wave} alt="Wave" className='w-4   aspect-square ' />
                        </div>
                    </h1>
                    <p>Let's start something new</p>
                </div>

                {loading ? (<Spinner />)
                    : courses.length > 0
                        ? (<div className='my-4'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-col md:flex-row justify-around items-center gap-4'>
                                    <div>
                                        <InstructorChart courses={instructorData} />
                                    </div>

                                    <div>
                                        <p className='text-sm text-richblack-100'>Statistics</p>
                                        <div className='flex flex-row md:flex-col gap-4'>
                                            <div>
                                                <p className='font-semibold'>Total Courses</p>
                                                <p className='text-[1rem]'>{courses.length}</p>
                                            </div>

                                            <div>
                                                <p className='font-semibold'>Total Students</p>
                                                <p className='text-[1rem]'>{totalStudents}</p>
                                            </div>
                                        </div>

                                        <div className='w-full'>
                                            <p className='font-semibold mx-auto text-center md:text-left'>Total Income</p>
                                            <p className='text-[1rem] text-yellow-25 mx-auto text-center md:text-left'>₹ {totalAmount}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='w-full px-2  pt-6 bg-richblack-800 rounded-lg mt-8'>
                                {/*  3 courses */}
                                <div className='text-sm flex items-center justify-between px-4'>
                                    <p className='font-bold'>Your Courses</p>
                                    <Link to="/dashboard/my-courses">
                                        <p>View all</p>
                                    </Link>
                                </div>
                                <div className='flex flex-col md:flex-row items-center justify-between  px-2'>
                                    {
                                        courses.slice(0, 3).map((course) => (
                                            <Link to={`/courses/${course._id}`} className='w-maxContent text-sm pb-4 px-4 hover:opacity-50 duration-200 transition-all'>
                                                <img
                                                    src={course.thumbnail}
                                                    className='w-56 object-cover aspect-video my-2 rounded-2xl'
                                                    alt='Thumbnail'
                                                />
                                                <div >
                                                    <p className='text-md'>{course.courseName}</p>
                                                    <div className='flex gap-1  text-xs'>
                                                        <p >{course.studentsEnrolled.length} students</p>
                                                        <p> | </p>
                                                        <p> Rs {course.price}</p>
                                                    </div>

                                                </div>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        )
                        : (<div className='w-full flex  flex-col gap-3 items-center justify-center'>
                            <p className='sm'>You have not created any courses yet</p>
                            <Link to={"/dashboard/addCourse"}
                                className='text-sm'>
                                Create a Course
                            </Link>
                        </div>)}
            </div>
        </div>
    )
}

export default Instructor
