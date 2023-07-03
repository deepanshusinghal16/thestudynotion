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

            <section className=''>
                <div className='text-white w-full'>
                    <div className='md:w-10/12 px-2 grid grid-cols-1 lg:grid-cols-2 gap-10 mx-auto my-10  '>
                        {/* md:pl-20  md:pr-40  lg:pr-40  */}
                        <div className='max-w-[500px] bg-richblack-700 rounded-xl h-fit   flex items-center justify-center' >
                            <div className='flex flex-col gap-8  py-6   mx-auto  h-fit w-fit  '>

                                <div className='flex flex-col gap-1'>
                                    <div className='font-semibold flex gap-2 items-center'>
                                        <MdOutlineMessage className='text-xl' />
                                        <h2 className='text-lg' >Chat on Us</h2>
                                    </div>
                                    <p className='text-xs text-richblack-200 ml-4'>Our friendly team is here to help <br />
                                        <a href="mailto:deepanshusinghal2003@gmail.com">deepanshusinghal2003@gmail.com</a> </p>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <div className='font-semibold flex gap-2 items-center'>
                                        <GiEarthAmerica className='text-xl' />
                                        <h2 className='text-lg'>Visit Us</h2>
                                    </div>
                                    <p className='text-xs ml-4 text-richblack-200'>Our friendly team is here to help <br />
                                        <a href="mailto:deepanshusinghal2003@gmail.com">deepanshusinghal2003@gmail.com</a> </p>
                                </div>

                                <div className='flex flex-col gap-1'>
                                    <div className='font-semibold flex gap-2 items-center'>
                                        <FiPhoneCall className='text-xl' />
                                        <h2 className='text-lg'>Call Us</h2>
                                    </div>
                                    <p className='text-xs ml-4 text-richblack-200'>Our friendly team is here to help <br />
                                        <a href="mailto:deepanshusinghal2003@gmail.com">deepanshusinghal2003@gmail.com</a> </p>
                                </div>

                            </div>
                        </div>

                        {/* Form for Reaching out    */}
                        <div className='rounded-xl border-2 border-richblack-5  '>

                            <div className='grid grid-cols-1 gap-6 place-items-center  px-2 pt-6 '>
                                <h2 className='text-2xl font-semibold  text-center  '>Got a idea? We've got the skills.   Let's team up </h2>
                                <p className='text-sm text-center text-richblack-200 '>Tell us more about yourself and what you are got in mind</p>
                                <ContactUsForm />
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <section className='px-2 md:w-10/12 mx-auto max-w-maxContent bg-richblack-900 text-white flex flex-col gap-6 items-center font-semibold'>
                <h2 className='text-xl lg:text-2xl px-4'>Reviews From Other Learners</h2>
                <ReviewSection />
            </section>

            <section>
                <Footer />
            </section>
        </div>
    )
}

export default ContactUs
