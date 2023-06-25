import React from 'react'
import ContactUsForm from '../ContactUsPage/ContactUsForm'

const ContactFormSection = () => {

  return (
    <div className='md:w-10/12 px-2 mx-auto flex flex-col gap-2 justify-center items-center'>
      <h2 className='text-2xl font-bold text-center'>Get in Touch</h2>
      <p className='text-center text-md text-richblack-200'>We would love to here from you. Please fill this form!</p>

      <div className='mx-auto'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
