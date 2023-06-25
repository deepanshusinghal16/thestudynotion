import React from 'react'
import CTAButton from './CTAButton';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { TypeAnimation } from 'react-type-animation';

const CodeBlocks = ({
    reverse = false, heading, subHeading, ctabtn1, ctabtn2, codeblock, codeColor
}) => {

    const section1 = () => {
        return (
            <section className=' flex flex-col gap-4 w-full my-5  lg:mx-10'>

                {heading}

                <div
                    className='text-richblack-300 text-sm sm:text-md'
                >{subHeading}
                </div>

                <div className='flex  gap-2 lg:gap-4 items-center mx-auto flex-row '>
                    <CTAButton
                        active={ctabtn1.active}
                        linkto={ctabtn1.linkto}
                    >

                        <div className='text-center text-md md:text-md lg:text-2xl py-2 px-2  font-semibold flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <HiOutlineArrowNarrowRight />

                        </div>
                    </CTAButton>

                    <CTAButton
                        active={ctabtn2.active}
                        linkto={ctabtn2.linkto}
                    >
                        <div className='text-md md:text-md lg:text-2xl py-2 px-2 font-mono font-semibold'>
                            {ctabtn2.btnText}
                        </div>

                    </CTAButton>

                </div>


            </section>
        )
    }

    const section2 = () => {
        return (
            <section className='  flex flex-row  text-md w-full    my-5  lg:mx-10  '>



                {/*Gradient Lagana h iske niche*/}
                <div className='text-center flex flex-col  text-richblack-400   font-inter font-bold '>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>1</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>2</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>3</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>4</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>5</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>6</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>7</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>8</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>9</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>10</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>11</p>
                </div>

                <div className={`w-[100%] flex flex-col gap-2 font-bold font-mono ${codeColor} lg:pr-2  text-xs`}>
                    <div className='w-[100%] '>
                        <TypeAnimation
                            sequence={[codeblock, 1000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                            wrapper="span"
                            speed={50}
                            style={{
                                whiteSpace: "pre-line",
                                display: 'inline-block',
                                fontSize: "1rem",

                            }}
                        />
                    </div>
                </div>


            </section>
        )
    }


    return (
        <div className={`grid grid-cols-1  md:grid-cols-2 my-5 lg:my-10 justify-around items-center gap-10 mx-auto   max-h-maxContent`}>

            <section className={`order-1 ${reverse ? "md:order-2" : "md:order-1"} flex flex-col gap-4 w-full my-5  lg:mx-10`}>

                {heading}

                <div
                    className='text-richblack-300 text-sm'
                >{subHeading}
                </div>

                <div className='flex  gap-2 lg:gap-4 items-center mx-auto flex-row '>
                    <CTAButton
                        active={ctabtn1.active}
                        linkto={ctabtn1.linkto}
                    >

                        <div className='text-center text-md md:text-md lg:text:lg py-2 px-2   flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <HiOutlineArrowNarrowRight />

                        </div>
                    </CTAButton>

                    <CTAButton
                        active={ctabtn2.active}
                        linkto={ctabtn2.linkto}
                    >
                        <div className='text-md md:text-md lg:text-lg py-2 px-2 mx-auto font-mono '>
                            {ctabtn2.btnText}
                        </div>

                    </CTAButton>

                </div>


            </section>


            <section className={`relative order-2 ${reverse ? "md:order-1" : "md:order-2"}   flex flex-row  text-md w-full  bg-transparent my-5  lg:mx-10 `}>

                <div className="absolute w-[40%] h-[40%] top-[25%] left-[15%] rounded-full  bg-gradient-to-br from-pink-500 to-richblack-900  border-none shadow-pink-500 shadow-2xl"></div>


                {/*Gradient Lagana h iske niche*/}
                <div className='text-center flex flex-col  text-richblack-400   font-inter font-bold backdrop-blur-3xl border-none'>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>1</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>2</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>3</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>4</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>5</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>6</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>7</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>8</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>9</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>10</p>
                    <p className='text-richblack-200 opacity-65 px-2 text-md '>11</p>
                </div>

                <div className={`w-[100%] flex flex-col gap-2 font-bold font-mono ${codeColor} lg:pr-2   backdrop-blur-3xl border-none`}>
                    <div className='w-[100%] '>
                        <TypeAnimation
                            sequence={[codeblock, 1000, ""]}
                            repeat={Infinity}
                            cursor={true}
                            omitDeletionAnimation={true}
                            wrapper="span"
                            speed={50}
                            style={{
                                whiteSpace: "pre-line",
                                display: 'inline-block',
                                fontSize: "1rem"
                            }}
                        />
                    </div>
                </div>


            </section>

        </div>
    )
}

export default CodeBlocks
