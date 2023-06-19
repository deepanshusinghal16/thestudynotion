import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import RenderSteps from "../AddCourse/RenderSteps";
import { useEffect } from 'react';
import Spinner from '../../../common/Spinner';
import { fetchCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
const EditCourse = () => {

    const dispatch = useDispatch();
    const { courseId } = useParams();
    const { course } = useSelector((state) => state.course);
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        const populateCourseDetails = async () => {
            setLoading(true);
            const result = await fetchCourseDetails(courseId, token);
            if (result) {
                dispatch(setEditCourse(true));
                dispatch(setCourse(result?.data?.courseDetails));
            }
            setLoading(false);
        };
        populateCourseDetails();
    }, [])

    if (loading) {

        return (
            <div className='min-h-[80vh] flex items-center justify-center'><Spinner /></div>);
    }

    return (
        <div className='min-h-[80vh] text-white flex flex-col items-center gap-4  justify-center'>
            <header className='text-xl font-semibold  py-4'>Edit Course</header>
            <div className='flex items-center justify-center px-4 max-w-[800px] mx-auto w-full'>
                {
                    course ? (<RenderSteps />) : (<p>Course Not Found</p>)
                }
            </div>
        </div>
    )
}

export default EditCourse
