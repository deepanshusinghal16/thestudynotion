import React from 'react';
import { Fade } from 'hamburger-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, matchPath, useLocation } from 'react-router-dom';
import Spinner from '../../../common/Spinner';
import { VscSignOut } from 'react-icons/vsc';
import { sidebarLinks } from '../../../../data/dashboard-links';
import * as Icons from 'react-icons/vsc';

const Hamburger = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname)
    }

    const [show, setShow] = useState(false);

    if (profileLoading || authLoading) {
        return <Spinner />;
    }

    const toggle = () => setShow(!show);

    return (
        <>
            <div className="block lg:hidden">
                <Fade color="white" toggled={show} onToggle={toggle} size={20} />
            </div>

            <div
                className={`transition-all duration-200 absolute top-[3rem] w-[100vw]     h-[calc(100vh-3rem)] bg-transparent z-[1000] backdrop-blur-[10px] text-richblack-25 text-xl  flex flex-col items-center gap-6 justify-center backdrop-opacity-100
            ${show ? 'right-0 left-0  inset-y-0' : ' translate-x-[100%] -translate-y-[100%] hidden'}
            `}
            >

                {
                    sidebarLinks.map((link) => {
                        if (link.type && link.type !== user?.accountType) return null;

                        const Icon = Icons[link.icon];


                        return (
                            <React.Fragment key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={`relative ${matchRoute(link.path) ? 'bg-yellow-200 text-richblack-700 scale-105' : 'bg-opacity-0'} rounded-xl mx-4 px-4 transition-all duration-200 group`}
                                    onClick={toggle}
                                >
                                    <div className="flex items-center gap-4">
                                        <Icon className="text-lg" />
                                        <span className="text-lg">{link.name}</span>
                                    </div>
                                </NavLink>
                            </React.Fragment>
                        );
                    })
                }

                {/* //now setting  */}
                <NavLink
                    to={"dashboard/settings"}
                    className={`relative ${matchRoute("dashboard/settings") ? 'bg-yellow-200 text-richblack-700 scale-105' : 'bg-opacity-0'} rounded-xl mx-4 px-4 transition-all duration-200 group`}
                    onClick={toggle}
                >
                    <div className="flex items-center gap-4">
                        <VscSignOut className="text-xl" />
                        <span className="text-lg px-2 tracking-wider">Settings</span>
                    </div>
                </NavLink>


            </div>
        </>
    )
};

export default Hamburger;
