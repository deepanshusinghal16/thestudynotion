import React, { useState, useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import Spinner from '../components/common/Spinner';
const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            setLoading(true);
            const courseData = await getFullDetailsOfCourse(courseId, token);
            // //console.log(courseData)
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseDetails?.courseContent?.forEach((sec) => {
                lectures += sec.subSection.length
            });
            dispatch(setTotalNoOfLectures(lectures));
            setLoading(false);
        }
        setCourseSpecificDetails();
    }, [])
    if (loading) {
        return <Spinner />;
    }
    return (
        <div className='my-4'>
            <div className=''>Course Content</div>
            <div className='flex gap-1 lg:h-[calc(100vh-3.5rem)] lg:flex-row flex-col-reverse'>

                <div className='lg:w-[250px] lg:border-r-2 px-1'>
                    <VideoDetailsSidebar setReviewModal={setReviewModal} />
                </div>
                <div className='w-[90vw] lg:w-auto lg:max-h-[80vh] mx-auto aspect-video'>
                    <Outlet />
                </div>
                {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
            </div>
        </div>
    )
}

export default ViewCourse
