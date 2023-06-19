import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import CoursesTable from './InstructorCourses/CoursesTable';
import { fetchInstructorCourses } from '../../../services/operations/courseDetailsAPI';


const MyCourses = () => {

    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);


    const fetchCourses = async () => {
        const result = await fetchInstructorCourses(token);
        if (result) {
            setCourses(result);
        }
    }
    useEffect(() => {
        fetchCourses();
    }, [])

    return (
        <div className='text-white md:w-10/12 px-2 mx-auto mt-10'>
            <div className='flex justify-between my-2'>
                <h1 className='text-xl font-bold'>My Courses</h1>
                <button
                    className='text-richblack-900 bg-yellow-50 rounded-xl py-1 px-4'
                    onClick={() => navigate("/dashboard/add-course")}>
                    Add Courses +
                </button>
            </div>
            <hr />

            {
                courses && <CoursesTable courses={courses} setCourses={setCourses} />
            }
        </div>
    )
}

export default MyCourses
