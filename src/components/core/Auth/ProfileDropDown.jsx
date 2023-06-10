import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
import { AiOutlineLogout } from "react-icons/ai";


const ProfileDropDown = () => {
  const { user } = useSelector((state) => state.profile);
  // console.log(user)

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // useOnClickOutside(ref, () => setOpen(false));
  if (!user) return null;

  return (
    <div className='text-white flex gap-2'>

      <div className='w-[30px]'>

        <img src={user.image} className=' aspect-square rounded-full my-2' alt='ProfileImage' />
      </div>
      <button onClick={() => dispatch(logout(navigate))} >
        <AiOutlineLogout size={24} />
      </button>


    </div>
  )
}

export default ProfileDropDown
