import React, { useState } from 'react'
import Spinner from '../components/common/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { resetPassword } from '../services/operations/authAPI';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    })
    const { loading } = useSelector((state) => state.auth);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData, [e.target.name]: e.target.value
        }))
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(formData.password, formData.confirmPassword, token, navigate))
    }



    return (
        <div className='px-2 md:w-10/12 mx-auto flex items-center justify-center h-[90vh] text-richblack-5'>
            {
                loading ? (<Spinner />) : (
                    <div className='flex flex-col gap-5 md:w-[450px] lg:max-w-[700px] '>
                        <h2 className='text-xl font-bold text-center '>Choose a New Password</h2>
                        <p className=' text-md text-center'>Almost done. Enter your new password</p>

                        <form onSubmit={handleOnSubmit} className='flex flex-col gap-4 '>

                            <label htmlFor="password" className='relative '>
                                <p className='text-sm'>New Password*</p>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    required
                                    placeholder='Enter your new password here'
                                    name='password'
                                    value={formData.password}
                                    onChange={handleOnChange}
                                    className='bg-richblack-900 border-2 border-richblack-400 rounded-lg px-2 py-2 mt-1  w-[100%]'
                                />
                                <div className='absolute z-[10]  bottom-[15%] right-2 text-2xl ' onClick={() => setShowNewPassword(!showNewPassword)}>
                                    {
                                        !showNewPassword ? < AiOutlineEye /> : <AiOutlineEyeInvisible />
                                    }
                                </div>
                            </label>

                            <label htmlFor="confirmPassword" className='relative'>
                                <p className='text-sm'>Confirm New Password*</p>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    placeholder='Enter your Confirm password here'
                                    name='confirmPassword'
                                    value={formData.confirmPassword}
                                    onChange={handleOnChange}
                                    className='bg-richblack-900 border-2 border-richblack-400 rounded-lg px-2 mt-1 py-2  w-[100%]'
                                />
                                <div className='absolute z-[10] bottom-[15%] right-2 text-2xl ' onClickCapture={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {
                                        !showConfirmPassword ? < AiOutlineEye /> : <AiOutlineEyeInvisible />
                                    }
                                </div>
                            </label>


                            <button type="submit" className='w-[100%]'>
                                <p className=' rounded-md bg-yellow-50 text-black hover:shadow-yellow-200 shadow-md   px-6 py-1 text-md  my-1 hover:scale-95 transition-all duration-200 '>
                                    Reset Password
                                </p>
                            </button>

                        </form>

                        <div className=' w-[100%]'>
                            <button className=' rounded-md text-white bg-richblack-800 hover:shadow-white shadow-md w-[100%]  px-6 py-1 text-md mb-2 hover:scale-95 transition-all duration-200 ' >
                                <Link to={"/login"}>
                                    Back to login
                                </Link>
                            </button>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword
