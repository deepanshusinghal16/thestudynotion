import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { Link } from 'react-router-dom'
import GetAvgRating from '../../../utils/avgRating';
import RatingStars from '../../common/RatingStars';

const CourseCard = ({ course, Height }) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(() => {
        const count = GetAvgRating(course?.ratingAndReviews);
        setAvgReviewCount(count);
    }, [course])



    return (
        <>
            <Link to={`/courses/${course._id}`}>
                {/* <div className='px-2 py-4 bg-richblack-500 rounded-lg w-full mx-2  '>

                    <img src={`${course?.thumbnail}`} alt="" loading='lazy' className={`aspect-video  rounded-xl object-cover  `} />

                    <div className='flex w-full flex-col gap-y-1 px-2'>

                        <p className='text-lg text-left'>{course?.courseName}</p>
                        <p className='text-right text-xs text-richblack-100'>~By {" " + course?.instructor?.firstName} {course?.instructor?.lastName}</p>

                        <div className='flex gap-3 '>
                            <span>{avgReviewCount || 0}</span>
                            <RatingStars Review_Count={avgReviewCount} />
                            <span className='mx-1'>{course?.ratingAndReviews?.length} Ratings</span>
                        </div>
                        <p className='text-yellow-5 text-left'>₹ {course?.price}</p>
                    </div>
                </div> */}

                <div className='max-w-[350px]  flex flex-col justify-around items-center my-4 gap-2 py-4 px-2 rounded-xl bg-richblack-700'>

                    <div className='flex flex-col  gap-2 items-center w-full' >
                        <img src={course?.thumbnail} className='w-full rounded-md aspect-video' alt='Loading...' />
                        <div className='flex flex-col w-full gap-[2px] justify-center px-2'>
                            <p className='text-md text-richblack-5 '>{course?.courseName}</p>
                            <p className=' text-[0.6rem] max-h-5 text-richblack-200 '>{course?.courseDescription.slice(0, 50)}</p>
                            <p className='w-full italic text-[0.7rem] text-richblack-200  text-right' >~By {course?.instructor?.firstName}</p>
                        </div>
                    </div>

                    <div className='flex items-center justify-between w-full text-xs px-2'>
                        <div className='flex w-max  flex-row items-center gap-4 justify-between '>
                            <div className='flex flex-col gap-1  w-max justify-center '>
                                <div className='flex gap-1 '>
                                    <span>{avgReviewCount || 0}</span>
                                    <RatingStars Review_Count={avgReviewCount} />
                                </div>
                                <p>{course?.ratingAndReviews?.length} Ratings</p>
                            </div>
                        </div>

                        <div className='flex flex-col gap-1 items-center justify-center px-2'>
                            <p className='text-xs w-16'>
                                {course?.totalDuration || "2 hr 30 min"}
                            </p>
                        </div>
                    </div>
                </div>
            </Link >
        </>
    )
}

export default CourseCard
