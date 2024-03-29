import React from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import Instructor from '../components/core/HomePage/Instructor';
import ReviewSection from '../components/core/HomePage/ReviewSection';
import Footer from '../components/common/Footer';
import ExploreMore from '../components/core/HomePage/ExploreMore';


const Home = () => {
    return (
        <div>

            {/****Section 1******** */}
            <section className='relative mx-auto items-center px-2 mb-10 md:w-10/12 flex flex-col text-white justify-between gap-5 max-w-maxContent'>

                <Link to={"/signup"}>
                    <div
                        className='mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all 
                                    duration-300 hover:scale-95 w-fit group  '>
                        <div className='flex flex-row items-center gap-4 rounded-full  px-5  py-1 transition-all 
                                    duration-300 group-hover:bg-richblack-900 group-hover:shadow-white shadow-inner '>
                            <p>Become An Instructor</p>
                            <HiOutlineArrowNarrowRight />
                        </div>
                    </div>
                </Link>

                <div className=' text-lg sm:text-lg md:text-2xl font-semibold text-center'>
                    <h1>Empower Your Future With <HighlightText text={"Coding Skills"} /> </h1>

                </div>

                <div className='mb-2  text-xs sm:text-sm  text-richblack-500   text-justify sm:text-center'>
                    StudyNotion: Personalized, adaptive learning. Innovative tools, interactive classrooms. Empower yourself with dynamic lessons. Join our global community for education anytime, anywhere.
                </div>

                <div className='flex gap-4 flex-row'>
                    <CTAButton
                        active={true} linkto={"/signup"}>
                        <h2 className='text-md sm:text-lg md:text-lg lg:text-lg py-2 px-3 '>
                            Learn More

                        </h2>
                    </CTAButton>
                    <CTAButton active={false} linkto={"/login"}>
                        <h2 className='text-md sm:text-lg md:text-lg lg:text-lg py-2 px-3  '>
                            Book a Demo
                        </h2>
                    </CTAButton >
                </div>

                <div className='shadow-blue-200 flex items-center justify-center my-10 max-w-maxContent shadow-2xl '>
                    <video
                        muted
                        loop
                        autoPlay>
                        <source src={Banner} type="video/mp4" />

                    </video>
                </div>


                <div
                    className='flex justify-around items-center flex-col  '>
                    {/*Code Section 1*/}
                    <div className='w-full'>
                        <CodeBlocks
                            reverse={false}
                            heading={<div className='text-xl sm:text-2xl font-semibold'>
                                Unlock your <HighlightText text={"coding potential"} />  with our online courses
                            </div>}
                            subHeading={
                                "Ignite Your Coding Skills: Explore our Online Courses and Unleash Your Full Potential in the World of Programming."
                            }
                            ctabtn1={
                                {
                                    btnText: "Try it yourself",
                                    active: true,
                                    linkto: "/signup",
                                }
                            }
                            ctabtn2={
                                {
                                    btnText: "Learn More",
                                    active: false,
                                    linkto: "/login",
                                }
                            }
                            codeblock={`<!DOCTYPE html>
                        <html>
                           <head>
                          <title>Learn With StudyNotion</title>
                        </head>
                        <body>
                          <h1>Welcome to StudyNotion</h1>
                        </body>
                        </html>
                        `}
                            codeColor={"text-yellow-25"}
                        />
                    </div>


                    {/*Code Section 2*/}
                    <div className=''>
                        <CodeBlocks
                            reverse={true}
                            heading={<div className='text-2xl sm:text-2xl font-semibold'>
                                Start <HighlightText text={"coding in"} /> <HighlightText text={"Seconds "} />
                            </div>}
                            subHeading={
                                "Ignite Your Coding Passion: Dive into the World of Programming and Start Coding Today!"
                            }
                            ctabtn1={
                                {
                                    btnText: "Continue Lesson",
                                    active: true,
                                    linkto: "/signup",
                                }
                            }
                            ctabtn2={
                                {
                                    btnText: "Learn More",
                                    active: false,
                                    linkto: "/login",
                                }
                            }
                            codeblock={
                                `const express = require('express')
                                const app = express()
                                const dotenv = require("dotenv")
                                dotenv.config()
                                const PORT = process.env.PORT || 4000
                                dbConnect();
                                app.listen(PORT, () => {
                                   //console.log("Server running on port " + PORT)
                                })`}
                            codeColor={"text-pink-500"}
                        />
                    </div>
                </div>



            </section>
            <div className='w-full px-2 md:px-4 lg:w-10/12 mb-20 mx-auto '>
                <ExploreMore />
            </div>

            {/****Section 2******** */}
            <section className='bg-pure-greys-5 text-richblack-700 flex flex-col gap-6'>

                <div className='homepage_bg h-[200px] md:h-[300px]  flex  items-center '>

                    <div className='md:w-10/12 px-2 lg:max-w-[800px]   flex items-center  gap-2 sm:gap-4 mx-auto'>

                        <div className='grid grid-cols-2 gap-1 sm:gap-2  text-white sm:my-5 mx-auto justify-between items-center w-full'>

                            <CTAButton active={true} linkto={"/signup"} length={true} >
                                <div className='text-[15px] sm:text-lg py-1 sm:py-2  w-full px-1   flex sm:gap-1 items-center justify-between'>
                                    <h4 className='text-[0.8rem]  sm:text-lg'>Explore Catalog</h4>
                                    <HiOutlineArrowNarrowRight />
                                </div>
                            </CTAButton>

                            <CTAButton active={false} linkto={"/signup"} length={true}>
                                <h4 className='text-[0.8rem]  sm:text-lg  w-full  py-1 sm:py-2 px-1  text-center justify-center'>Learn More</h4>
                            </CTAButton>

                        </div>

                    </div>

                </div>


                <div className='md:w-10/12 px-2 max-w-[1200px]   mx-auto  flex flex-col items-center justify-center gap-6 my-5 '>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 justify-around items-center md:px-10 lg:px-20'>

                        <div className='text-2xl font-semibold '>
                            Get the skills you need for a
                            <HighlightText text={" Job that is in Demand."} />
                        </div>

                        <div className='flex flex-col gap-4  '>

                            <div className='text-md md:text-lg  opacity-80'>
                                StudyNotion, the cutting-edge edTech platform, ensures a secure future by empowering
                                learners with essential coding skills.
                            </div>

                            <CTAButton active={true} length={true}>
                                <h2 className='text-md md:text-md lg:text-2xl py-2 px-4  font-semibold text-center'>
                                    Learn More
                                </h2>
                            </CTAButton>

                        </div>

                    </div>

                </div>


                <TimelineSection />

                <LearningLanguageSection />


            </section>

            {/****Section 3******** */}
            <section className='w-10/12 mx-auto max-w-maxContent bg-richblack-900 text-white flex flex-col gap-6 items-center font-semibold'>
                <Instructor />
                <h2 className='text-xl lg:text-2xl px-4'>Reviews From Other Learners</h2>
                <ReviewSection />
            </section>

            {/****Section 4******** */}
            <Footer />

        </div>
    )
}

export default Home
