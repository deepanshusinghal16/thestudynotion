import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse } from '../../../../../slices/courseSlice';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { GiSplitCross } from "react-icons/gi";
import Upload from "../Upload"


const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {

    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const { course } = useSelector((state) => state.course);

    useEffect(() => {
        if (view || edit) {
            //console.log(modalData)
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
    }, []);

    const isFormUpdated = () => {
        const currValues = getValues();
        return (
            currValues.lectureTitle !== modalData.title ||
            currValues.lectureDesc !== modalData.description ||
            currValues.lectureVideo !== modalData.videoUrl
        )

    }

    const handleEditSubSection = async (data) => {
        const currValues = getValues();
        const formData = new FormData();

        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if (currValues.lectureTitle !== modalData.title)
            formData.append("title", currValues.lectureTitle);

        if (currValues.lectureDesc !== modalData.description)
            formData.append("description", currValues.lectureDesc);

        if (currValues.lectureVideo !== modalData.videoUrl)
            formData.append("video", currValues.lectureVideo);
        setLoading(true);
        const result = await updateSubSection(formData, token);
        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData.sectionId ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse));
        }
        setModalData(null);
        setLoading(false);
    }

    const onSubmit = async (data) => {
        if (view)
            return;
        if (edit) {
            if (!isFormUpdated) {
                toast.error("Nothing update made in the form");
            } else {
                //editing in the form is done
                handleEditSubSection();
            }
            return;
        }

        const formData = new FormData();
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle)
        // formData.append("timeDuration")
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        setLoading(true);

        const result = await createSubSection(formData, token);

        if (result) {
            const updatedCourseContent = course.courseContent.map((section) => section._id === modalData ? result : section);
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse));
            //console.log(course)
        }
        setModalData(null);
        setLoading(false);
    }

    return (
        <div className='absolute w-[100vw] mx-auto inset-y-0 left-0 right-0  flex justify-center items-center top-0 backdrop-blur-[4px] z-[10]'>


            <div className='my-6 bg-richblack-500  rounded-xl'>
                <div className='flex justify-between bg-richblack-600 px-4 py-2 rounded-xl'>
                    <header className='font-mono'>
                        {view && "Viewing "}
                        {add && "Adding "}
                        {edit && "Editing "}
                        Lecture
                    </header>


                    <button
                        onClick={() => (!loading && setModalData(null))}>
                        <GiSplitCross />
                    </button>
                </div>


                <form onSubmit={handleSubmit(onSubmit)} className='my-2 flex flex-col  gap-y-4 py-4 px-4'>
                    <Upload
                        // disabled={view}
                        name="lectureVideo"
                        label="Lecture Video"
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        video={true}
                        viewData={view ? modalData.videoUrl : null}
                        editData={edit ? modalData.videoUrl : null}
                    />

                    {/* Lecture Title */}
                    <div>
                        <label htmlFor="lectureTitle">Lecture Title</label>
                        <input
                            disabled={view}
                            type="text"
                            id='lectureTitle'
                            placeholder='Enterlecture Title'
                            {...register("lectureTitle", { required: true })}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800  py-2 px-2 text-richblack-5"
                        />
                        {
                            errors.lectureTitle && (<span className='text-xs text-pink-400'>{errors.lectureTitle}</span>)
                        }
                    </div>
                    {/* Lecture Desc */}
                    <div>
                        <label htmlFor="lectureDesc">Lecture Description</label>
                        <textarea
                            disabled={view}
                            id='lectureDesc'
                            placeholder='Enter lecture Description'
                            {...register("lectureDesc", { required: true })}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800  py-2 px-2 text-richblack-5"
                        />
                        {
                            errors.lectureDesc && (<span className='text-xs text-pink-400'>{errors.lectureDesc}</span>)
                        }
                    </div>

                    {
                        !view && (
                            <div className='flex w-full justify-end'>
                                <button className='py-1 px-3 bg-yellow-25 rounded-xl text-richblack-900'>
                                    {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                                </button>
                            </div>
                        )
                    }

                </form>

            </div>
        </div>
    )
}

export default SubSectionModal
