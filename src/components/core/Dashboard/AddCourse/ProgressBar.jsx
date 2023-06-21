import React from 'react';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import { useSelector } from 'react-redux';

const steps = [
    {
        id: 1,
        title: "Course Info",
        icon: RiNumber1,
    },
    {
        id: 2,
        title: "Build",
        icon: RiNumber2,
    },
    {
        id: 3,
        title: "Publish",
        icon: RiNumber3,
    },
];

const StepProgressBar = () => {
    const { step } = useSelector((state) => state.course);

    return (
        <ProgressBar
            percent={step === 1 ? 0 : step === 2 ? 50 : 100}
            filledBackground="linear-gradient(to right, #fefb72, #f0bb31)"
        >

            {
                steps.map((item) => (

                    <Step transition="scale">
                        {({ accomplished }) => {
                            const IconComponent = item.icon;
                            return (
                                <>
                                    <IconComponent className='relative rounded-full p-2 translate-x-0 text-richblack-900 bg-yellow-25 w-8 sm:w-10 h-8 sm:h-10 aspect-square' />
                                    <div className=' absolute  translate-y-[100%]  w-[100px] left-0 right-0  bottom-0 text-richblack-5 text-xs sm:text-sm'>{item.title}</div>
                                </>
                            )
                        }}
                    </Step>
                ))
            }

        </ProgressBar>
    );
};

export default StepProgressBar;
