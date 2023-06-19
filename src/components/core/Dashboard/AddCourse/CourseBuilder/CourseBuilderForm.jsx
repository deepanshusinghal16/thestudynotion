import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from "react-icons/bi";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI';
import { toast } from 'react-hot-toast';
import NestedView from './NestedView';


const CourseBuilderForm = () => {

    const { token } = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [editSectionName, setEditSectionName] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const cancelEditting = () => {
        setEditSectionName(null);
        setValue('sectionName', "");
    }

    const goBack = () => {
        dispatch(setStep(1));
        dispatch(setEditCourse(true));
    }

    const goToNext = () => {
        if (course?.courseContent?.length === 0) {
            toast.error("Please add atleast one section");
            return;
        }
        if (course?.courseContent.some((section) => section.subSection.length === 0)) {
            toast.error("Please add atleast one lecture in each section");
            return;
        }
        dispatch(setStep(3));
    }


    const onSubmit = async (data) => {

        setLoading(true);
        let result;
        if (editSectionName) {
            result = await updateSection(
                {
                    sectionName: data.sectionName,
                    sectionId: editSectionName,
                    courseId: course._id,
                },
                token
            )
        }
        else {
            result = await createSection(
                {
                    sectionName: data.sectionName,
                    courseId: course._id,
                }, token
            )
        }

        if (result) {
            dispatch(setCourse(result))
            setEditSectionName(null);
            setValue("sectionName", "");
        }

        setLoading(false);
    }

    const handleChangeEditSectionName = (sectionId, sectionName) => {
        if (editSectionName === sectionId) {
            cancelEditting();
            return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName", sectionName);
    }


    return (
        <div className='py-4 px-6 space-y-4'>
            <h2 className='font-semibold text-lg'>Course Build</h2>

            <form className='flex flex-col gap-y-4' onSubmit={handleSubmit(onSubmit)}>

                {/* Section Name */}
                <div>
                    <label htmlFor="sectionName">Section Name <sup className='text-pink-500'>*</sup> </label>
                    <input
                        type="text"
                        name='sectionName'
                        id='sectionName'
                        placeholder='Add a section'
                        {...register("sectionName", { required: true })}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800  py-2 px-2 text-richblack-5"
                    />
                    {
                        errors.sectionName && (
                            <span className='text-xs text-pink-500'>Section Name is Required</span>
                        )
                    }
                </div>


                {/* Now After Section Name */}
                <div className='flex gap-2  items-baseline'>
                    <button
                        type='submit'
                        className=' flex gap-1 items-center py-1 px-4 text-md text-yellow-200 border-yellow-5 border-[1px] rounded-lg '
                    >
                        {
                            editSectionName ? "Edit Section " : "Create Section "
                        }
                        <AiOutlinePlusCircle className='text-xl' />

                    </button>
                    {
                        editSectionName && (
                            <button className='underline text-sm text-richblack-500' onClick={cancelEditting}>Cancel Edit</button>
                        )
                    }
                </div>

            </form>

            {course?.courseContent?.length > 0 && (<NestedView handleChangeEditSectionName={handleChangeEditSectionName} />)}

            <div className='flex gap-2 justify-end'>
                <button
                    className=' flex gap-1 items-center py-1 px-4 text-md text-richblack-200 bg-richblack-500 border-[1px] rounded-lg '
                    onClick={() => goBack()}>
                    Back
                </button>
                <button
                    className='flex gap-1 items-center py-1 px-4 text-md text-yellow-200 border-yellow-5 border-[1px] rounded-lg '
                    onClick={() => goToNext()}
                >
                    Next
                    <BiRightArrow />
                </button>
            </div>

        </div>
    )
}

export default CourseBuilderForm
