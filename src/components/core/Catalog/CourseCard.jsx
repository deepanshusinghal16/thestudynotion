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
        <div>
            <Link to={`/courses/${course._id}`}>
                <div className='px-2 py-4 bg-richblack-500 rounded-lg  ${Height}'>

                    <img src={`${course?.thumbnail}`} alt="" loading='lazy' className={`w-full aspect-video rounded-xl object-cover  `} />

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
                </div>
            </Link>
        </div>
    )
}

export default CourseCard
