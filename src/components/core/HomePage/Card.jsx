import React from 'react';
import { BsPeople } from "react-icons/bs";
import { FiBookOpen } from "react-icons/fi";


const Card = ({ course, currentCard, setCurrentCard, key }) => {
    const heading = course.heading;
    const description = course.description;
    const level = course.level;
    const lessionNumber = course.lessionNumber;

    return (
        <div className={`flex flex-col gap-4   justify-between px-6 mx-4 rounded-2xl py-8 border-2 border-richblack-500 
        ${currentCard === heading ? `bg-white border-richblack-400 border-2 text-black hover:shadow-black`
                : `text-white bg-black hover:shadow-white`} transition-all duration-200 hover:shadow-white shadow-inner`}
            onClick={() => setCurrentCard(heading)}>
            <h2 className='text-xl font-semibold '>
                {heading}
            </h2>

            <p className='text:lg '>
                {description}
            </p>
            <hr />
            <div className='flex justify-between items-center text:sm lg:text:lg '>
                <div className='flex gap-2 items-center '>
                    <BsPeople />
                    {level}
                </div>
                <div className='flex gap-2 items-center '>
                    <FiBookOpen />
                    <div>{lessionNumber} Lessons</div>
                </div>

            </div>
        </div>
    )
}

export default Card
