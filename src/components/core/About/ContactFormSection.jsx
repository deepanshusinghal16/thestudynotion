import React from 'react'
import ContactUsForm from '../ContactUsPage/ContactUsForm'

const ContactFormSection = () => {

  return (
    <div className='w-10/12 mx-auto flex flex-col gap-4 justify-center items-center'>
      <h2 className='text-4xl font-bold text-center'>Get in Touch</h2>
      <p className='text-center text-md text-richblack-200'>We would love to here from you. Please fill this form!</p>

      <div>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
