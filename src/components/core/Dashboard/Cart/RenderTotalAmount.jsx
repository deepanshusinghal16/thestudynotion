import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';

const RenderTotalAmount = () => {

    const { total, cart } = useSelector((state) => state.cart);

    const handleBuyCourse = () => {
        const courses = cart.map((course, index) => course._id);
        console.log("Buying courses", courses);

        //Payment gateway integrate krna h iske baad
    }

    return (
        <div className='py-2 px-4 bg-richblack-700'>
            <p className='text-sm'>Total</p>
            <div className='text-lg'>Rs {total}</div>
            <div className='text-md  line-through'>Rs{total * 0.75}</div>
            {/* <Link className="bg-yellow-25 text-lg text-richblack-700 px-4 py-1 rounded-2xl" to={"/dashboard/enrolled-courses"}>
                Buy Now
            </Link> */}
            <IconBtn
                text={"Buy Now"}
                customClasses={"bg-yellow-25 text-lg text-richblack-700  py-1 rounded-2xl w-full text-center"}
                onClickFxn={handleBuyCourse}
            />

        </div>
    )
}

export default RenderTotalAmount
