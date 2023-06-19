import React from 'react'
import { AiFillThunderbolt } from "react-icons/ai";

const Instructions = () => {
    return (
        <div className='flex flex-col gap-4 items-center justify-center py-6 px-2 md:px-10 bg-richblack-800 rounded-2xl lg:min-w-[400px] '>
            <h2 className='text-lg flex gap-2 items-center text-yellow-5 '><AiFillThunderbolt className='text-xl  text-blue-200' />Code Upload Tips</h2>
            <ul className='list-disc mx-auto gap-2 flex flex-col my-4 px-2 lg:px-0 '>
                <li>Select the course price option or make it free</li>
                <li>Select the course price option or make it free</li>
                <li>Select the course price option or make it free</li>
                <li>Select the course price option or make it free</li>
                <li>Select the course price option or make it free</li>
                <li>Select the course price option or make it free</li>
                <li>Select the course price option or make it free</li>
            </ul>
        </div>
    )
}

export default Instructions