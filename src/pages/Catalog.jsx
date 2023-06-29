import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../components/common/Footer';
import { useState } from 'react';
import Spinner from '../components/common/Spinner';
import { categories } from '../services/api';
import { apiConnector } from '../services/apiConnector';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import CourseCard from '../components/core/Catalog/CourseCard';

const Catalog = () => {

    const [loading, setLoading] = useState(false);
    const { catalogName } = useParams();
    const [catalogPageData, setCatalogPageData] = useState({});
    const [categoryId, setCategoryId] = useState("")
    const [active, setActive] = useState(true);

    // Fetching all the categories for the corresponding categoryId
    useEffect(() => {
        const getCategories = async () => {
            setLoading(true);
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = result?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]?._id;
            setCategoryId(category_id)
            setLoading(false)
        }
        getCategories();
    }, [catalogName]);

    useEffect(() => {
        setLoading(true);
        const getCategoriesDetails = async () => {
            try {
                const result = await getCatalogPageData(categoryId);
                console.log(result)
                setCatalogPageData(result);
            }
            catch (error) {
                console.log("Unable to fetch the category related courses", error);
            }
            setLoading(false)
        }
        if (categoryId) {
            getCategoriesDetails()
        }

    }, [categoryId])


    if (loading) {
        return <Spinner />;
    }
    return (
        <div className='text-white'>
            <section className='w-full py-10 bg-richblack-800'>

                <div className='flex flex-col gap-y-2 px-4  md:w-10/12 mx-auto'>
                    <p className=' text-sm hover:opacity-70 cursor-pointer'>{`Home / Catalog / `}
                        <span className='text-yellow-200'>
                            {catalogPageData?.data?.selectedCategory?.name}
                        </span>
                    </p>
                    <p className='text-2xl text-richblack-5'>{catalogPageData?.data?.selectedCategory?.name}</p>
                    <p className='text-sm text-richblack-300'>{catalogPageData?.data?.selectedCategory?.description}</p>
                </div>

            </section>

            {/* Section 1 */}
            <section className='w-full md:w-10/12 px-4 pt-6 mx-auto flex flex-col gap-y-4'>
                <header className='text-lg font-bold'>Course to get you Started....</header>
                <div>
                    <div className='flex gap-x-6 px-4 '>
                        <p onClick={() => setActive(true)}
                            className={`${active ? "text-yellow-5 underline-offset-4 underline " : "text-richblack-5"} text-md`} > Most Popular</p>
                        <p onClick={() => setActive(false)}
                            className={`${!active ? "text-yellow-5 underline  underline-offset-4 " : "text-richblack-5"} text-md`} >New</p>
                    </div>
                    <hr className='w-[100%] text-richblack-400' />
                </div>

                <div className='w-full '>
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>

            </section>

            <hr className='w-[100%] text-richblack-400' />

            {/* Section 2 */}
            <section className='w-full md:w-10/12 px-4 py-6 mx-auto flex flex-col gap-y-4'>
                <header className='text-lg font-bold'>Top Courses
                </header>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses} />
                </div>
            </section>
            <hr className='w-[100%] text-richblack-400' />

            {/* Section 3 */}
            <section className='w-full md:w-10/12 px-4 py-10 mx-auto flex flex-col gap-y-4'>
                <header className='text-lg font-bold'>Frequently Bought Courses</header>

                <div className='py-8'>
                    <div className='grid grid-cols-1 md:grid-cols-2 place-items-center place-content-center gap-x-4 md:gap-x-10 mx-auto '>
                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0, 4).map((course, index) => (
                                <CourseCard key={index} course={course} Height={"h-[200px] md:h-[300px]"} />
                            ))
                        }
                    </div>
                </div>
            </section>


            <Footer />

        </div>
    )
}

export default Catalog
