import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({ modalData }) => {

    return (
        <section
            data-aos="zoom-out" data-aos-duration="300"
            className='absolute w-[100vw] mx-auto inset-y-0 left-0 right-0 h-[100%] flex justify-center items-center top-0 backdrop-blur-[4px] z-[10]'>
            <div

                className='   shadow-lg shadow-richblack-200  bg-richblack-800 rounded-lg  text-white px-4 py-2'>
                <div className='flex flex-col   justify-center' >

                    <p className='px-2 py-2 text-xl font-bold'>{modalData.text1}</p>
                    <hr className='' />
                    <p className='px-2 py-1 text-sm'>{modalData.text2} </p>

                    <div className='flex  justify-between px-2 gap-2 py-4'>
                        <IconBtn
                            onClickFxn={modalData?.btn1Handler}
                            text={modalData?.btn1Text}
                            customClasses={"bg-yellow-25 py-1 text-center w-full rounded-2xl text-black"}
                        />

                        <button onClick={modalData?.btn2Handler}
                            className='bg-richblack-500 text-white w-full text-center py-1 rounded-2xl'>
                            {modalData?.btn2Text}
                        </button>
                    </div>

                </div>

            </div>
        </section>
    )
}

export default ConfirmationModal
