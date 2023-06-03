import React, { useState } from 'react'
import { HomePageExplore } from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import Card from './Card';

const tabs = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
];

const ExploreMore = () => {

    const [currentTab, setCurrentTab] = useState(tabs[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMycard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }



    return (
        <div className='flex flex-col gap-4 mx-auto items-center my-10'>

            <h2 className='text-4xl font-semibold  text-center'>
                Unlock the
                <HighlightText text={" Power of Code"} />
            </h2>

            <p className='text-md  text-justify text-richblack-300'>
                Learn to build anything you can imagine
            </p>

            <div className='bg-richblack-800 flex flex-row justify-between  py-2 rounded-full shadow-richblack-500 shadow-sm items-center mx-auto max-w-maxContent text-white px-3 gap-4'>
                {
                    tabs.map((tab, index) => {
                        return (
                            <div className={`text-center ${tab === currentTab ? `bg-richblack-900 text-richblack-5 font-medium shadow-richblack-400 shadow-inner`
                                : `text-richblack-200`} rounded-full transition-all duration-200 cursor-pointer
                                 hover:bg-richblack-900 hover:text-richblack-5 px-4 py-2 hover:shadow-richblack-400 hover:shadow-inner`
                            }
                                key={index}
                                onClick={() => setMycard(tab)}
                            >
                                {tab}
                            </div>
                        )
                    })
                }
            </div>

            

                <div className='flex flex-col lg:flex-row gap-4 justify-between my-5  '>
                    {
                        courses.map((course, index) => {
                            return (
                                <Card course={course} currentCard={currentCard} setCurrentCard={setCurrentCard} key={index} />
                            )
                        })
                    }
                </div>

           
        </div>
    )
}

export default ExploreMore
