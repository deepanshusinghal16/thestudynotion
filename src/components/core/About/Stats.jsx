import React from 'react'

const stats = [
    { count: "5K+", label: "Active Students" },
    { count: "10+", label: "Mentors" },
    { count: "200+", label: "Courses" },
    { count: "50+", label: "Awards" },
];

const Stats = () => {

    return (
        <div className='grid   grid-cols-2 md:grid-cols-4  py-10  mx-auto '>
            {
                stats.map((data, index) => {
                    return (
                        <div key={index} className='flex flex-col  items-center justify-center py-4 px-4 '>

                            <h2 className='text-2xl font-semibold'>{data.count}</h2>
                            <p className='text-lg  text-center'>{data.label}</p>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Stats
