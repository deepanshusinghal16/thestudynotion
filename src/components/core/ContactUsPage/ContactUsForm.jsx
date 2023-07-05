import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import CountryCode from '../../../data/countrycode.json'
import { apiConnector } from "../../../services/apiConnector"
import { contactusEndpoint } from "../../../services/api"
import '../../../App.css';

const ContactUsForm = () => {
    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log(data)
        try {
            setLoading(true);
            const res = await apiConnector(
                "POST",
                contactusEndpoint.CONTACT_US_API,
                data
            )

            const response = { status: "OK" };
            //console.log("Response of the API :", response);
            setLoading(false);
            toast.success("Message sent");

        } catch (e) {
            //console.log("Error calling the API :", e);
            toast.error("Not send the message");
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstname: "",
                lastname: "",
                message: "",
                phoneNo: "",
                countrycode: "",
            })
        }
    }, [isSubmitSuccessful, reset])
    return (
        <form onSubmit={handleSubmit(submitContactForm)} className='flex flex-col gap-8 px-2 my-10 mr-2 w-fit'>

            {/* name input */}
            <div className='flex  flex-col sm:flex-row justify-between items-center  gap-4 md:gap-10'>

                {/* firstname */}
                <div className='relative w-full'>
                    <label htmlFor='firstname' >First Name<sup className='text-pink-100'>*</sup> </label>
                    <input
                        type="text"
                        name="firstname"
                        placeholder='First Name'
                        id='firstname'
                        {...register("firstname", { required: true })}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 px-2 py-2 text-richblack-5"
                    />
                    {
                        errors.firstname && (
                            <div className='text-xs w-full absolute bottom-0  translate-y-[120%] text-yellow-100 left-2'> Please enter your first name</div>
                        )
                    }
                </div>

                {/* lastname */}
                <div className='w-full'>
                    <label htmlFor='lastname'>Last Name<sup className='text-pink-100'>*</sup></label>
                    <input
                        type="text"
                        name="lastname"
                        placeholder='Last Name'
                        id='lastname'
                        {...register("lastname")}
                        style={{
                            boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                        }}
                        className="w-full rounded-[0.5rem] bg-richblack-800 px-2 py-2 text-richblack-5"
                    />
                </div>

            </div>


            {/* Email Input */}
            <div className=' relative'>
                <label htmlFor="email">Email Address<sup className='text-pink-100'>*</sup></label>
                <input
                    type="email"
                    id='email'
                    name='email'
                    placeholder='Enter your email address'
                    {...register('email', { required: true })}
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 px-2 py-2 text-richblack-5"
                />
                {
                    errors.email && (
                        <span className='text-xs w-full absolute bottom-0  translate-y-[120%] text-yellow-100 left-2'>Please enter your email</span>)
                }
            </div>


            {/* Phone Input */}
            <div className='flex flex-col gap-1 '>
                <label htmlFor="phoneNo">Phone Number<sup className='text-pink-100'>*</sup></label>
                <div className='flex flex-row gap-4 items-center justify-between'>
                    {/* Drop Down */}
                    <div className='max-w-[25%]'>
                        <select
                            name="dropdown"
                            id="dropdown"
                            {...register("countrycode", { required: true })}
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            placeholder='+91'
                            className="w-full rounded-[0.5rem] bg-richblack-800 px-2 py-2 text-richblack-5"
                        >
                            {
                                CountryCode.map((element, index) => {
                                    return (
                                        <option
                                            value={element.code}
                                            key={index}

                                        >
                                            {element.code} - {element.country}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    {/* Phone number field */}
                    <div className='w-full relative'>
                        <input
                            type="number"
                            name='phoneNo'
                            id='phoneNo'
                            placeholder='9876543210'
                            style={{
                                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                            }}
                            className="w-full rounded-[0.5rem] bg-richblack-800  px-2 py-2 text-richblack-5"
                            {...register("phoneNo", {

                                required: { value: true, message: 'Please enter a phone number' },
                                maxLength: { value: 10, message: "Invalid Phone Number" },
                                minLength: { value: 8, message: "Invalid Phone Number" }
                            })}
                        />
                        {
                            errors.phoneNo && (
                                <span className='text-xs w-full absolute bottom-0  translate-y-[120%] text-yellow-100 left-2'>{errors.phoneNo.message}</span>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* Message Input */}
            <div className=' relative'>
                <label htmlFor="message">Enter your Message<sup className='text-pink-100'>*</sup></label>
                <textarea
                    type="text"
                    name='message'
                    id='message'
                    placeholder='Enter your Message'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className="w-full rounded-[0.5rem] bg-richblack-800 px-2 py-2 text-richblack-5"
                    {...register("message", { required: true })}
                />
                {
                    errors.message && (
                        <span className='text-xs w-full absolute bottom-0  translate-y-[100%] text-yellow-100 left-2'>Please enter your message</span>)
                }
            </div>

            {/* submit button */}
            <button type="submit" className='w-full  bg-yellow-50 my-2 text-black hover:shadow-yellow-200 shadow-md  transition-all duration-200     rounded-md hover:scale-105'>
                <p className=' py-2  text-lg text-center  tracking-wide'>
                    {
                        loading ? "Sending..." : "Send Message"
                    }
                </p>
            </button>

        </form>


    )
}

export default ContactUsForm
