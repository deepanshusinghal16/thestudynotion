import React from 'react'
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({ link, iconName }) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <NavLink
            to={link.path}
            // onClick={}
            className={` relative ${matchRoute(link.path) ? "bg-yellow-200 text-richblack-700 scale-105" : "bg-opacity-0"} rounded-xl mx-4 px-1
                         transition-all duration-200 group`}
        >

            <span className={`absolute -left-2 top-0 h-full bg-yellow-100 w-[0.2rem]  ${matchRoute(link.path) ? "opacity-100" : " opacity-0"}`}></span>

            <div className='flex items-center gap-4'>
                <Icon className="text-lg" />
                <span className='text-lg '>
                    {link.name}
                </span>
            </div>

        </NavLink>

    )
}

export default SidebarLink
