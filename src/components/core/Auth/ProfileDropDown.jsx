import React from 'react'
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import useOnClickOutside from "../../../hooks/useOnClickOutside"
import ConfirmationModal from '../../common/ConfirmationModal';


const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);


  const [confirmationModal, setComformationModal] = useState(null);

  useOnClickOutside(ref, () => setOpen(false));
  if (!user) return null;

  return (
    <>
      <button className=' relative ' onClick={() => setOpen(!open)}>

        <div className="flex items-center">
          <img src={user?.image} alt={`profile-${user?.firstName}`}
            className="aspect-square w-6 rounded-full object-cover"
          />
          <AiOutlineCaretDown className="text-xs text-richblack-100 ml-1" />
        </div>

        {open && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-[118%] right-0 z-[1000] divide-y-[1px] divide-richblack-700 overflow-hidden rounded-md border-[1px] border-richblack-700 bg-richblack-800"
            ref={ref}
          >
            <Link to="/dashboard/my-profile" onClick={() => setOpen(false)}>
              <div className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
                <VscDashboard className="text-lg" />
                Dashboard
              </div>
            </Link>
            {/* <div
            onClick={() => {
              dispatch(logout(navigate))
              setOpen(false)
            }}
            className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>  */}

            <button
              onClick={() => {
                setComformationModal({
                  text1: "Are you sure?",
                  text2: "You will be logged out of your Account",
                  btn1Text: "Logout",
                  btn2Text: "Cancel",
                  btn1Handler: () => dispatch(logout(navigate)),
                  btn2Handler: () => setComformationModal(null),
                });
                setOpen(false)
              }}
              className="flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
            >

              <VscSignOut className='text-lg' />
              <span >LogOut</span>

            </button>




          </div>
        )}
      </button>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default ProfileDropDown
