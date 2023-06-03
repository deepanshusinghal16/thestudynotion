import React, { useEffect, useState } from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../.././data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import CTAButton from '../core/HomePage/CTAButton';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    const profile = useSelector((state) => state.profile);
    console.log("Profile is " ,profile);

    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch (error) {
            console.log("Cant fetch the categories at this moment", error);
        }
    }

    useEffect(() => {
        fetchSubLinks();
        console.log(subLinks);
    }, []);


    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className=' flex items-center justify-center border-b-2  border-richblack-700 '>
            <div className='w-11/12  flex max-w-maxContent items-center justify-around mx-10 flex-row'>

                <Link to={"/"}  >
                    <img src={Logo} alt="StudyNotion" className='my-2 w-[80%] mx-2' loading='lazy' />
                </Link>


                <nav>
                    <ul className='flex gap-4 text-richblack-25'>
                        {
                            NavbarLinks.map((link, index) => (
                                <li key={index}
                                    className=''>
                                    {
                                        link.title === "Catalog" ? (
                                            <div key={index} className='text-richblack-25 text-lg font-semibold flex items-center gap-1 hover relative group'>
                                                <p>{link.title}</p>
                                                <IoIosArrowDown />

                                                <div className='invisible absolute left-[50%] top-[120%] flex flex-row rounded-md  bg-richblack-5 text-richblack-900  opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100 lg:w-[300%] h-[50px] -translate-x-[50%] '>

                                                    <div className='invisible absolute left-[70%] top-0 h-10 w-10 rounded-sm  rotate-45  bg-richblack-5 opacity-0 transition-all duration-200 group-hover:visible
                                                group-hover:opacity-100  -translate-x-[100%] '>
                                                    </div>
                                                </div>


                                                {
                                                    subLinks.length > 0 ? (
                                                        subLinks.map((sublink, index) => {
                                                            console.log(sublink.name);
                                                            return (
                                                                <Link to={sublink.link} key={index}>
                                                                    <p className='text-xl hover:font-semibold text-black'>
                                                                        {subLinks.title}
                                                                    </p>
                                                                </Link>
                                                            )
                                                        })

                                                    ) : (<div>Hello jee  </div>)
                                                }



                                            </div>
                                        ) : (
                                            <Link to={link.path}>
                                                <p className={`${matchRoute(link.path) ? `text-yellow-25` : `text-richblack-25`} 
                                                text-lg font-semibold `} >
                                                    {link.title}
                                                </p>
                                            </Link>
                                        )
                                    }

                                </li>
                            )
                            )
                        }

                    </ul>
                </nav>


                <div className='flex gap-4 items-center justify-between'>
                    {
                        user && user.accountType !== "Instructor" && (
                            <Link to={"/dashboard/cart"} className='relative' >
                                <AiOutlineShoppingCart className='scale-150' />
                                {
                                    totalItems > 0 && (
                                        <span className='absolute -top-4 -right-4  bg-richblack-500 rounded-full p-1 aspect-square h-6 flex items-center justify-center'>
                                            <p className='text-richblack-5 font-semibold '>
                                                {
                                                    totalItems <= 9 ? (<span>
                                                        {totalItems}
                                                    </span>) : (<span>
                                                        9+
                                                    </span>)
                                                }
                                            </p>
                                        </span>
                                    )
                                }
                            </Link>
                        )
                    }

                    {
                        token === null && (
                            <CTAButton active={false} linkto={"/login"} >
                                <p className='px-6 py-1 font-edu-sa text-lg text-richblack-200 tracking-wider'>
                                    LogIn
                                </p>
                            </CTAButton>
                        )
                    }
                    {
                        token === null && (
                            <CTAButton active={false} linkto={"/signup"} >
                                <p className='px-6 py-1 font-edu-sa text-lg text-richblack-200 tracking-wider'>
                                    SignUp
                                </p>
                            </CTAButton>
                        )
                    }

                    {
                        token !== null && <ProfileDropDown />
                    }

                </div>

            </div>
        </div >
    )
}

export default Navbar
