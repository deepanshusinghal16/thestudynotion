import React from 'react';
import { BsPeople } from "react-icons/bs";
import { FiBookOpen } from "react-icons/fi";


const Card = ({ course, currentCard, setCurrentCard, index }) => {
    const heading = course.heading;
    const description = course.description;
    const level = course.level;
    const lessionNumber = course.lessionNumber;

    return (
        <div className={` w-[200px] md:w-[300px] lg:w-[400px] flex flex-col gap-1 md:gap-4   justify-between px-2 md:px-6  rounded-2xl py-2 md:py-8 border-2 border-richblack-500 
        ${currentCard === heading ? `bg-white border-richblack-400 border-2 text-black hover:shadow-black`
                : `text-white bg-black hover:shadow-white`} transition-all duration-200 hover:shadow-white shadow-inner`}
            onClick={() => setCurrentCard(heading)}
            key={index}>
            <h2 className='text-md font-semibold '>
                {heading}
            </h2>

            <p className='text-xs '>
                {description}
            </p>
            <hr />
            <div className='flex justify-between  gap-1 items-center text-xs '>
                <div className='flex flex-col md:gap-2 items-center '>
                    <BsPeople />
                    {level}
                </div>
                <div className='flex flex-col md:gap-2 items-center '>
                    <FiBookOpen />
                    <div>{lessionNumber} Lessons</div>
                </div>

            </div>
        </div>
    )
}

export default Card
