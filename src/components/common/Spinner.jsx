import React from 'react'

const Spinner = () => {
    return (

        <div className="flex items-center flex-col  text-center text-[3rem] md:text-[5rem] lg:text-[6rem] justify-center h-[90vh]   ">
            <div className='spinner'></div>
            <span className='waviy text-richblack-100'>Loading...</span>
        </div>

    )
}

export default Spinner
