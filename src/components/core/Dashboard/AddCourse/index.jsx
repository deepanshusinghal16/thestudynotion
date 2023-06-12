import Instructions from "./Instructions";
import RenderSteps from "./RenderSteps";


export default function AddCourse() {
    return (
        <div className="text-white md:w-10/12 px-2 mx-auto mt-10">

            <div className="flex flex-col xl:flex-row gap-4 w-full ">

                <div className="flex flex-col gap-4 w-full items-center ">
                    <h2 className="text-2xl text-richblack-25">Add Course</h2>
                    <div className="w-full"><RenderSteps /></div>
                </div>

                <div className="">
                    <Instructions />
                </div>
            </div>


        </div>
    )
};