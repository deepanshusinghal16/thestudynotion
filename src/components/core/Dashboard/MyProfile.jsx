import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { BiEdit } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const MyProfile = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.profile);


    function formatDate(dateString) {
        const months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        const parts = dateString.split('.');
        const year = parts[0];
        const month = months[parseInt(parts[1], 10) - 1];
        const day = parts[2];
        return `${day} ${month} ${year}`;
    }
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    return (
        <div className='text-white  flex flex-col gap-4 px-2 md:w-10/12 mx-auto'>
            <div className='my-2 md:my-4'>
                <h2 className='text-2xl text-center  '>My Profile</h2>
            </div>

            <div className='my-2 md:my-4 flex justify-between items-center w-full bg-richblack-800 py-4 px-4 md:px-10 rounded-lg'>
                <div className='flex gap-1 md:gap-6 w-full mr-4'>
                    <img src={user?.image} alt="" className='w-16 aspect-square rounded-full shadow-white shadow-md' />
                    <div className='flex flex-col gap-2'>
                        <h2 className='text-lg font-bold'>{user?.firstName} {" "} {user?.lastName}</h2>
                        <p className='text-xs text-richblack-300 '>{user?.email}</p>
                    </div>
                </div>
                <div className='ml-2'>
                    <button
                        onClick={() => navigate("/dashboard/settings")}
                        className='bg-yellow-25 px-4 py-1 rounded-2xl text-richblack-800'>
                        <div className='flex gap-2 items-center justify-center '>
                            <p>Edit</p>
                            <BiEdit />
                        </div>
                    </button>
                </div>
            </div>


            <div className='my-4 flex justify-between items-center w-full bg-richblack-800 py-4 px-4 md:px-10 rounded-lg'>
                <div className='flex flex-col gap-2 md:gap-6 w-full'>
                    <p className='text-lg font-semibold'>About</p>
                    <p className='text-richblack-300 text-sm pr-6'>
                        {user?.additionalDetails?.about ?? "Write something about yourself"}
                    </p>

                </div>
                <div>
                    <button
                        onClick={() => navigate("/dashboard/settings")}
                        className='bg-yellow-25 px-4 py-1 rounded-2xl text-richblack-800'>
                        <div className='flex gap-2 items-center justify-center'>
                            <p>Edit</p>
                            <BiEdit />
                        </div>
                    </button>
                </div>
            </div>


            <div className='my-4 flex justify-between items-center w-full bg-richblack-800 py-4 px-4 md:px-10 rounded-lg'>
                <div className='grid grid-cols-1 md:grid-cols-2  gap-y-4 md:gap-y-6 place-items-between  max-w-maxContent'>

                    <div className=' grid grid-cols-2  col-span-1 md:col-span-2 pr-6' >
                        <div className='flex flex-col gap-1'>
                            <p className='text-sm text-richblack-500'>First Name</p>
                            <p className='text-md'>
                                {user?.firstName}
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <p className='text-sm text-richblack-500'>Last Name</p>
                            <p className='text-md'>
                                {user?.lastName}
                            </p>
                        </div>
                    </div>

                    <div className='flex flex-col gap-1 col-span-2'>
                        <p className='text-sm text-richblack-500'>Email</p>
                        <p className='text-md'>
                            {user?.email}
                        </p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-sm text-richblack-500'>Phone Number</p>
                        <p className='text-md'>
                            {user?.additionalDetails?.contactNumber ? user?.additionalDetails?.contactNumber : "Add Contact Number"}
                        </p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-sm text-richblack-500'>Gender</p>
                        <p className='text-md'>
                            {user?.additionalDetails?.gender ? capitalize(user?.additionalDetails?.gender) : "Add Gender"}
                        </p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <p className='text-sm text-richblack-500'>Date Of Birth</p>
                        <p className='text-md'>
                            {user?.additionalDetails?.dob ? formatDate(user?.additionalDetails?.dob) : "Add your DOB"}
                        </p>
                    </div>

                </div>
                <div className='ml-2'>
                    <button
                        onClick={() => navigate("/dashboard/settings")}
                        className='bg-yellow-25 px-4 py-1 rounded-2xl text-richblack-800'>
                        <div className='flex gap-2 items-center '>
                            <p>Edit</p>
                            <BiEdit />
                        </div>
                    </button>
                </div>
            </div>

        </div>
    )
}

export default MyProfile
