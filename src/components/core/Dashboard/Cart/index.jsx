import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { Link } from "react-router-dom";

export default function Cart() {

    const { total, totalItems } = useSelector((state) => state.cart);


    return (
        <div className='flex flex-col gap-4 w-10/12 mx-auto text-white my-4'>
            <h2 className='text-3xl text-center'>Enrolled Courses</h2>

            {
                total > 0 ? (
                    <div>
                        <p className="text-lg ">{totalItems} Courses in Cart</p>
                        <div className="flex flex-col lg:flex-row">
                            <RenderCartCourses />
                            <RenderTotalAmount />
                        </div>
                    </div>
                ) : (<div className="text-lg flex flex-col gap-4 items-center justify-center h-[50vh]">
                    <p> Your Cart is Empty.</p>

                    <Link className="bg-yellow-25 text-richblack-700 px-4 py-1 rounded-2xl" to={"/dashboard/enrolled-courses"}>
                        Enroll Now
                    </Link>
                </div>)
            }

        </div>
    )
}