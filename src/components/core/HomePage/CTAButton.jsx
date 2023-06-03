import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({ children, active, linkto = null, length = false }) => {
    return (
        <Link to={linkto}>
            <div
                className={`   rounded-md   ${length === false ? "w-fit" : "w-full px-2"}
                ${active ? `bg-yellow-50 text-black hover:shadow-yellow-200 shadow-md`
                        : `text-white bg-richblack-800 hover:shadow-white shadow-md`}
                    hover:scale-95 transition-all duration-200 
                    `}>
                {children}
            </div>
        </Link>
    )
}

export default CTAButton
