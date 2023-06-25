import React from 'react'
import { buyCourse } from '../services/operations/studentFeaturesAPI'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import GetAvgRating from '../utils/avgRating';
import Spinner from '../components/common/Spinner';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import { formatDate } from '../services/formatDate';
import { MdLanguage, MdOutlineArrowDropDown } from "react-icons/md";
import CourseDetailCard from '../components/core/Course/CourseDetailCard';
import { IoIosVideocam } from "react-icons/io";
import Footer from "../components/common/Footer";
import { ACCOUNT_TYPE } from '../utils/constants';
import { toast } from 'react-hot-toast';

const CourseDetails = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { loading } = useSelector((state) => state.profile);
    const { paymentLoading } = useSelector((state) => state.course);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchCourseDetails(courseId);
                setCourseData(response);
                console.log(courseData);

            } catch (e) {
                console.log("Unable to fetch data of the course", e);
            }
        }
        if (courseId)
            fetchData(courseId);
    }, [courseId]);

    const [avgReviewCount, setAvgReviewCount] = useState(0);
    useEffect(() => {
        const count = GetAvgRating(courseData?.data?.courseDetails?.ratingAndReviews)
        setAvgReviewCount(count);
    }, [courseData])

    const [totalNumberofLecture, setTotalNumberOfLecture] = useState(0);
    useEffect(() => {
        let lec = 0;
        courseData?.data?.courseDetails?.courseContent?.forEach((sec) => {
            lec += sec.subSection.length || 0
        })
        setTotalNumberOfLecture(lec);
    }, [courseData])

    const [isActive, setIsActive] = useState(Array(0));
    const handleActive = (id) => {
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e) => e !== id)
        )
    }


    const handleBuyNow = async () => {
        if (user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor..!");
            return;
        }
        if (token) {
            await buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }
        setModal({
            text1: "You are not logged in..!",
            text2: "Please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: () => navigate("/login"),
            btn2Handler: () => setModal(null)
        })
    }



    if (loading || !courseData) {
        return <Spinner />
    }

    const {
        courseName,
        courseDescription,
        whatYouWillLearn,
        courseContent,
        ratingAndReviews,
        instructor,
        studentsEnrolled,
        createdAt,
    } = courseData?.data?.courseDetails;

    function showDetail() {
        return (
            <div className=' flex flex-col   gap-2  w-max md:mx-auto lg:mx-28'>
                <div className='text-[1.2rem] '>{courseName}</div>
                <div className='text-sm max-w-[280px] md:max-w-[calc(100%-350px)] '>{courseDescription}</div>
                <div className='flex flex-col md:flex-row text-xs justify-center md:justify-start gap-1'>
                    <div className='flex flex-row gap-2'>
                        <span>Rating </span>
                        <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                    </div>
                    <div className='flex flex-row gap-2'>
                        <span>{`(${ratingAndReviews.length} Reviews)`}</span>
                        <span>{`(${studentsEnrolled.length} Students Enrolled)`}</span>
                    </div>
                </div>
                <div className='text-xs'>Created By {instructor.firstName} {instructor.lastName} </div>
                <div className='flex gap-1 text-xs'>
                    <div className='border-r-2 pr-2'>Created At: {formatDate(createdAt)}</div>
                    <div className='flex gap-[1px] items-center'> <MdLanguage /> English</div>
                </div>
            </div>
        )
    }


    return (
        <>

            <section className='bg-richblack-700 w-full'>


                <div className='relative md:w-10/12 pt-6 md:pt-20 px-2 pb-6 w-full '>
                    <div className='hidden md:block w-[calc(100%-350px)] px-2'>
                        {
                            showDetail()
                        }
                    </div>


                    {/* Card */}
                    <div className='max-w-[350px] mx-auto md:absolute z-[1] top-16 -right-28 bg-richblack-500 py-2 px-2 rounded-md'>
                        <CourseDetailCard
                            course={courseData?.data?.courseDetails}
                            setModal={setModal}
                            handleBuyNow={handleBuyNow}
                            showDetail={showDetail}
                        />
                    </div>
                </div>
            </section>

            <section className="bg-richblack-900 w-full">
                {/* what YouWillLern */}
                <div className='md:w-10/12  px-2 py-6 flex flex-col justify-start gap-2 relative w-full mx-auto'>
                    <div className='border-[2px] border-richblack-600 py-4 px-2 flex flex-col gap-2 md:max-w-[calc(100%-350px)]  lg:px-6'>
                        <p className='font-bold text-[1.2rem]'>What You Will Learn</p>
                        <p className='text-[0.825rem] text-richblack-100 px-3'>{whatYouWillLearn}</p>
                    </div>
                </div>

                {/* Section display section */}
                <div className='md:w-10/12  px-2 py-6 flex flex-col justify-start gap-2 relative w-full mx-auto'>
                    <div className='flex flex-col gap-1 md:max-w-[calc(100%-350px)] '>
                        <p className='font-bold text-[1.2rem]'>Course Content</p>
                        <div className='flex justify-between  text-xs'>
                            <div className='flex flex-col px-2 lg:flex-row gap-1 justify-start '>
                                <div className='flex flex-row gap-1 items-center'>
                                    <span>{courseContent.length} Section(s) </span>
                                    <span>{totalNumberofLecture} Lecture(s)</span>
                                </div>

                                <div className='flex flex-row gap-1'>
                                    <span>{courseData?.data?.totalDuration} Total Length</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsActive([])}
                                className='text-yellow-25'>
                                Collapse All Section
                            </button>
                        </div>
                    </div>

                    <div className='md:max-w-[calc(100%-350px)] '>
                        {
                            courseContent?.map((content) => (
                                <div key={content._id}
                                    className='flex flex-col gap-2  px-2 text-sm'>
                                    <div
                                        onClick={() => handleActive(content._id)}
                                        className='cursor-pointer flex justify-between items-center bg-richblack-600 rounded-md px-2 w-full py-2 '>
                                        <div className='flex gap-1 items-center '>
                                            <button
                                            >
                                                <MdOutlineArrowDropDown className={`${isActive.includes(content._id) && "rotate-180"} transition-all duration-300`} />
                                            </button>
                                            {content.sectionName}
                                        </div>
                                        <div className='text-[0.625rem] text-yellow-25'>
                                            {content?.subSection?.length} Lecture(s)
                                        </div>
                                    </div>

                                    <div className='flex flex-col transition-all duration-300 ease-in-out'>
                                        {
                                            isActive.includes(content._id) &&
                                            content?.subSection.map((lecture) => (
                                                <div key={lecture._id}
                                                    className='flex items-center gap-1 pl-6 text-xs py-2  w-full border-b-[2px] border-richblack-500'>
                                                    <IoIosVideocam />
                                                    {lecture.title}
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>


                </div>

                <div className='md:w-10/12 px-2 py-6 w-full mx-auto flex flex-col gap-2'>
                    <p className='font-bold text-[1.2rem]'>Author</p>
                    <div className='flex gap-x-4 items-center'>
                        <img src={instructor?.image} alt="Author" className='w-12 h-12 aspect-square rounded-full' />
                        <p className='text-sm'>{instructor?.firstName} {instructor?.lastName}</p>
                    </div>
                    <p className='text-[0.625rem] px-2'>{instructor?.additionalDetails?.about}</p>
                </div>

            </section>



            <Footer />
            {modal && <ConfirmationModal modalData={modal} />}

        </>


    )
}

export default CourseDetails
