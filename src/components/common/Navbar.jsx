import React, { useEffect, useState } from 'react'
import BigLogo from '../../assets/Logo/Logo-Full-Light.png';
import SmallLogo from "../../assets/Logo/Logo-Small-Light.png";
import { Link, matchPath } from 'react-router-dom';
import { NavbarLinks } from '../.././data/navbar-links';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from "react-icons/ai";
import CTAButton from '../core/HomePage/CTAButton';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import { ACCOUNT_TYPE } from '../../utils/constants';
import { HiOutlineUserCircle } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Fade } from 'hamburger-react';
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI';
import { CgMenuGridO } from "react-icons/cg";
import { RxCross1 } from "react-icons/rx"


const Navbar = () => {

    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    // This is all for the hambuger without login
    // ********************************
    const [showMenu, setShowMenu] = useState(false);
    const toggleMenu = () => {
        !showMenu ? setNavIcon(RxCross1) : setNavIcon(CgMenuGridO)
        setShowMenu(!showMenu)
    };
    // ********************************


    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const result = await fetchCourseCategories();
            setSubLinks(result);
        }
        catch (error) {
            //console.log("Can't fetch the categories at this moment");
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchSubLinks();
    }, []);
    const [navIcon, setNavIcon] = useState(CgMenuGridO);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    }

    return (
        <div
            className=' flex items-center justify-center  border-b-2  border-richblack-700  w-full '>
            <div className='w-full  md:w-10/12 flex items-center   justify-between xl:justify-center    flex-row px-2 xl:grid grid-cols-3'>


                <Link to={"/"}   >
                    <img src={BigLogo} alt="StudyNotion" className=' my-2 object-cover w-[80%] lg:w-[50%] md:mx-2' loading='lazy' />
                    {/* <img src={SmallLogo} alt="StudyNotion" className='sm:hidden my-2 object-cover w-[80%] lg:w-[50%] md:mx-2' loading='lazy' /> */}
                </Link>



                <div className='flex gap-1 flex-row-reverse  xl:flex-row items-center justify-center xl:justify-between xl:col-span-2 '>

                    <div>
                        {
                            (
                                <nav>
                                    <div className='hidden xl:block'>
                                        <ul className='flex gap-4 text-richblack-25'>
                                            {
                                                NavbarLinks.map((link, index) => (
                                                    <li key={index}
                                                        className=''>
                                                        {
                                                            link.title === "Catalog" ? (
                                                                <div key={index} className='text-richblack-25 text-sm font-semibold flex items-center gap-1 hover relative group z-[10]'>
                                                                    <div>{link.title}</div>
                                                                    <IoIosArrowDown />



                                                                    <div className='invisible  absolute left-[50%] py-2 translate-x-[-52%] translate-y-[25px] top-[50%] items-center flex flex-col gap-1 rounded-md bg-richblack-5   text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px]'>
                                                                        <div className='absolute left-[50%] top-0  translate-x-[80%] translate-y-[-45%] h-6 w-6   rotate-45 rounded bg-richblack-5 z-[-1]'>
                                                                        </div>

                                                                        {
                                                                            subLinks.length ? (
                                                                                subLinks.map((subLink, index) => (
                                                                                    <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index} className='group/edit w-full flex items-center justify-center hover:bg-richblack-200  rounded-lg
                                                                                     transition-all duration-300'>

                                                                                        <div className='pt-1 text-xs flex flex-col w-max  text-center font-normal     max-w-maxContent '>{subLink.name}
                                                                                            <div className=' w-[150%]  h-[2px]    opacity-0 translate-x-[100%] group-hover/edit:opacity-100 group-hover/edit:translate-x-[-15%]  bg-pink-300 transition-all duration-500    ' > </div>
                                                                                        </div>

                                                                                    </Link>
                                                                                ))
                                                                            ) : (
                                                                                <div className='group/edit w-full flex items-center justify-center hover:bg-richblack-200  rounded-lg
                                                                                transition-all duration-300'>

                                                                                    <div className='pt-2 text-sm flex flex-col w-max  text-center font-normal     max-w-maxContent '>Loading...
                                                                                        <div className=' w-[150%]  h-[2px]    opacity-0 translate-x-[100%] group-hover/edit:opacity-100 group-hover/edit:translate-x-[-15%]  bg-pink-300 transition-all duration-500    ' > </div>
                                                                                    </div>

                                                                                </div>)
                                                                        }

                                                                    </div>



                                                                </div>
                                                            ) : (
                                                                <Link to={link.path}>
                                                                        <div className={`${matchRoute(link.path) ? `text-yellow-25` : `text-richblack-25`}
                                                    text-sm font-semibold `} >
                                                                        {link.title}
                                                                        </div>
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
                                        <button className='text-2xl flex items-center text-white' onClick={() => toggleMenu()}   >
                                            {navIcon}
                                        </button>

                                        <div
                                            className={`bg-gradient-to-tr from-richblack-900  transition-all duration-200 absolute top-[3.5rem] w-screen h-[calc(100vh-3.5rem)] bg-transparent z-[1000] backdrop-blur-[10px] text-richblack-25 text-lg  backdrop-opacity-100
                                        ${showMenu ? ' right-0 left-0 inset-y-10' : ' -translate-y-[100%]   hidden'}
                `}>

                                            <div className='flex flex-col items-center gap-6 justify-center mt-20'>
                                                {
                                                    NavbarLinks.map((link, index) => (
                                                        <div key={index}

                                                            className=''>
                                                            {
                                                                link.title === "Catalog" ? (
                                                                    <div key={index} className='text-richblack-25 text-lg font-semibold flex items-center gap-1 hover relative group z-[10] mx-auto'>
                                                                        <div>{link.title}</div>
                                                                        <IoIosArrowDown />



                                                                        <div className='invisible absolute left-[50%] translate-x-[-50%] translate-y-[30%] top-[50%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 lg:w-[200px]'>


                                                                            {
                                                                                !loading &&
                                                                                    subLinks.length ? (
                                                                                    subLinks.map((subLink, index) => (
                                                                                        <Link to={`/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`} key={index} className='group/edit w-full flex items-center justify-center hover:bg-richblack-200  rounded-lg
                                                                                    transition-all duration-300 ' onClick={toggleMenu}>
                                                                                            <div className='text-center font-normal text-black w-[150px] group-hover/edit'>{subLink.name}</div>
                                                                                        </Link>
                                                                                    ))
                                                                                ) : (<div>Loading...</div>)
                                                                            }

                                                                        </div>



                                                                    </div>
                                                                ) : (
                                                                    <Link to={link.path} onClick={toggleMenu}>
                                                                        <div className={`${matchRoute(link.path) ? `text-yellow-25` : `text-richblack-25`}
                                                    text-lg font-semibold `} >
                                                                                {link.title}
                                                                        </div>
                                                                    </Link>
                                                                )
                                                            }

                                                        </div>
                                                    )
                                                    )
                                                }
                                            </div>



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
                                    <div className='px-6 py-1 font-edu-sa text-sm text-richblack-200 tracking-wider hidden lg:block'>
                                        LogIn
                                    </div>
                                    <HiOutlineUserCircle className='text-[32px] block lg:hidden' />

                                </CTAButton>
                            )
                        }
                        {
                            token === null && (
                                <div className='hidden lg:block'>
                                    <CTAButton active={false} linkto={"/signup"} >
                                        <div className='px-6 py-1 font-edu-sa text-sm text-richblack-200 tracking-wider'>
                                            SignUp
                                        </div>
                                    </CTAButton>
                                </div>
                            )
                        }

                        <div className='flex gap-1  items-center justify-between text-xs'>
                            {/* {
                                user && user.accountType === ACCOUNT_TYPE.STUDENT && (
                                    <Link to={"/dashboard/cart"} className='relative' >
                                        <AiOutlineShoppingCart className='text-xl text-white  mr-1' />
                                        {
                                            totalItems > 0 && (
                                                <span className='absolute -top-2 -right-0  bg-richblack-500 rounded-full p-1 aspect-square w-4 h-4 flex items-center justify-center'>
                                                    <div className='text-richblack-5 font-semibold text-xs'>
                                                        {
                                                            totalItems <= 9 ? (<span>
                                                                {totalItems}
                                                            </span>) : (<span>
                                                                9+
                                                            </span>)
                                                        }
                                                    </div>
                                                </span>
                                            )
                                        }
                                    </Link>
                                )
                            } */}
                            {
                                token !== null && <ProfileDropDown />
                            }

                        </div>

                    </div>

                </div>

            </div>
        </div >
    )
}

export default Navbar
