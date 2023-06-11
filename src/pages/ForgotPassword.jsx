import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../components/common/Spinner';
import CTAButton from '../components/core/HomePage/CTAButton';
import { getPasswordResetToken } from '../services/operations/authAPI';
const ForgotPassword = () => {

    const { loading } = useSelector((state) => state.auth);
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();

    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent));
    }

    return (
        <div className='px-2 md:w-10/12 mx-auto flex items-center justify-center mt-40 text-richblack-5'>

            {
                loading ? (<Spinner />) : (
                    <div className='flex flex-col gap-4 justify-center items-center w-full '>
                        <h2 className='text-2xl font-bold '>
                            {!emailSent ? "Reset Your Password" : "Check Your Email"}
                        </h2>
                        <p className='text-md text-center w-full  max-w-[500px] lg:max-w-[800px]'>
                            {!emailSent ? `There is no need to worry..! We will email you the instructions to reset your password.` : `We have sent reset email to ${email}`}
                        </p>

                        <form onSubmit={handleOnSubmit} className='w-full  max-w-[400px] lg:max-w-[600px]'>
                            {
                                !emailSent && (
                                    <label>
                                        <p className='mt-3 px-2 text-md'>Email Address</p>
                                        <input type="email" required name='email' value={email} onChange={(e) => setEmail(e.target.value)}
                                            placeholder='Enter your Email ' className='bg-richblack-900 border-2 border-richblack-400 rounded-lg px-2 w-full py-1 mt-1' />
                                    </label>
                                )
                            }
                            <br />
                            <button type='submit' className='w-full mt-6'>
                                <p className='w-full  rounded-md bg-yellow-50 text-black hover:shadow-yellow-200 shadow-md   px-6 py-2 text-lg my-2 hover:scale-95 transition-all duration-200 '>
                                    {
                                        !emailSent ? `Reset Password` : `Resent Email`
                                    }
                                </p>
                            </button>
                        </form>
                        <div className='w-full  max-w-[400px] lg:max-w-[600px]'>
                            <CTAButton active={false} linkto={"/login"} length={true}>
                                <p className='px-6 py-2 text-lg text-center '>
                                    Back to login
                                </p>
                            </CTAButton>
                        </div>

                    </div>
                )
            }
        </div>
    )
}

export default ForgotPassword
