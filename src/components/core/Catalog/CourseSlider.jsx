import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import { Pagination, Autoplay, Navigation } from "swiper";

import CourseCard from './CourseCard';

const CourseSlider = ({ Courses }) => {

    return (
        <>
            {
                Courses?.length ? (
                    <Swiper
                        slidesPerView={1}
                        centeredSlides={true}
                        autoplay={{
                            delay: 2000,
                            disableOnInteraction: false
                        }}
                        spaceBetween={150}
                        modules={[Autoplay, Pagination, Navigation]}
                        pagination={true}
                        loop={true}
                        className='mySwiper'
                        breakpoints={{
                            1024: { slidesPerView: 3, }
                        }}
                    >

                        {Courses.map((course, index) => (
                            <SwiperSlide className='h-[400px]' key={course.id} >
                                <CourseCard course={course} Height={'h-[300px]'} />
                            </SwiperSlide>
                        ))}



                    </Swiper>
                )
                    : (<p className='text-white text-lg text-center'> No Courses Found</p >)
            }
        </>
    )
}

export default CourseSlider
