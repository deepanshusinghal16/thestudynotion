import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn';
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const { total, cart } = useSelector((state) => state.cart);
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        buyCourse(token, courses, user, navigate, dispatch)
    }

    return (
        <div className='py-6 px-4  w-fit  rounded-md bg-richblack-700 flex flex-col gap-2 mx-auto'>
            <p className='px-6 text-sm text-yellow-25'>Total</p>
            <div className='flex items-baseline flex-row justify-start'>
                <div className='px-6 text-md flex gap-1'> ₹ {total * 0.9}</div>
                <div className=' text-xs  text-richblack-200 line-through'>Rs{total}</div>
            </div>
            <IconBtn
                text={"Buy Now"}
                customClasses={"bg-yellow-25 text-sm text-richblack-700  py-1 rounded-2xl w-full text-center"}
                onClickFxn={() => handleBuyCourse()}
            />

        </div>
    )
}

export default RenderTotalAmount
