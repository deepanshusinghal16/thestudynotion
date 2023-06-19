import React, { useEffect, useState } from 'react'
import OTPInput from 'react-otp-input'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../services/operations/authAPI';
import { sendOtp } from '../services/operations/authAPI';

const VerifyEmail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { signupData, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!signupData)
            navigate("/signup");
    }, [])

    const [otp, setOtp] = useState('');
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData;

        dispatch(signUp(
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            otp,
            navigate,
        ))
    }

    return (
        <div className='w-11/12 mx-auto flex items-center justify-center text-white'>
            {
                loading ? (<Spinner />) : (
                    <div className='flex h-[90vh] flex-col justify-center gap-6'>
                        <div>
                            <h2 className='text-richblack-5 text-3xl '>Verify Email</h2>
                            <p className='text-richblack-25 text-lg'>Please enter the verification code sent on {signupData.email} </p>
                        </div>

                        <form onSubmit={handleOnSubmit} className='flex flex-col justify-center items-center'>

                            <OTPInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={6}
                                renderInput={(props) => (
                                    <input
                                        {...props}
                                        placeholder="-"
                                        style={{
                                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                        }}
                                        className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                                    />
                                )}
                                containerStyle={{
                                    justifyContent: "space-between",
                                    gap: "0 6px",
                                }}
                            />

                            <button type='submit' className='w-[100%] mt-4'>
                                <p className=' rounded-md bg-yellow-50 text-black hover:shadow-yellow-200 shadow-md   px-6 py-2 text-lg my-2 hover:scale-95 transition-all duration-200 '>
                                    Submit
                                </p>
                            </button>

                        </form>

                        <div className=' w-[100%] text-white flex justify-between'>
                            <button className='  text-white' >
                                <Link to={"/login"}>
                                    Back to login
                                </Link>
                            </button>

                            <button
                                onClick={() => dispatch(sendOtp(signupData.email, navigate))}>
                                <p>
                                    Resend it
                                </p>
                            </button>
                        </div>

                    </div>
                )
            }
        </div>
    )
}
export default VerifyEmail
