import React from 'react'
import { MdOutlineMessage } from 'react-icons/md';
import { GiEarthAmerica } from "react-icons/gi";
import { FiPhoneCall } from "react-icons/fi";
import ContactUsForm from '../components/core/ContactUsPage/ContactUsForm';
import ReviewSection from '../components/core/HomePage/ReviewSection';
import Footer from '../components/common/Footer';

const ContactUs = () => {
    return (
        <div className='w-full'>

            <section className='w-full'>
                <div className='text-white w-full'>
                    <div className='w-11/12 grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto my-10  '>

                        <div className='flex flex-col gap-8 bg-richblack-700 py-10 px-10 md:pl-20  md:pr-40  lg:pr-40  mx-auto  rounded-2xl w-fit  h-fit'>

                            <div className='flex flex-col gap-2'>
                                <div className='font-semibold flex gap-2 items-center'>
                                    <MdOutlineMessage size={30} />
                                    <h2 className='text-xl'>Chat on Us</h2>
                                </div>
                                <p className='text-sm text-richblack-50'>Our friendly team is here to help <br />
                                    <a href="mailto:deepanshusinghal2003@gmail.com">deepanshusinghal2003@gmail.com</a> </p>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='font-semibold flex gap-2 items-center'>
                                    <GiEarthAmerica size={30} />
                                    <h2 className='text-xl'>Visit Us</h2>
                                </div>
                                <p className='text-sm text-richblack-50'>Our friendly team is here to help <br />
                                    <a href="mailto:deepanshusinghal2003@gmail.com">deepanshusinghal2003@gmail.com</a> </p>
                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='font-semibold flex gap-2 items-center'>
                                    <FiPhoneCall size={30} />
                                    <h2 className='text-xl'>Call Us</h2>
                                </div>
                                <p className='text-sm text-richblack-50'>Our friendly team is here to help <br />
                                    <a href="mailto:deepanshusinghal2003@gmail.com">deepanshusinghal2003@gmail.com</a> </p>
                            </div>

                        </div>

                        {/* Form for Reaching out    */}
                        <div className='rounded-2xl border-2 border-richblack-5 '>

                            <div className='grid grid-cols-1 gap-6 place-items-center  pl-4 pt-6 '>
                                <h2 className='text-4xl font-bold leading-10  lg:pr-40'>Got a idea? We've got the skills. <br />   Let's team up </h2>
                                <p className='text-md '>Tell us more about yourself and what you are got in mind</p>
                                <ContactUsForm />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className='w-full flex flex-col gap-4 justify-center items-center'>
                <h2 className='text-3xl text-white font-bold'>
                    Review From Other Learners
                </h2>
                <ReviewSection />
            </section>

            <section>
                <Footer />
            </section>
        </div>
    )
}

export default ContactUs
