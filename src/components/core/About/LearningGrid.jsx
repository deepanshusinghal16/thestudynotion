import React from 'react';
import HighlightText from '../HomePage/HighlightText';
import CTAButton from '../HomePage/CTAButton';
const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: "Anyone, Anywhere",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 3,
        heading: "Certification",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description:
            "Studynotion partners with more than 275+ leading universities and companies to bring",
    },
];

const LearningGrid = () => {
    return (
        <div className=' grid mx-auto grid-cols-1 lg:grid-cols-4 my-10'>
            {
                LearningGridArray.map((card, index) => {
                    return (
                        <div
                            className={`
                            ${index === 0 && `lg:col-span-2`}
                            ${card.order % 2 === 1 ? "bg-richblack-700" : card.order !== -1 ? "bg-richblack-800" : "bg-transparent"}
                            ${card.order === 3 && "lg:col-start-2"}
                            py-4 px-4`}
                            key={index}>
                            {
                                card.order < 0 ?
                                    (
                                        <div className='flex flex-col gap-4'>
                                            <div className='text-2xl font-semibold'>
                                                <h2>{card.heading}</h2>
                                                <HighlightText text={card.highlightText} />
                                            </div>

                                            <p className='md:pr-10 text-sm md:text-md  '>
                                                {card.description}
                                            </p>

                                            <CTAButton active={true} linkto={card.BtnLink} >
                                                <p className='px-8 py-2 text-lg '>{card.BtnText}</p>
                                            </CTAButton>

                                        </div>
                                    ) : (
                                        <div className='mx-2 my-2 flex flex-col gap-4 md:h-[100px] lg:h-[200px] justify-around'>
                                            <h2 className='text-xl font-semibold'>{card.heading}</h2>
                                            <p className='text-md'>{card.description}</p>
                                        </div>
                                    )
                            }

                        </div>
                    )
                })
            }
        </div>
    )
}

export default LearningGrid
