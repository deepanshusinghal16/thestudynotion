import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';
import RatingStars from '../../../common/RatingStars';

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1  gap-4 ">
            {
                cart.map((course, index) => (
                    <div key={index} className='flex flex-col md:flex-row gap-4 bg-richblack-700 px-3 py-4 rounded-md '>

                        {/* /thumbnail */}
                        <div className='w-full'>
                            <img src={course?.thumbnail} className='w-[240px] sm:w-[270px] lg:w-[350px] rounded-2xl aspect-video' alt='Loading...' />
                        </div>

                        {/* Description */}
                        <div className='flex flex-col gap-2 justify-center'>
                            <h2 className='text-sm'>{course?.courseName}</h2>
                            <p className='text-xs'>{course?.category?.name}</p>

                            <div className='flex gap-2 w-max text-xs items-center'>
                                <span>4.5</span>
                                <RatingStars Review_Count={4.5} Star_Size={24} />
                                <span>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>

                        </div>


                        <div className='flex flex-col items-center justify-center gap-4'>
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className='py-1 px-2 bg-pink-500 text-white flex gap-2 items-center rounded-xl text-xs'
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                            <p>₹ {course.price}</p>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses
