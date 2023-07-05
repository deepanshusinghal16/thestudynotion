import React, { useState } from 'react'

import { Chart, registerables } from "chart.js"
import { Pie } from "react-chartjs-2"

Chart.register(...registerables);

const InstructorChart = ({ courses }) => {

    const [currChart, setCurrChart] = useState("students");


    const getRandomColors = (numColors) => {
        const colors = [];
        for (let i = 0; i < numColors; i++) {
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)},
            ${Math.floor(Math.random() * 256)})`
            colors.push(color);
        }
        return colors;
    }



    const chartDataForStudents = {
        labels: courses.map((course) => course.courseName.split(' ')[0]),
        datasets: [
            {
                data: courses.map((course) => course.totalStudentsEnrolled),
                backgroundColor: getRandomColors(courses.length),
            }
        ]
    }



    const chartDataForIncome = {
        labels: courses.map((course) => course.courseName.split(' ')[0]),
        datasets: [
            {
                data: courses.map((course) => course.totalAmountGenerated),
                backgroundColor: getRandomColors(courses.length),
            }
        ],
    }


    //create options
    const options = {

    };


    return (
        <div className='bg-richblack-800 px-2 py-4 rounded-xl w-maxContent '>
            <p className='text-lg mb-2'>Visualise</p>
            <div className='flex gap-x-5 text-sm text-yellow-200 '>
                <button
                    className={`${currChart === "students" && "text-yellow-25 "}`}
                    onClick={() => setCurrChart("students")}
                >
                    Student
                </button>

                <button
                    className={`${currChart !== "students" && "text-yellow-25"}`}
                    onClick={() => setCurrChart("income")}
                >
                    Income
                </button>
            </div>
            <div>
                <Pie
                    data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                    options={{
                        ...options,
                        maintainAspectRatio: true,
                    }}
                />
            </div>
        </div>
    )
}

export default InstructorChart
