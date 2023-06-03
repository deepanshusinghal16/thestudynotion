import React from 'react'
import HighlightText from './HighlightText'
import InstructorImage from '../../../assets/Images/Instructor.png';
import CTAButton from './CTAButton';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';

const Instructor = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 mx-auto gap-10  place-content-center place-items-center my-16 '>
            <div className='flex justify-center items-center '>
                <img src={InstructorImage} alt="Instructor"
                    className='object-cover w-[90%]  rounded-xl shadow-white hover:shadow-md ' />
            </div>

            <div className='flex flex-col gap-4 items-center md:items-start'>

                <h2 className='font-semibold text-3xl  '>Become an 
                    <HighlightText text={" Instructor"} />
                </h2>

                <p className=' opacity-70 text-md '>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae asperiores nostrum incidunt soluta itaque! Quia, commodi! Natus magnam minima earum eius error, soluta itaque .
                </p>

                <CTAButton active={true} linkto={"/"}>
                    <div className='text-md md:text-md lg:text-2xl py-2 px-6  font-semibold flex gap-2 items-center'>
                        <h2 className='text-xl'>Start Teaching Today</h2>
                        <HiOutlineArrowNarrowRight />
                    </div>
                </CTAButton>

            </div>

        </div>
    )
}

export default Instructor
