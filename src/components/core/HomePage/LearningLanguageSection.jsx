import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import knowYourProgress from '../../../assets/Images/Know_your_progress.svg';
import compareWithOthers from '../../../assets/Images/Compare_with_others.svg';
import planYourLessons from '../../../assets/Images/Plan_your_lessons.svg';

const LearningLanguageSection = () => {
    return (
        <div className='w-10/12 mx-auto max-w-maxContent my-20 '>
            <div className='flex flex-col gap-4 mx-auto justify-center items-center px-2'>

                <h2 className='text-3xl font-semibold text-center '>
                    Your swiss knife for
                    <HighlightText text={" learning any language"} />
                </h2>

                <p className='text-sm text-richblack-700 lg:max-w-[70%]  text-center opacity-75'>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi fuga delectus at ipsa, ratione placeat quas qui velit aut eveniet accusamus ducimus cumque dicta atque unde, similique odio, possimus in earum eos!
                </p>


                <div className='flex flex-col md:flex-row  items-center '>
                    <img src={knowYourProgress} alt="knowYourProgress" className='object-contain mb md:-mr-16 translate-y-8 md:translate-y-0 w-[100%] md:w-[45%] z-[1] 
                        hover:scale-95  transition-all duration-200' />
                    <img src={compareWithOthers} alt="compareWithOthers" className='object-contain md:-mr-16 -translate-y-8 md:translate-y-0 md:-ml-16 w-[100%] md:w-[45%] z-[2]
                        hover:scale-95  transition-all duration-200' />
                    <img src={planYourLessons} alt="planYourLessons" className='object-contain md:-ml-16 w-1060%] -translate-y-24 md:translate-y-0 md:w-[50%] z-[3] 
                        hover:scale-95  transition-all duration-200' />
                </div>

                <CTAButton active={true} linkto={"/signup"}>
                    <div className='text-md md:text-md lg:text-2xl py-2 px-10  font-semibold text-center'>
                        Learn More
                    </div>
                </CTAButton>


            </div>
        </div>
    )
}

export default LearningLanguageSection
