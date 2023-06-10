import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { IoMdStarOutline, IoMdStarHalf, IoMdStar } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { removeFromCart } from '../../../../slices/cartSlice';

const RenderCartCourses = () => {

    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    return (
        <div>
            {
                cart.map((course, index) => (
                    <div key={index} className='flex gap-4'>

                        {/* /thumbnail */}
                        <div className='w-full'>
                            <img src={course?.thumbnail} alt='Loading...' />
                        </div>

                        {/* Description */}
                        <div className='flex flex-col gap-2'>
                            <h2>{course?.courseName}</h2>
                            <p>{course?.category?.name}</p>

                            <div className='flex gap-2'>
                                <span>4.5</span>
                                <div>
                                    <ReactStars
                                        count={5}
                                        // onChange={}
                                        size={20}
                                        isHalf={true}
                                        emptyIcon={<IoMdStarOutline />}
                                        halfIcon={<IoMdStarHalf />}
                                        fullIcon={<IoMdStar />}
                                        activeColor="#ffd700"
                                    />
                                </div>
                                <span>{course?.ratingAndReviews?.length} Ratings</span>
                            </div>

                        </div>

                        {/* Buy Now */}
                        <div className='flex flex-col items-center justify-around'>
                            <button
                                onClick={() => dispatch(removeFromCart(course._id))}
                                className='py-1 px-2 bg-pink-500 text-white'
                            >
                                <RiDeleteBin6Line />
                                <span>Remove</span>
                            </button>
                            <p>Rs. {course.price}</p>
                        </div>

                    </div>
                ))
            }
        </div>
    )
}

export default RenderCartCourses
