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
        }
        setModalData(null);
        setLoading(false);
    }

    return (
        <div className='my-6 '>

            <div>
                <header>
                    {view && "Viewing"}
                    {add && "Adding"}
                    {edit && "Editing"}
                    Lecture
                </header>

                <button
                    onClick={() => (!loading && setModalData(null))}>
                    <GiSplitCross />
                </button>
            </div>


            <form onSubmit={handleSubmit(onSubmit)}>
                <Upload
                    disabled={view}
                    name="lectureVideo"
                    label="lectureVideo"
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
                        <div>
                            <button>
                                {loading ? "Loading..." : edit ? "Save Changes" : "Save"}
                            </button>
                        </div>
                    )
                }

            </form>

        </div>
    )
}

export default SubSectionModal
