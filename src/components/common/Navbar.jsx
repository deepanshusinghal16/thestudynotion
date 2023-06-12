import React, { useEffect, useState } from 'react'
import BigLogo from '../../assets/Logo/Logo-Full-Light.png';
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../.././data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import CTAButton from '../core/HomePage/CTAButton';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { apiConnector } from '../../services/apiConnector';
import { categories } from '../../services/api';
import { ACCOUNT_TYPE } from '../../utils/constants';
import Hamburger from '../core/Dashboard/SideBar/Hamburger';
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Fade } from 'hamburger-react';


const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);

    // This is all for the hambuger without login
    // ********************************
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => setShowMenu(!showMenu);
    // ********************************


    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            setSubLinks(result.data.data);
        }
        catch (error) {
            console.log("Can't fetch the categories at this moment", error);
        }
    }

    useEffect(() => {
        fetchSubLinks();
    }, []);


    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div className=' flex items-center justify-center  border-b-2  border-richblack-700  w-full '>
            <div className='w-full md:w-10/12 flex items-center   justify-between xl:justify-center    flex-row px-2 xl:grid grid-cols-3'>


                <Link to={"/"}   >
                    <img src={BigLogo} alt="StudyNotion" className='my-2 object-cover w-[80%] lg:w-[50%] md:mx-2' loading='lazy' />
                </Link>


                <div className='flex gap-4 flex-row-reverse  xl:flex-row items-center justify-center xl:justify-between xl:col-span-2 '>

                    <div>
                        {
                            token === null && (
                                <nav>
                                    <div className='hidden xl:block'>
                                        <ul className='flex gap-4 text-richblack-25'>
                                            {
                                                NavbarLinks.map((link, index) => (
                                                    <li key={index}
                                                        className=''>
                                                        {
                                                            link.title === "Catalog" ? (
                                                                <div key={index} className='text-richblack-25 text-lg font-semibold flex items-center gap-1 hover relative group z-[10]'>
                                                                    <p>{link.title}</p>
                                                                    <IoIosArrowDown />



                                                                    <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px]'>
                                                                        <div className='absolute left-[50%] top-0  translate-x-[80%] translate-y-[-45%] h-6 w-6  rotate-45 rounded bg-richblack-5'>
                                                                        </div>

                                                                        {
                                                                            subLinks.length ? (
                                                                                subLinks.map((subLink, index) => (
                                                                                    <Link to={`${subLink.link}`} key={index}>
                                                                                        <p className='text-center font-normal'>{subLink.name}</p>
                                                                                    </Link>
                                                                                ))
                                                                            ) : (<div></div>)
                                                                        }

                                                                    </div>



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
                                    </div>

                                    <div className='block xl:hidden'>
                                        <Fade color="white" classList="hamburger-menu" toggled={showMenu} onToggle={toggleMenu} />

                                        <div
                                            className={`bg-gradient-to-tr from-richblack-900 to-richblack-00 transition-all duration-200 absolute top-[3.5rem] w-screen h-[calc(100vh-3.5rem)] bg-transparent z-[1000] backdrop-blur-[10px] text-richblack-25 text-xl flex flex-col items-center gap-6 justify-center backdrop-opacity-100
                                        ${showMenu ? ' right-0 left-0 inset-y-0' : ' -translate-y-[100%]   hidden'}
                `}>

                                            {
                                                NavbarLinks.map((link, index) => (
                                                    <p key={index}
                                                        onClick={toggleMenu}
                                                        className=''>
                                                        {
                                                            link.title === "Catalog" ? (
                                                                <div key={index} className='text-richblack-25 text-lg font-semibold flex items-center gap-1 hover relative group z-[10]'>
                                                                    <p>{link.title}</p>
                                                                    <IoIosArrowDown />



                                                                    <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px]'>
                                                                        <div className='absolute left-[50%] top-0  translate-x-[80%] translate-y-[-45%] h-6 w-6  rotate-45 rounded bg-richblack-5'>
                                                                        </div>

                                                                        {
                                                                            subLinks.length ? (
                                                                                subLinks.map((subLink, index) => (
                                                                                    <Link to={`${subLink.link}`} key={index}>
                                                                                        <p className='text-center font-normal'>{subLink.name}</p>
                                                                                    </Link>
                                                                                ))
                                                                            ) : (<div></div>)
                                                                        }

                                                                    </div>



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

                                                    </p>
                                                )
                                                )
                                            }



                                        </div>

                                    </div>
                                </nav>
                            )
                        }
                    </div>

                    <div className='flex gap-2 '>
                        {
                            token === null && (
                                <CTAButton active={false} linkto={"/login"} >
                                    <p className='px-6 py-1 font-edu-sa text-lg text-richblack-200 tracking-wider hidden lg:block'>
                                        LogIn
                                    </p>
                                    <HiOutlineUserCircle className='text-[32px] block lg:hidden' />

                                </CTAButton>
                            )
                        }
                        {
                            token === null && (
                                <div className='hidden lg:block'>
                                    <CTAButton active={false} linkto={"/signup"} >
                                        <p className='px-6 py-1 font-edu-sa text-lg text-richblack-200 tracking-wider'>
                                            SignUp
                                        </p>
                                    </CTAButton>
                                </div>
                            )
                        }

                        <div className='flex gap-4  items-center justify-between'>
                            {
                                user && user.accountType === ACCOUNT_TYPE.STUDENT && (
                                    <Link to={"/dashboard/cart"} className='relative' >
                                        <AiOutlineShoppingCart size={26} className='text-white' />
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
                                token !== null && <ProfileDropDown />
                            }


                            {
                                token !== null && <Hamburger />
                            }
                        </div>

                    </div>

                </div>

            </div>
        </div >
    )
}

export default Navbar
