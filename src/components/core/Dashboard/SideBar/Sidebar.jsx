import React from 'react'
import { sidebarLinks } from '../../../../data/dashboard-links'
import { logout } from '../../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../common/Spinner'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from '../../../common/ConfirmationModal'
import { Squash as Hamburger } from 'hamburger-react'


const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setComformationModal] = useState(null);
    const [isOpen, setOpen] = useState(false)
    const toggle = () => setOpen(!isOpen);

    if (profileLoading || authLoading) {
        return (<Spinner />);

    }
    return (
        <div className={`hidden lg:block ${isOpen ? "w-[200px]" : "w-[50px] "}  transition-all duration-300 overflow-hidden text-white border-r-2 border-richblack-400 z-[10000]`}>

            <Hamburger toggled={isOpen} toggle={toggle} />

            <div className={` flex flex-col gap-4  border-r-[1px] border-richblack-700 min-h-[calc(100vh-3.5rem)] `}>

                <div className='flex flex-col gap-y-6 my-4 '>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && link.type !== user?.accountType) return null;
                            return (
                                <SidebarLink link={link} iconName={link.icon} key={link.id} isOpen={isOpen} />
                            )
                        })
                    }
                </div>
                <hr className='my-2  bg-richblack-500 ' />
                <div className='flex flex-col  '>
                    <SidebarLink link={{ name: "Settings", path: "dashboard/settings" }} iconName="VscSettingsGear" isOpen={isOpen} />

                    <button
                        onClick={() => setComformationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setComformationModal(null),
                        })}
                        className='text-richblack-300 ml-2 px-1'
                    >

                        <div className='flex gap-4 items-center text-richblack-5   my-4  '>
                            <VscSignOut className='text-2xl' />
                            <span className={`text-lg ${isOpen ? "block" : "hidden"} transition-all duration-300 `}>LogOut</span>

                        </div>

                    </button>

                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div >
    )
}

export default Sidebar
