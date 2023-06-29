import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { Link } from "react-router-dom";

export default function Cart() {

    const { total, totalItems } = useSelector((state) => state.cart);


    return (
        <div className='flex flex-col gap-4 px-2 md:w-11/12 mx-auto text-white my-4 overflow-x-hidden'>
            <h2 className='text-xl text-center'>Your Cart</h2>

            {
                total > 0 ? (
                    <div className="mx-auto w-max">
                        <p className="text-md text-left">{totalItems} Courses in Cart</p>
                        <div className="flex flex-col flex-wrap xl:flex-row gap-6 items-start justify-between py-4">
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
