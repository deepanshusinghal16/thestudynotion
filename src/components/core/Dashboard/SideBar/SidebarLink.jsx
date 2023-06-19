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
                         transition-all duration-300 group relative`}
        >

            <span className={`absolute -left-2 top-0 h-full bg-yellow-100 w-[0.2rem]  ${matchRoute(link.path) ? "opacity-100" : " opacity-0"}`}></span>

            <div className='flex items-center gap-4 '>
                <Icon className="text-xl" />
                <span className={`text-lg ${isOpen ? "block" : "hidden"} transition-all duration-300 `}>
                    {link.name}
                </span>
            </div>


        </NavLink>

    )
}

export default SidebarLink
