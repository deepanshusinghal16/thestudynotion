import React from 'react'
import * as Icons from "react-icons/vsc";
import { NavLink, matchPath, useLocation } from 'react-router-dom';

const SidebarLink = ({ link, iconName, isOpen }) => {
    const Icon = Icons[iconName];
    const location = useLocation();

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    return (
        <NavLink
            to={link.path}
            className={`  ${matchRoute(link.path) ? "text-yellow-200  scale-105" : "  bg-opacity-0"} rounded-xl ${!isOpen ? "pl-4 " : "mx-4 "}
                         transition-all duration-500 group relative `}
        >

            <span className={`absolute -left-2 top-0 h-full bg-yellow-100 w-[0.2rem]  ${matchRoute(link.path) ? "opacity-100" : " opacity-0"}`}></span>

            <div className='flex items-center gap-4 relative group/option  '>
                <Icon className="text-2xl -translate-x-1 ml-1 overflow-visible" />
                {/* {
                    !isOpen && (
                        <span className='  font-edu-sa -translate-y-2 w-[120px] opacity-0 group-hover/option:opacity-100  transition-all duration-300 rounded-2xl bg-richblack-500 text-richblack-5 py-1 px-4  rounded-bl-none '>
                            {link.name}
                        </span>
                    )
                } */}

                <span className={`w-[200px]   text-sm ${isOpen ? " " : "opacity-0"} w-max transition-all duration-300`}>
                    {link.name}
                </span>
            </div>


        </NavLink>

    )
}

export default SidebarLink
