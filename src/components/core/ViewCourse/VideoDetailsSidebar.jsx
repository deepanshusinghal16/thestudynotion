import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoMdArrowBack, IoIosArrowUp } from "react-icons/io";
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeSection, setActiveSection] = useState("");
    const [videobarActive, setVideobarActive] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const { sectionId, subSectionId } = useParams();
    const { courseSectionData, courseEntireData, totalNoOfLectures, completedLectures } = useSelector((state) => state.viewCourse)

    useEffect(() => {
        ; (() => {
            if (!courseSectionData.length) return;
            const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId);
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex].findIndex((data) => data._id === subSectionId);
            const activeSubSectionId = courseSectionData?.[currentSubSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            setActiveSection(courseSectionData?.[currentSectionIndex]?._id);
            setVideobarActive(activeSubSectionId)
        })()
    }, [courseSectionData, courseEntireData, location.pathname])

    return (
        <>
            <div>
                {/* Buttons and heading  */}
                <div>
                    <div>
                        {/* Back Btn */}
                        <button
                            onClick={() => navigate("/dashboard/enrolled-courses")}>
                            <IoMdArrowBack />
                        </button>

                        {/* Btn add review */}
                        <IconBtn text={"Add Review"} onClickFxn={() => setReviewModal(true)} />
                    </div>

                    {/* heading */}
                    <div>
                        <p>{courseEntireData?.courseName}</p>
                        <p>{completedLectures.length} / {totalNoOfLectures} </p>
                    </div>
                </div>

                <div>
                    {
                        courseSectionData?.map((section, index) => (
                            <div
                                onClick={() => setActiveSection(section?._id)}
                                key={index}>

                                <div>
                                    <div>
                                        {section?.sectionName}
                                    </div>
                                    <div
                                        className={`${activeSection === section?._id && "rotate-180"} rounded-full transition-all duration-300`}>
                                        <IoIosArrowUp />
                                    </div>

                                </div>

                                {/* SubSection Logic */}
                                <div>
                                    {
                                        activeSection === section._id && (
                                            <div>
                                                {
                                                    section.subSection.map((topic, index) => (
                                                        <div
                                                            className={`${videobarActive === topic._id ?
                                                                "bg-yellow-25 text-richblack-900" :
                                                                "bg-richblack-900 text-richblack-5"}
                                                                `}
                                                            key={index}
                                                            onClick={() => {
                                                                navigate(`/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`);
                                                                setVideobarActive(topic?._id)
                                                            }}

                                                        >
                                                            <input type="checkbox" checked={completedLectures.includes(topic?._id)} />
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
