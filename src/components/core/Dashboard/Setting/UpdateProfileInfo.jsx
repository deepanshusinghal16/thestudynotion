import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { updateProfile } from '../../../../services/operations/SettingsAPI';
import { useNavigate } from 'react-router-dom';

const UpdateProfileInfo = () => {
    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [updatedData, setUpdatedData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.additionalDetails?.gender,
        dob: user.additionalDetails?.dob,
        contactNumber: user.additionalDetails?.contactNumber,
        about: user.additionalDetails?.about,
    });

    function resetData() {
        setUpdatedData({
            firstName: user.firstName,
            lastName: user.lastName,
            gender: user.additionalDetails.gender,
            dob: user.additionalDetails.dob,
            contactNumber: user.additionalDetails.contactNumber,
            about: user.additionalDetails.about,
        })
    }

    const [validContact, setValidContact] = useState(true);



    const handleOnChange = (e) => {
        if (e.target.name === 'gender') {
            setUpdatedData((prev) => ({
                ...prev,
                gender: e.target.value
            }));
        } else {
            setUpdatedData((prev) => ({
                ...prev,
                [e.target.name]: e.target.value
            }));
        }

        // Other logic related to the contactNumber field
        if (e.target.name === 'contactNumber') {
            const val = e.target.value;
            setValidContact(val.length <= 13 && val.length >= 8);
        }
    };

    const handleOnSubmit = () => {
        if (!validContact) {
            toast.error('Please enter a valid contact number')
            return;
        }
        dispatch(updateProfile(token, updatedData));
    }


    return (
        <section className='my-4 flex flex-col gap-y-4  w-full bg-richblack-800 py-4 px-3 md:px-10 rounded-lg'>
            <h2 className='text-sm'>Profile Information</h2>

            <form className=' grid grid-cols-1 md:grid-cols-2 gap-4'>

                <label className="w-full">
                    <p className="mx-2 mb-1 text-[0.775rem] leading-[1.375rem] text-richblack-5">
                        First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        disabled={true}
                        type="text"
                        name="firstName"
                        value={updatedData.firstName}
                        onChange={handleOnChange}
                        placeholder={user.firstName}
                        style={{
                            boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 opacity-50"
                    />
                </label>

                <label className="w-full">
                    <p className="mb-1 mx-2 text-[0.775rem] leading-[1.375rem] text-richblack-5">
                        Last Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        disabled={true}
                        type="text"
                        name="lastName"
                        value={updatedData.lastName}
                        onChange={handleOnChange}
                        placeholder={user.lastName}
                        style={{
                            boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 opacity-50"
                    />
                </label>

                <label className="w-full">
                    <p className="mb-1 mx-1 text-[0.775rem] leading-[1.375rem] text-richblack-5">
                        Date Of Birth <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="date"
                        name="dob"
                        onChange={handleOnChange}
                        value={updatedData.dob}
                        style={{
                            boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px]  text-richblack-5"
                    />
                </label>

                <label className="w-full">
                    <p className="mb-1 mx-1 text-[0.775rem] leading-[1.375rem] text-richblack-5">
                        Gender  <sup className="text-pink-200">*</sup>
                    </p>
                    <select
                        style={{
                            boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                        name="gender"
                        value={updatedData.gender}
                        onChange={handleOnChange}
                    >
                        <option disabled value={"null"}>Choose a gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>

                    </select>

                </label>

                <label className="w-full relative">
                    <p className="mb-1 text-[0.775rem] leading-[1.375rem] text-richblack-5">
                        Contact Number <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="number"
                        name="contactNumber"
                        maxLength="13"
                        value={updatedData.contactNumber}
                        onChange={handleOnChange}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                    />
                    <span className={`text-yellow-25 text-xs ${validContact ? "opacity-0" : "opacity-100"}`}>Enter a valid Contact number</span>
                </label>

                <label className="w-full">
                    <p className="mb-1 mx-1 text-[0.775rem] leading-[1.375rem] text-richblack-5">
                        About <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                        required
                        type="text"
                        name="about"
                        value={updatedData.about}
                        onChange={handleOnChange}
                        style={{
                            boxShadow: "inset 0px -1px 2px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 "
                    />
                </label>
            </form>

            <div className='flex gap-4 items-center justify-end'>
                <button
                    onClick={() => resetData()}
                    className='text-sm bg-richblack-600 text-richblack-25 px-4 py-1 rounded-2xl '>
                    Cancel
                </button>
                <button
                    type='submit'
                    onClick={() => handleOnSubmit()}
                    className='text-sm bg-yellow-25 px-4 py-1 rounded-2xl  text-richblack-800'>
                    Update
                </button>
            </div>

        </section>
    )
}

export default UpdateProfileInfo
