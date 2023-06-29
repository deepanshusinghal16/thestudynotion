import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
// import '~video-react/dist/video-react.css';
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
        const setVideoSpecificDetails = () => {
            if (!courseSectionData) return;
            if (!courseId || !sectionId || !subSectionId) {
                navigate("/dashboard/enrolled-courses");
                return;
            }
            const filteredData = courseSectionData.filter(
                (section) => section._id === sectionId
            )

            const filteredVideoData = filteredData?.[0].subSection.filter((data) => data._id === subSectionId)
            setVideoData(filteredVideoData[0]);
            setVideoEnded(false);
        }
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);
        if (currentSubSectionIndex === 0 && currentSectionIndex === 0) {
            return true;
        }
        return false;
    }

    const isLastVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);
        const totalSection = courseSectionData.length;
        const totalSubSection = courseSectionData[currentSectionIndex].subSection.length;
        if (currentSubSectionIndex === totalSubSection - 1 && currentSectionIndex === totalSection - 1) {
            return true;
        }
        return false;
    }

    const gotoNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);

        const totalSubSection = courseSectionData[currentSectionIndex].subSection.length;
        if (currentSubSectionIndex !== totalSubSection - 1) {
            //ussi section ka next video
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else {
            //next section ki first video
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id;
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
    }

    const gotoPreviousVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((section) => section._id === sectionId)
        const currentSubSectionIndex = courseSectionData[currentSectionIndex].subSection.findIndex((topic) => topic._id === subSectionId);

        if (currentSubSectionIndex !== 0) {
            //ussi section ka prev video
            const prevSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex - 1]._id;
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`)
        }
        else {
            //next section ki first video
            const totalSubSection = courseSectionData[currentSectionIndex - 1].subSection.length;
            const prevSectionId = courseSectionData[currentSectionIndex - 1]._id;
            const prevSubSectionId = courseSectionData[currentSectionIndex - 1].subSection[totalSubSection - 1]._id;
            navigate(`/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`)
        }
    }
    const handleLectureCompletetion = async () => {
        setLoading(true);
        // after sommetime it will be coded
        const res = await markLectureAsComplete({ courseId, subSectionId }, token)
        if (res) {
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false);
    }

    return (
        <div>
            {
                !videoData ? (<div>No  data found</div>) : (
                    <div>
                        <Player
                            ref={playerRef}
                            playsInline
                            onEnded={() => setVideoEnded(true)}
                            aspectRatio='16:9'
                            autoPlay
                            src={videoData?.videoUrl}
                        >
                            <FaPlay />

                            {
                                videoEnded && (
                                    <div>
                                        {
                                            !completedLectures.includes(subSectionId) && (
                                                <IconBtn
                                                    disable={loading}
                                                    onClick={() => handleLectureCompletetion()}
                                                    text={!loading ? "Mark as Completed" : "Loading..."} />
                                            )
                                        }
                                        <IconBtn
                                            disabled={loading}
                                            onClickFxn={() => {
                                                if (playerRef?.current) {
                                                    playerRef.current?.seek(0);
                                                    setVideoEnded(false);
                                                }
                                            }}
                                            text="Rewatch"
                                        />

                                        <div>
                                            {
                                                !isFirstVideo() && (
                                                    <button
                                                        disabled={loading}
                                                        onClick={() => gotoPreviousVideo()}
                                                        className='blackButton'
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
                                                        className='blackButton'
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
