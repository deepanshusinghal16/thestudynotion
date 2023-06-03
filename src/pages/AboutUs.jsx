import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText';
import BannerImg1 from "../assets/Images/aboutus1.webp";
import BannerImg2 from "../assets/Images/aboutus2.webp";
import BannerImg3 from "../assets/Images/aboutus3.webp";
import FoundingStory from '../assets/Images/FoundingStory.png'
import Quote from '../components/core/About/Quote';
import Stats from '../components/core/About/Stats';
import LearningGrid from '../components/core/About/LearningGrid';
import ContactFormSection from '../components/core/About/ContactFormSection';
import ReviewSection from '../components/core/HomePage/ReviewSection';
import Footer from '../components/common/Footer';

const AboutUs = () => {
    return (
        <div className=' mx-auto flex flex-col gap-4 text-white'>

            <section className='w-10/12  mx-auto flex flex-col gap-4 items-center px-2'>
                <header className='text-richblack-5 text-4xl text-center mt-10 leading-10 font-bold  lg:max-w-[800px] ' >
                    Driving Innvovation in Online Education for a
                    <br />
                    <HighlightText text={"Brighter Future"} />
                </header>
                <p className='text-justify text-md  lg:max-w-[800px]'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum saepe facilis nobis, tempore totam est quod dolorem sequi facere ipsa debitis. Saepe vero maxime accusantium consectetur, id facilis repellat quisquam?
                </p>

                <div className=' grid grid-cols-1 lg:grid-cols-3 gap-2 px-2 py-2 mx-auto'>
                    <img src={BannerImg1} alt="Image" className=' object-contain hover:scale-95 transition-all duration-200 hover:shadow-lg  hover:shadow-white' />
                    <img src={BannerImg2} alt="Image" className=' object-contain hover:scale-95 transition-all duration-200 hover:shadow-lg  hover:shadow-white' />
                    <img src={BannerImg3} alt="Image" className=' object-contain hover:scale-95 transition-all duration-200 hover:shadow-lg  hover:shadow-white' />
                </div>


            </section>

            <section className='w-10/12 grid mx-auto'>
                <Quote />
            </section>


            <section className='w-10/12  grid grid-cols-1 lg:grid-cols-2  my-10   place-items-center mx-auto text-jusitify gap-20'>
               
                <div className='flex flex-col gap-4 items-center max-w-maxContent w-full'>
                    <h2 className='text-2xl font-semibold'>
                        <HighlightText text={"Our Founding Story"} />
                    </h2>
                    <p className='lg:pr-10'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis eius nostrum mollitia. Nulla, et animi. Reprehenderit placeat nam aperiam tenetur?
                    </p>
                    <p className='lg:pr-10'>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel ea dolore reiciendis iusto alias magni, illum esse delectus, voluptate quae atque, obcaecati rem! Asperiores quisquam mollitia vel natus cupiditate nesciunt?
                    </p>
                </div>
                <div className=''>
                    <img src={FoundingStory} alt="FoundingStory" />
                </div>             
                <div className='flex flex-col gap-4 items-center lg:pb-10'>
                    <h2 className='text-2xl font-semibold'>
                        <HighlightText text={"Our Vision"} />
                    </h2>
                    <p className='lg:pr-10'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi similique aspernatur eius ratione, minima corrupti omnis quibusdam maxime, tempore minus ad nihil amet optio molestias perferendis culpa. Unde ipsum velit placeat alias ipsa error impedit. Pariatur quo nesciunt assumenda asperiores.
                    </p>
                </div>
                <div className='flex flex-col gap-4 items-center lg:pb-10 '>
                    <h2 className='text-2xl font-semibold'>
                        <HighlightText text={"Our Mission"} />
                    </h2>
                    <p className='lg:pr-10'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi similique aspernatur eius ratione, minima corrupti omnis quibusdam maxime, tempore minus ad nihil amet optio molestias perferendis culpa. Unde ipsum velit placeat alias ipsa error impedit. Pariatur quo nesciunt assumenda asperiores.
                    </p>
                </div>
               

            </section>

            <section className='w-[100%] bg-richblack-600 flex items-center justify-center'>
                <div className='w-10/12 grid mx-auto'>
                    <Stats />
                </div>
            </section>

            <section className='w-[100%] flex items-center justify-center'>
                <div className='w-10/12'>
                    <LearningGrid />
                </div>
            </section>

            <section>
                <ContactFormSection />
            </section>

            <section>
                <ReviewSection />
            </section>

            <section>
                <Footer />
            </section>
        </div>
    )
}

export default AboutUs
