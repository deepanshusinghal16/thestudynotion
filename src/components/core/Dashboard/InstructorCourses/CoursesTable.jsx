import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Table, Tbody, Tr, Td, Th, Thead } from 'react-super-responsive-table';
import { COURSE_STATUS } from "../../../../utils/constants";
import ConfirmationModal from "../../../common/ConfirmationModal";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { deleteCourse, fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../../../../services/formatDate"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { convertSecondsToDuration } from '../../../../utils/secToDuration';


const CoursesTable = ({ courses, setCourses }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const { token } = useSelector((state) => state.auth)
    const TRUNCATE_LENGTH = 10
    const calTime = (courseContent) => {
        let totalDurationInSeconds = 0
        ////console.log(courseContent)
        courseContent.map((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })
        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
        return totalDuration;
    }
    const handleCourseDelete = async (courseId) => {
        setLoading(true);
        await deleteCourse({ courseId: courseId }, token);
        const result = await fetchInstructorCourses(token);
        ////console.log(result)
        if (result) {
            setCourses(result);
        }
        setConfirmationModal(null)
        setLoading(false);
    }

    return (
        <>
            <Table className="rounded-xl border border-richblack-800 ">
                <Thead>
                    <Tr className="flex items-center justify-center gap-x-10 rounded-t-md border-b border-b-richblack-800 px-6 py-2">
                        <Th className="flex-1 text-left text-sm font-medium uppercase text-richblack-100 mt-2">
                            Courses
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100 mt-2">
                            Duration
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100 mt-2">
                            Price
                        </Th>
                        <Th className="text-left text-sm font-medium uppercase text-richblack-100 mt-2">
                            Actions
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {courses?.length === 0 ? (
                        <Tr>
                            <Td className="py-10 text-center text-2xl font-medium text-richblack-100">
                                No courses found
                                {/* TODO: Need to change this state */}
                            </Td>
                        </Tr>
                    ) : (
                            courses?.map((course) => {
                                return (
                                    <>
                                        <Tr
                                            key={course._id}
                                            className="flex  gap-x-10 border-b border-richblack-800 px-6 py-8  cursor-pointer"
                                        >
                                            <Td className="flex flex-col lg:flex-row flex-1 gap-4  "
                                                onClick={() => navigate(`/courses/${course._id}`)}>
                                                <img
                                                    src={course?.thumbnail}
                                                    alt={course?.courseName}
                                                    className=" aspect-video w-full sm:h-[148px] sm:w-[220px] rounded-lg object-cover"
                                                />
                                                <div className="flex flex-col justify-between gap-y-1">
                                                    <p className="text-sm sm:text-lg font-semibold text-richblack-5">
                                                        {course.courseName}
                                                    </p>
                                                    <p className="text-[10px] sm:text-xs text-richblack-300">
                                                        {course.courseDescription.split(" ").length >
                                                            TRUNCATE_LENGTH
                                                            ? course.courseDescription
                                                                .split(" ")
                                                                .slice(0, TRUNCATE_LENGTH)
                                                                .join(" ") + "..."
                                                            : course.courseDescription}
                                                    </p>
                                                    <p className="text-[10px] sm:text-[12px] text-white">
                                                        Created: {formatDate(course.createdAt)}
                                                    </p>
                                                    {course.status === COURSE_STATUS.DRAFT ? (
                                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[10px] sm:text-[12px] font-medium text-pink-100">
                                                            <HiClock size={14} />
                                                            Drafted
                                                        </p>
                                                    ) : (
                                                        <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                                                            <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                                <FaCheck size={8} />
                                                            </div>
                                                            Published
                                                        </p>
                                                    )}
                                                </div>
                                            </Td>
                                            <Td className="my-1 text-[12px] sm:text-sm font-medium text-richblack-100 ">
                                                {calTime(course.courseContent)}
                                            </Td>
                                            <Td className="my-1 text-[12px] sm:text-sm font-medium text-richblack-100 ">
                                                ₹{course.price}
                                            </Td>
                                            <Td className="my-1 text-[12px] sm:text-[20px] font-medium text-richblack-100  ">
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        navigate(`/dashboard/edit-course/${course._id}`)
                                                    }}
                                                    title="Edit"
                                                    className=" text-[16px] px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                                >
                                                    <FiEdit2 />
                                                </button>
                                                <button
                                                    disabled={loading}
                                                    onClick={() => {
                                                        setConfirmationModal({
                                                            text1: "Do you want to delete this course?",
                                                            text2:
                                                                "All the data related to this course will be deleted",
                                                            btn1Text: !loading ? "Delete" : "Loading...  ",
                                                            btn2Text: "Cancel",
                                                            btn1Handler: !loading
                                                                ? () => handleCourseDelete(course._id)
                                                                : () => { },
                                                            btn2Handler: !loading
                                                                ? () => setConfirmationModal(null)
                                                                : () => { },
                                                        })
                                                    }}
                                                    title="Delete"
                                                    className="text-[16px] px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </Td>
                                        </Tr>
                                        <hr className=' text-richblack-500 mb-2' />
                                    </>
                                )
                            }
                            )
                    )}
                </Tbody>
            </Table>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default CoursesTable
