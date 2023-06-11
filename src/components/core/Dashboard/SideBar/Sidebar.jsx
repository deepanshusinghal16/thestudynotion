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

const Sidebar = () => {
    const { user, loading: profileLoading } = useSelector((state) => state.profile);
    const { loading: authLoading } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal, setComformationModal] = useState(null);

    if (profileLoading || authLoading) {
        return (<Spinner />);

    }
    return (
        <div className='text-white'>
            <div className='flex flex-col gap-4 lg:min-w-[200px] border-r-[1px] border-richblack-700 min-h-[calc(100vh-3.5rem)] '>

                <div className='flex flex-col gap-4 my-4 '>
                    {
                        sidebarLinks.map((link) => {
                            if (link.type && link.type !== user?.accountType) return null;
                            return (
                                <SidebarLink link={link} iconName={link.icon} key={link.id} />
                            )
                        })
                    }
                </div>
                <hr className='my-2  bg-richblack-500 ' />
                <div className='flex flex-col  mx-2'>
                    <SidebarLink link={{ name: "Setting", path: "dashboard/settings" }} iconName="VscSettingsGear" />

                    <button
                        onClick={() => setComformationModal({
                            text1: "Are you sure?",
                            text2: "You will be logged out of your Account",
                            btn1Text: "Logout",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setComformationModal(null),
                        })}
                        className='text-richblack-300 mx-4'
                    >

                        <div className='flex gap-4 items-center text-richblack-5   my-2 '>
                            <VscSignOut className='text-lg' />
                            <span className='text-lg'>LogOut</span>

                        </div>

                    </button>

                </div>
            </div>

            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </div >
    )
}

export default Sidebar
