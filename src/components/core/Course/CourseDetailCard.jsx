import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlineShare } from "react-icons/hi";
import { toast } from 'react-hot-toast';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addtocart } from '../../../slices/cartSlice';

const CourseDetailCard = ({ course, setModal, handleBuyNow, showDetail }) => {

    const { user } = useSelector((state) => state.profile);
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleAddToCart = () => {
        if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
            toast.error("You are an instructor!")
            return;
        }
        if (token) {
            dispatch(addtocart(course))
        }
        else {
            setModal({
                text1: "You are not logged in..!",
                text2: "Please login to purchase the course",
                btn1Text: "Login",
                btn2Text: "Cancel",
                btn1Handler: () => navigate("/login"),
                btn2Handler: () => setModal(null)
            })
        }
    }
    const handleShare = () => {
        copy(window.location.href);
        toast.success("Link Copied to Clipboard");
    }

    return (
        <div className='w-full flex flex-col gap-3'>
            <img src={course?.thumbnail} alt="Thumbnail" className='  object-cover w-full aspect-video rounded-2xl' />
            <div className='md:hidden px-3'>
                {showDetail()}
            </div>
            <div className='px-3 font-semibold text-yellow-25 text-[1.5rem] '>₹ {course?.price}</div>
            <button
                className='bg-yellow-25 text-richblack-900 px-3 py-1 rounded-lg text-sm'
                onClick={user && course?.studentsEnrolled?.includes(user?._id) ?
                    () => navigate("/dashboard/enrolled-courses") :
                    () => handleBuyNow()}>
                {
                    user && course?.studentsEnrolled?.includes(user?._id) ? "Go to Dashboard" : " Buy Now"
                }
            </button>

            {
                (!user || !course?.studentsEnrolled?.includes(user?._id)) && (
                    <button
                        onClick={() => handleAddToCart()}
                        className='bg-richblack-900 text-richblack-5 px-3 py-1 rounded-lg text-sm'
                    >
                        Add to Cart
                    </button>
                )
            }
            <div className='px-3'>
                <p className='text-sm'>This course Includes: </p>
                <div className='flex flex-col gap-1 mt-2 mx-2 '>
                    {
                        course?.instructions?.map((item, index) => (
                            <p key={index} className='flex gap-1'>
                                <MdKeyboardArrowRight />
                                <span className='text-xs'>{item}</span>
                            </p>
                        ))
                    }
                </div>
            </div>

            {/* Share */}
            <div
                onClick={() => handleShare()}
                className='w-full mx-auto my-2 cursor-copy'>
                <button className=' mx-auto flex gap-1 text-yellow-25'>
                    <HiOutlineShare />
                    <span className='text-sm'>Share</span>
                </button>
            </div>
        </div>
    )
}

export default CourseDetailCard
