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
            className={`  ${matchRoute(link.path) ? "text-yellow-200  scale-100" : " bg-opacity-0"} rounded-xl ml-2${!isOpen ? " " : " "}
                         transition-all duration-500 group relative `}
        >

            <span className={`absolute -left-2 top-0 h-full bg-yellow-100 w-[0.2rem]  ${matchRoute(link.path) ? "opacity-100" : " opacity-0"}`}></span>

            <div className='flex items-center gap-4 relative group/option w-maxContent '>

                <div className='relative'>
                    <Icon size={22} className="  overflow-visible" />
                    <span className={`-right-2 inset-y-0 translate-x-[100%] absolute text-xs ${isOpen ? " " : "opacity-0"} transition-[height] w-max  duration-300`}>
                        {link.name}
                    </span>
                </div>

            </div>


        </NavLink>

    )
}

export default SidebarLink
