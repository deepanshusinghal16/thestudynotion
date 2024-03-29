import React from 'react';
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/TimelineImage.png'

const timeLine = [
    {
        logo: Logo1,
        heading: "Leadership",
        description: " Guiding educational innovation forward",
    },
    {
        logo: Logo2,
        heading: "Expertise",
        description: "Experienced instructors, exceptional knowledge.",
    },
    {
        logo: Logo3,
        heading: "Engagement",
        description: "Interactive, immersive, and participatory",
    },
    {
        logo: Logo4,
        heading: "Accessibility",
        description: "Education for all, anytime, anywhere",
    },
]
const TimelineSection = () => {
    return (
        <div className='w-10/12 mx-auto  mt-10 '>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2   place-items-center place-content-center '>

                <div className='flex flex-col  gap-3 lg:gap-y-6 my-4  mx-auto  justify-center items-start'>
                    {
                        timeLine.map((element, index) => {
                            return (
                                <div>
                                    <div className='flex flex-row justify-around items-center  group w-[100%] w-maxContent ' key={index}>
                                        <div className='w-12 aspect-square  bg-white  flex justify-center items-center  relative
                                        group-hover:scale-105 transition-all duration-200'>
                                            <img src={element.logo} />
                                            {
                                                index !== 0 ? <div className=' absolute h-[20px] w-[1px]  bg-richblack-500  bottom-[100%]'></div> : ""
                                            }
                                        </div>

                                        <div className='flex flex-col '>
                                            <div className='hoverEffect text-md lg:text-lg font-semibold group-hover:scale-105 transition-all duration-200 group-hover:text-sky-400'>{element.heading}</div>
                                            <div className='text-xs group-hover:scale-105 transition-all duration-200 group-hover:opacity-70'>{element.description}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>


                <div className='relative mx-auto  '>
                    <img src={timelineImage} alt='Timeline Image' className='object-cover shadow-lg shadow-black rounded-3xl lg:w-[80%] mx-auto' />

                    <div className='absolute w-[100%] flex justify-center bottom:[50%] -translate-y-[50%] '>
                        <div className='bg-caribbeangreen-700 flex flex-row text-white uppercase py-2 lg:py-2 px-6 
                             right-[20%] rounded-md shadow-caribbeangreen-800 shadow-lg hover:scale-95 transition-all duration-200'>

                            <div className='flex flex-row gap-2 items-center border-r border-caribbeangreen-50 px-2 lg:px-5 '>
                                <h2 className='text-md lg:text-2xl font-bold mx-1'>10</h2>
                                <h2 className='text-xs lg:text-lg font-extralight text-caribbeangreen-200'>Years Of <br /> Experience </h2>
                            </div>

                            <div className='flex flex-row gap-2 items-center  px-2 lg:px-5 '>
                                <h2 className='text-md lg:text-2xl font-bold mx-1'>250</h2>
                                <h2 className='text-xs lg:text-lg font-extralight text-caribbeangreen-200'>Types Of <br /> Courses </h2>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TimelineSection
