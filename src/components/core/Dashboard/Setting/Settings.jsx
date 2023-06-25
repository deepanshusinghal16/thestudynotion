import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfileInfo from './UpdateProfileInfo';
import UpdatePassword from './UpdatePassword';
import UpdateProfileImage from './UpdateProfileImage';
import DeleteAccount from './DeleteAccount';



const Settings = () => {
    const [user, setUser] = useState(useSelector((state) => state.profile))
    const dispatch = useDispatch();


    return (
        <div className='text-white  flex flex-col gap-4 px-2 py-2 md:w-10/12 mx-auto'>

            <header className='py-2'>
                <h2 className='text-xl text-center  '>Edit Profile</h2>
            </header>

            <UpdateProfileImage />

            <UpdateProfileInfo />

            <UpdatePassword />

            <DeleteAccount />
        </div>
    )
}

export default Settings
