import React from 'react'
import { AiFillThunderbolt } from "react-icons/ai";

const Instructions = () => {
    return (
        <div className='flex flex-col  mx-auto gap-4 items-center justify-center py-6 px-2 md:px-10 bg-richblack-800 rounded-2xl lg:min-w-[500px] '>
            <h2 className='text-lg flex gap-2 items-center text-yellow-5 '><AiFillThunderbolt className='text-xl  text-blue-200' />Code Upload Tips</h2>
            <ul className='list-disc mx-auto gap-2 flex flex-col my-4 px-2 lg:px-0 items-start justify-center  text-xs md:text-sm w-maxContent '>
                <li>Set clear objectives for effective learning.</li>
                <li>Engage learners with multimedia content.</li>
                <li>Organize modules for easy navigation.</li>
                <li>Apply concepts to real-world scenarios.</li>
                <li>Assess progress with regular quizzes.</li>
                <li>Offer additional resources for in-depth study.</li>
                <li>Promote active learning through participation.</li>
                <li>Provide constructive feedback for improvement.</li>
                <li>Encourage collaboration among learners.</li>
                <li>Keep the course concise and focused.</li>
            </ul>
        </div>
    )
}

export default Instructions
