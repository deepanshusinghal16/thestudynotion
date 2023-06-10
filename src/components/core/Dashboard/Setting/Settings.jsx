import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfileInfo from './UpdateProfileInfo';
import UpdatePassword from './UpdatePassword';
import UpdateProfileImage from './UpdateProfileImage';
import DeleteAccount from './DeleteAccount';



const Settings = () => {
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();


    return (
        <div className='text-white  flex flex-col gap-4 px-2 md:w-10/12 mx-auto'>

            <header className='my-4'>
                <h2 className='text-3xl text-center  '>Edit Profile</h2>
            </header>

            <UpdateProfileImage />

            <UpdateProfileInfo />

            <UpdatePassword />

            <DeleteAccount />
        </div>
    )
}

export default Settings
