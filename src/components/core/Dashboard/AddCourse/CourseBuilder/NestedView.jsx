import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { FiEdit2 } from "react-icons/fi";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { MdDeleteForever } from "react-icons/md";
import { BiCaretDown } from "react-icons/bi";
import { TiPlus } from "react-icons/ti";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';

const NestedView = ({ handleChangeEditSectionName }) => {

    const { course } = useSelector((state) => state.course);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [showModal, setShowModal] = useState(null);


    const handleDeleteSection = async (sectionId) => {
        const result = await deleteSection({ sectionId, courseId: course._id, token });
        if (result) {

            dispatch(setCourse(result));
        }
        setShowModal(null);
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        const result = await deleteSubSection({ subSectionId, sectionId, token })

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === sectionId ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse));
        }
        setShowModal(null);
    }

    return (
        <div>
            <div className='mt-10 rounded-lg bg-richblack-600 py-10 px-6'>
                {
                    course?.courseContent.map((section) => (
                        <details key={section._id} open>
                            <summary className='flex justify-between  border-y-[1px] py-2 '>
                                <div className='flex items-center gap-x-1'>
                                    <IoIosArrowDropdownCircle />
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    {/* Edit btn */}
                                    <button
                                        onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}>
                                        <FiEdit2 />
                                    </button>
                                    {/* Delete Btn */}
                                    <button onClick={() => setShowModal({
                                        text1: "Delete this Section",
                                        text2: "All the lecture in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setShowModal(null)
                                    })}>
                                        <MdDeleteForever />
                                    </button>
                                    <span>|</span>
                                    <BiCaretDown className='' />
                                </div>


                            </summary>

                            <div className='mx-6 w-[80%] '>
                                {
                                    section?.subSection.map((data) => (
                                        <div key={data._id}
                                            onClick={() => setViewSubSection(data)}
                                            className='flex items-center justify-between '>


                                            <div className='flex items-center gap-x-1'>
                                                <IoIosArrowDropdownCircle />
                                                <p>{data.title}</p>
                                            </div>

                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className='flex items-center gap-2'>
                                                <button
                                                    onClick={() => setEditSubSection({ ...data, sectionId: section._id })}>
                                                    <FiEdit2 />
                                                </button>
                                                <button onClick={() => setShowModal({
                                                    text1: "Delete this SubSection",
                                                    text2: "This lecture will be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                                                    btn2Handler: () => setShowModal(null)
                                                })}>
                                                    <MdDeleteForever />
                                                </button>

                                            </div>

                                        </div>
                                    ))
                                }
                                {/* Add Lecture */}
                                <button
                                    className='flex gap-4 mx-10 text-yellow-5 items-center text-lg'
                                    onClick={() => setAddSubSection(section._id)}>
                                    <TiPlus />
                                    <p>Add Lecture</p>
                                </button>
                            </div>

                        </details>
                    ))
                }
            </div>

            {
                addSubSection ?
                    (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} />)
                    : viewSubSection ?
                        (<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} />)
                        : editSubSection ?
                            (<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} />)
                            : (<div></div>)
            }

            {showModal && (<ConfirmationModal modalData={showModal} />)}

        </div >
    )
}

export default NestedView
