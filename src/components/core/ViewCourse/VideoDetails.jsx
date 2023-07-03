import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import 'video-react/dist/video-react.css';
import { Player } from 'video-react';
import { FaPlay } from "react-icons/fa";
import IconBtn from '../../common/IconBtn';

const VideoDetails = () => {

    const { courseId, sectionId, subSectionId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const { token } = useSelector((state) => state.auth);
    const playerRef = useRef();
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState([]);
    const [videoEnded, setVideoEnded] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const setVideoSpecificDetails = async () => {
            if (!courseSectionData) return;
            if (!courseId || !sectionId || !subSectionId) {
                navigate("/dashboard/enrolled-courses");
                return;
            }
            const filteredData = courseSectionData.filter(
                (section) => section._id === sectionId
            )

            const filteredVideoData = filteredData?.[0]?.subSection.filter((data) => data._id === subSectionId)
            setVideoData(filteredVideoData[0]);
            setVideoEnded(false);
        }
        setVideoSpecificDetails()
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentsubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);
        if (currentsubSectionIndex === 0 && currentSectionIndex === 0) {
            return true;
        }
        return false;
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentsubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);
        const totalSection = courseSectionData.length;
        const totalsubSection = courseSectionData[currentSectionIndex].subSection.length;
        if (currentsubSectionIndex === totalsubSection - 1 && currentSectionIndex === totalSection - 1) {
            return true;
        }
        return false;
    }

    const gotoNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentsubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);

        const totalsubSection = courseSectionData[currentSectionIndex].subSection.length;
        if (currentsubSectionIndex !== totalsubSection - 1) {
            //ussi section ka next video
            const nextsubSectionId = courseSectionData[currentSectionIndex].subSection[currentsubSectionIndex + 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextsubSectionId}`)
        }
        else {
            //next section ki first video
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextsubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextsubSectionId}`)
        }
    }

    const gotoPreviousVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentsubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);

        if (currentsubSectionIndex !== 0) {
            //ussi section ka prev video
            const prevsubSectionId = courseSectionData[currentSectionIndex].subSection[currentsubSectionIndex - 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevsubSectionId}`)
        }
        else {
            //next section ki first video
            const totalsubSection = courseSectionData[currentSectionIndex - 1].subSection.length;
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevsubSectionId = courseSectionData[currentSectionIndex - 1].subSection[totalsubSection - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevsubSectionId}`)
        }
    }
    const handleLectureCompletetion = async () => {
        setLoading(true);

        const res = await markLectureAsComplete({ courseId, subSectionId }, token)
        if (res) {
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false);
    }

    return (
        <div className='text-white'>
            {
                !videoData ? (<div>No  data found</div>) : (
                    <div className='relative'>
                        <Player
                            ref={playerRef}
                            playsInline
                            onEnded={() => setVideoEnded(true)}
                            src={videoData?.videoUrl}
                        >


                            {
                                videoEnded && (
                                    <div className='absolute left-0 right-0 inset-y-10 z-[100] text-sm'>
                                        {
                                            !completedLectures.includes(subSectionId) && (
                                                <button disabled={loading}
                                                    onClick={() => handleLectureCompletetion()}
                                                    className='bg-yellow-25 text-richblack-900 py-1 px-2 rounded-xl'>
                                                    {!loading ? "Mark as Completed" : "Loading..."}
                                                </button>
                                            )
                                        }
                                        <button disabled={loading}
                                            onClick={() => {
                                                if (playerRef?.current) {
                                                    playerRef.current?.seek(0);
                                                    setVideoEnded(false);
                                                }
                                            }}
                                            className='bg-yellow-25 text-richblack-900 py-1 px-2 rounded-xl'>
                                            Rewatch
                                        </button>

                                        <div className='flex justify-between items-center'>
                                            {
                                                !isFirstVideo() && (
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => gotoPreviousVideo()}
                                                        className='text-richblack-5 bg-richblack-800  py-1 px-3 rounded-xl'
                                                    >
                                                        Prev
                                                    </button>
                                                )
                                            }
                                            {
                                                !isLastVideo() && (
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => gotoNextVideo()}
                                                        className='text-richblack-5 bg-richblack-800  py-1 px-3 rounded-xl'
                                                    >
                                                        Next
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>
                                )
                            }

                        </Player>
                    </div >
                )
            }
            <h1>{videoData?.title}</h1>
            <p>{videoData?.description}</p>
        </div >
    )
}

export default VideoDetails


