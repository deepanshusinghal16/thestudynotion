import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack, IoIosArrowUp } from "react-icons/io";

const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeSection, setActiveSection] = useState("");
    const [videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();
    const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures } = useSelector((state) => state.viewCourse)

    useEffect(() => {

        const setActiveFlags = () => {
            if (!courseSectionData.length)
                return;
            const currentSectionIndex = courseSectionData.findIndex(
                (data) => data._id === sectionId
            )
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
                (data) => data._id === subSectionId
            )
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            //set current section here
            setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
            //set current sub-section here
            setVideobarActive(activeSubSectionId);
        }
        setActiveFlags();

    }, [courseSectionData, courseEntireData, location.pathname])

    const handleAddReview = () => {
        setReviewModal(true);
    }

    return (
        <>
            <div className='mt-4'>
                {/* Buttons and heading  */}
                <div className='flex flex-col gap-2 '>
                    <div className='flex gap-1'>
                        {/* Back Btn */}
                        <button
                            onClick={() => navigate("/dashboard/enrolled-courses")}>
                            <IoMdArrowBack className='text-md text-white' />
                        </button>

                        {/* Btn add review */}
                        <button onClick={() => handleAddReview()}
                            className='text-richblack-900 bg-yellow-25 text-sm px-2 py-1 rounded-xl ' >
                            Add Review
                        </button>
                    </div>

                    {/* heading */}
                    <div className='text-[0.6235rem] flex flex-row items-center justify-between px-1 text-richblack-5 '>
                        <p >{courseEntireData?.courseName}</p>
                        <p>{completedLectures.length} / {totalNoOfLectures} </p>
                    </div>
                </div>

                <div className='flex flex-col ml-2 cursor-pointer'>
                    {
                        courseSectionData?.map((section, index) => (
                            <div
                                onClick={() => setActiveSection(section?._id)}
                                key={index}>

                                <div className='flex flex-row items-center justify-between gap-2 text-sm '>
                                    <div className='text-richblack-5 uppercase'>
                                        {section?.sectionName}
                                    </div>
                                    <div
                                        className={`${activeSection === section?._id && "rotate-180"}  transition-all duration-300`}>
                                        <IoIosArrowUp className='text-white' />
                                    </div>

                                </div>

                                {/* SubSection Logic */}
                                <div>
                                    {
                                        activeSection === section._id && (
                                            <div className='flex  flex-col '>
                                                {
                                                    section.subSection.map((topic, index) => (
                                                        <div
                                                            className={`${videobarActive === topic._id ?
                                                                "bg-yellow-25 text-richblack-900" :
                                                                "bg-richblack-900 text-richblack-25"}
                                                                text-xs flex gap-2 px-2 `}
                                                            key={index}
                                                            onClick={() => {
                                                                setVideobarActive(topic?._id);
                                                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`);
                                                            }}

                                                        >
                                                            <input type="checkbox" checked={completedLectures.includes(topic?._id)} onChange={() => { }} />
                                                            <span>{topic.title}</span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>


        </>
    )
}

export default VideoDetailsSidebar

