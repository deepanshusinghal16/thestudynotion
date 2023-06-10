import React from 'react';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { changePassword } from '../../../../services/operations/SettingsAPI';

const UpdatePassword = () => {
    const { token } = useSelector((state) => state.auth);


    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const resetData = () => {
        setOldPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
    }


    const handleOnSubmit = (e) => {
        // if (!newPassword || !confirmNewPassword || !oldPassword) {
        //     toast.error("Please enter all fields");
        //     return;
        // }
        // if (newPassword !== confirmNewPassword) {
        //     toast.error("New Password didn't matched")
        //     return;
        // }

        changePassword(token, { oldPassword, newPassword, confirmNewPassword })
    }

    return (

        <section className='my-4 flex flex-col gap-y-4  w-full bg-richblack-800 py-4 px-4 md:px-10 rounded-lg'>
            <h2 className='text-sm px-2'>Password</h2>

            <div className=' grid grid-cols-1 gap-4'>

                <label className="w-full relative ">
                    <p className="mx-2 mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                        Old Password<sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type={showOldPassword ? "text" : "password"}
                        name="oldPassword"
                        value={oldPassword}
                        onChange={(e) => { setOldPassword(e.target.value) }}
                        // placeholder={oldPassword}
                        style={{
                            boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    {
                        <span
                            onClick={() => setShowOldPassword((prev) => !prev)}
                            className="absolute right-3 top-[50%] z-[10] cursor-pointer"
                        >
                            {showOldPassword ? (
                                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    }
                </label>

                <div className=' grid grid-cols-1 lg:grid-cols-2 gap-4'>

                    <label className="w-full relative">
                        <p className="mx-2 mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            New Password<sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showNewPassword ? "text" : "password"}
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => { setNewPassword(e.target.value) }}
                            placeholder={newPassword}
                            style={{
                                boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        {
                            <span
                                onClick={() => setShowNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[50%] z-[10] cursor-pointer"
                            >
                                {showNewPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        }
                    </label>


                    <label className="w-full relative">
                        <p className="mb-1 mx-2 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Confirm Password <sup className="text-pink-200">*</sup>
                        </p>
                        <input
                            required
                            type={showConfirmNewPassword ? "text" : "password"}
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) => { setConfirmNewPassword(e.target.value) }}
                            placeholder={confirmNewPassword}
                            style={{
                                boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        />
                        {
                            <span
                                onClick={() => setShowConfirmNewPassword((prev) => !prev)}
                                className="absolute right-3 top-[50%] z-[10] cursor-pointer"
                            >
                                {showConfirmNewPassword ? (
                                    <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                                ) : (
                                    <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                                )}
                            </span>
                        }
                    </label>

                </div>

            </div>


            <div className='flex gap-4 items-center justify-end'>
                <button
                    onClick={() => resetData()}
                    className='text-lg bg-richblack-600 text-richblack-25 px-4 py-1 rounded-2xl '>
                    Cancel
                </button>
                <button
                    onClick={() => handleOnSubmit()}
                    className='text-lg bg-yellow-25 px-4 py-1 rounded-2xl text-richblack-800'>
                    Update
                </button>
            </div>
        </section>
    )
}

export default UpdatePassword
