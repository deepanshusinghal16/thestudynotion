import React, { useEffect, useState } from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'
import ReactStars from "react-rating-stars-component"
import { apiConnector } from '../../../services/apiConnector'
import { ratingsEndpoints } from '../../../services/api'
import { FaStar } from 'react-icons/fa'


const ReviewSection = () => {

    const [reviews, setReviews] = useState([]);
    const truncateWords = 15;


    useEffect(() => {
        const fetchAllReviews = async () => {
            const { data } = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API)
            if (data?.success) {
                setReviews(data?.data);
            }
        }
        fetchAllReviews();
    }, []);


    return (
        <div className='text-white w-full h-maxContent pb-4'>
            <div className='h-[190px] w-maxContent'>
                <Swiper
                    breakpoints={{
                        300: {
                            slidesPerView: 1,
                        },
                        400: {
                            slidesPerView: 2,
                        },
                        850: {
                            slidesPerView: 4,
                        },
                    }}
                    spaceBetween={24}
                    loop={true}
                    freeMode={true}
                    autoplay={{
                        delay: 1500,
                    }}
                    modules={[FreeMode, Pagination, Autoplay]}
                    className='w-full'
                >

                    {
                        reviews.map((review, index) => (
                            <SwiperSlide key={index}

                                className=' bg-richblack-800 px-3 rounded-lg  flex items-center  py-3  h-36 '>

                                <div className='mx-auto'>
                                    <div className='flex text-sm  gap-4 font-normal w-maxContent '>
                                        <img
                                            src={review?.user?.image
                                                ? review?.user?.image
                                                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`}
                                            alt='Profile Pic'
                                            className='h-9 w-9 object-cover  rounded-full'
                                        />
                                        <div className='flex flex-wrap gap-x-2 text-xs  items-center'>
                                            <p>{review?.user?.firstName}</p>
                                            <p>{review?.user?.lastName}</p>
                                        </div>
                                    </div>

                                    <p className='font-normal w-maxContent mt-1'>
                                        <p className='text-sm font-title'>{review?.course?.courseName}</p>
                                        <p className='text-xs  w-maxContent font-review'>{review?.review}</p>
                                    </p>

                                    <div className='flex gap-2  items-center text-sm'>
                                        <p>{review?.rating.toFixed(1)}</p>
                                        <ReactStars
                                            count={5}
                                            value={review.rating}
                                            size={20}
                                            edit={false}
                                            activeColor="#ffd700"
                                            emptyIcon={<FaStar />}
                                            fullIcon={<FaStar />}
                                        />
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

        </div >
    )
}

export default ReviewSection
