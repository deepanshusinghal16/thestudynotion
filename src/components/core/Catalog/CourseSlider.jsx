// import React from 'react'
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/free-mode";
// import { Pagination, Autoplay, Navigation } from "swiper";

// import CourseCard from './CourseCard';

// const CourseSlider = ({ Courses }) => {

//     return (
//         <>
//             {
//                 Courses?.length ? (
//                     // <Swiper
//                     //     mousewheel={true}
//                     //     freeMode={true}
//                     //     slidesPerView={3}
//                     //     centeredSlides={true}
//                     //     autoplay={{
//                     //         delay: 1000,
//                     //         disableOnInteraction: false
//                     //     }}
//                     //     onSlideResetTransitionStart={1}
//                     //     coverflowEffect={{
//                     //         rotate: 0,
//                     //         stretch: 150,
//                     //         depth: 200,
//                     //         modifier: 1,
//                     //         slideShadows: true
//                     //     }}
//                     //     effect='coverflow'
//                     //     spaceBetween={150}
//                     //     modules={[Autoplay, Pagination, Navigation]}

//                     //     loop={true}
//                     //     className='mySwiper'
//                     //     breakpoints={{
//                     //         1024: { slidesPerView: 3, }
//                     //     }}

//                     //     pagination={

//                     //         {
//                     //             el: '.swiper-pagination',
//                     //             clickable: true
//                     //         }
//                     //     }
//                     //     navigation={
//                     //         {
//                     //             nextEl: '.swiper-button-next',
//                     //             prevEl: '.swiper-button-prev',
//                     //         }
//                     //     }
//                     //     scrollbar={
//                     //         { el: '.swiper-scrollbar', }
//                     //     }
//                     // >
//                     <div className='flex gap-10 items-center justify-between overflow-x-scroll'>

//                         {Courses.map((course, index) => (

//                             <CourseCard course={course} Height={'h-[150px] md:h-[300px]'} />
//                             // </SwiperSlide>
//                         ))}

//                     </div>



//                 )
//                     : (<p className='text-white text-lg text-center my-4 '> No Courses Found</p >)
//             }
//         </>
//     )
// }

// export default CourseSlider


import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { Autoplay, FreeMode, Navigation, Pagination } from 'swiper'

import CourseCard from './CourseCard'

const CourseSlider = ({ Courses }) => {
    return (
        <>
            {Courses?.length ? (
                <Swiper
                    slidesPerView={1}
                    spaceBetween={25}
                    autoplay={true}
                    loop={true}
                    modules={[FreeMode, Pagination, Autoplay]}
                    breakpoints={{
                        724: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                    className="max-h-[30rem]"
                >
                    {Courses?.map((course, i) => (
                        <SwiperSlide key={i}>
                            <CourseCard course={course} Height={"h-[250px]"} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            ) : (
                <p className="text-xl text-richblack-5">No Course Found</p>
            )}
        </>
    )
}

export default CourseSlider
