import React, { useEffect } from 'react'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import { Link, matchPath } from 'react-router-dom'
import {NavbarLinks} from "../../data/navbar-links"
import { useLocation } from 'react-router-dom'
import { BsChevronDown } from "react-icons/bs"
import { useSelector } from 'react-redux'
import {AiOutlineShoppingCart, AiOutlineMenu} from "react-icons/ai"
import ProfileDropDown from '../core/HomePage/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiconnector'
import { categories } from '../../services/apis'
import { useState } from 'react'
import { ACCOUNT_TYPE } from '../../utils/constants'
import {IoIosArrowDropdownCircle} from "react-icons/io"

// const subLinks = [
//     {
//         title: "python",
//         link:"/catalog/python"
//     },
//     {
//         title: "web dev",
//         link:"/catalog/web-development"
//     },
// ];


function Navbar() {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation()
  
    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)

  
    useEffect(() => {
      ;(async () => {
        setLoading(true)
        try {
          const res = await apiConnector("GET", categories.CATEGORIES_API)
          setSubLinks(res.data.data)
        } catch (error) {
          console.log("Could not fetch Categories.", error)
        }
        setLoading(false)
      })()
    }, [])
  
    // console.log("sub links", subLinks)
    // console.log("sub links Length", subLinks.length)
  
    const matchRoute = (route) => {
      return matchPath({ path: route }, location.pathname)
    }
  
    return (
      <div
        className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
          location.pathname !== "/" ? "bg-richblack-800" : ""
        } transition-all duration-200`}
      >
        <div className="flex w-11/12 max-w-maxContent items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Logo" width={160} height={32} loading="lazy" />
          </Link>
          {/* Navigation links */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <>
                      <div
                        className={`group relative flex cursor-pointer items-center gap-1 ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                          {loading ? (
                            <p className="text-center">Loading...</p>
                          ) : subLinks.length > 0 ? (
                            <>
                              {subLinks
                                ?.map((subLink, i) => (
                                    <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    key={i}
                                  >
                                    <p>{subLink.name}</p>
                                  </Link>
                                    
                                ))}
                            </>
                          )
                          : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          {/* Login / Signup / Dashboard */}
          <div className="hidden items-center gap-x-4 md:flex">
            {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                {totalItems > 0 && (
                  <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
            {token === null && (
              <Link to="/login">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
              <Link to="/signup">
                <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                  Sign up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropDown />}
          </div>
          <button className="mr-4 md:hidden">
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
          </button>
        </div>
      </div>
    )
  }


// const Navbar = () => {
//     console.log("Printing base url: ",process.env.REACT_APP_BASE_URL);
//     const {token} = useSelector( (state) => state.auth );
//     const {user} = useSelector( (state) => state.profile );
//     const {totalItems} = useSelector( (state) => state.cart )
//     const location = useLocation();

//     const [subLinks, setSubLinks]  = useState([]);
//     const [loading, setLoading] = useState(false)

//     useEffect(() => {
//         ;(async () => {
//           setLoading(true)
//           try {
//             const res = await apiConnector("GET", categories.CATEGORIES_API)
//             setSubLinks(res.data.data)
//           } catch (error) {
//             console.log("Could not fetch Categories.", error)
//           }
//           setLoading(false)
//         })()
//       }, [])


//     const matchRoute = (route) => {
//         return matchPath({path:route}, location.pathname);
//     }

//   return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
//       <div className='flex w-11/12 max-w-maxContent items-center justify-between'>
//         {/* Image */}
//       <Link to="/">
//         <img src={logo} width={160} height={42} loading='lazy'/>
//       </Link>

//       {/* Nav Links */}
//       <nav>
//         <ul className='flex gap-x-6 text-richblack-25'>
//         {
//             NavbarLinks.map( (link, index) => (
//                  <li key={index}>
//                     {
//                         link.title === "Catalog" ? (
//                             <div className='relative flex items-center gap-2 group'>
//                                 <p>{link.title}</p>
//                                 <IoIosArrowDropdownCircle/>

//                                 <div className='invisible absolute left-[50%]
//                                     translate-x-[-50%] translate-y-[80%]
//                                  top-[50%]
//                                 flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900
//                                 opacity-0 transition-all duration-200 group-hover:visible
//                                 group-hover:opacity-100 lg:w-[300px] z-10'>

//                                     <div className='absolute left-[50%] top-0
//                                     translate-x-[80%]
//                                     translate-y-[-45%] h-6 w-6 rotate-45 rounded bg-richblack-5'>
//                                     </div>

//                                     {
//                                         subLinks.length ? (
//                                                 subLinks.map( (subLink, index) => (
//                                                     <Link to={`${subLink.link}`} key={index}>
//                                                         <p>{subLink.title}</p>
//                                                     </Link>
//                                                 ) )
//                                         ) : (<div></div>)
//                                     }

//                                 </div>


//                             </div>

//                         ) : (
//                             <Link to={link?.path}>
//                                 <p className={`${ matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
//                                     {link.title}
//                                 </p>
                                
//                             </Link>
//                         )
//                     }
//                 </li>
//             ) )
//         }

//         </ul>
//       </nav>


//         {/* Login/SignUp/Dashboard */}
//         <div className='flex gap-x-4 items-center'>

//             {
//                 user && user?.accountType != "Instructor" && (
//                     <Link to="/dashboard/cart" className='relative'>
//                         <AiOutlineShoppingCart />
//                         {
//                             totalItems > 0 && (
//                                 <span>
//                                     {totalItems}
//                                 </span>
//                             )
//                         }
//                     </Link>
//                 )
//             }
//             {
//                 token === null && (
//                     <Link to="/login">
//                         <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                             Log in
//                         </button>
//                     </Link>
//                 )
//             }
//             {
//                 token === null && (
//                     <Link to="/signup">
//                         <button  className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                             Sign Up
//                         </button>
//                     </Link>
//                 )
//             }
//             {
//                 token !== null && <ProfileDropDown />
//             }
//         </div>


//       </div>
//     </div>
//   )
// }

export default Navbar








// import React from 'react'
// import logo from '../../assets/Logo/Logo-Full-Light.png'
// import { Link, matchPath, useSearchParams } from 'react-router-dom'
// import {NavbarLinks} from '../../data/navbar-links'
// import { useLocation } from 'react-router-dom'
// import { useSelector } from 'react-redux'
// import { LuShoppingCart } from "react-icons/lu";
// import ProfileDropDown from '../core/HomePage/Auth/ProfileDropDown'
// import { apiConnector } from '../../services/apiconnector'
// import { categories } from '../../services/apis'
// import { useState, useEffect } from 'react'
// import { IoMdArrowDropdown } from "react-icons/io";


// const subLinks = [
//     {
//         title : "python",
//         link : "/catalog/python"
//     },
//     {
//         title : "web-dev",
//         link : "/catalog/web-development"
//     },
// ];


// const Navbar = () => {


//     const {token } = useSelector( (state) => state.auth );
//     const {user} = useSelector( (state) => state.profile );
//     const {totalItems} = useSelector( (state) => state.cart);

//     const location = useLocation();

//     // const {subLinks, setSubLinks} = useState([]);

//     // const fetchSubLinks = async() => {
//     //     try{
//     //         const result = await apiConnector("GET", categories.CATEGORIES_API);
//     //         console.log("PRINTIGN SUBLINKS RESULT: ", result);
//     //         // setSubLinks(result.data.data);
//     //     }
//     //     catch(err){
//     //         console.log("Could not fetch the category list");
//     //     }
//     // }

//     // useEffect( () => {
//     //     // fetchSubLinks();
//     // },[])


//     const matchRoute = (route) => {
//         return matchPath({path:route}, location.pathname);
//     }


//   return (
//     <div className='flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700'>
//         <div className='flex w-11/12 max-w-maxContent items-center justify-between'>

//             {/* Logo add */}
//             <Link to="/">
//                 <img src={logo} width={160} height={42} loading='lazy'/>
//             </Link>

//             {/* Nav links */}
//             <nav>
//                 <ul className='flex gap-x-6 text-richblack-25'>
//                     {
//                         NavbarLinks.map( (link, index) => (
//                             <li key={index}>
//                                 {
//                                     link.title === "Catalog" ? (
//                                         <div className='flex items-center gap-1 group cursor-pointer relative'>
//                                             <p>{link.title}</p>
//                                             <IoMdArrowDropdown/>

//                                             <div className='invisible absolute left-[50%] top-[50%] translate-x-[-30%] translate-y-[40%] flex flex-col rounded-md bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-200 group-hover:visible
//                                             group-hover:opacity-100 lg:w-[300px] z-10'>

//                                             <div className='absolute left-[50%] top-0 h-5 w-5 rotate-45 rounded-sm bg-richblack-5 translate-x-[-200%] scale-125'>
//                                             </div>

//                                             {
//                                                 subLinks.length ? (
//                                                         subLinks.map( (subLink, index) => {
//                                                             return <Link to={`${subLink.link}`} key={index}>
//                                                                 {subLink.title}
//                                                             </Link>
//                                                         } )
//                                                 ) : (<div></div>)
//                                             }

//                                             </div>


//                                         </div>
//                                     ) : (
//                                         <Link to={link?.path}>
//                                             <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
//                                                 {link.title}
//                                             </p>

//                                         </Link>
//                                     )
//                                 }
//                             </li>
//                         ))
//                     }
//                 </ul>
//             </nav>

            
//             {/* Login/Signup Dashboard */}
//             <div className='flex gap-x-4 items-center'>

//                 {
//                     user && user?.accountType !== "Instructor" && (
//                         <Link to='/dashboard/cart' className='relative'>
//                             <LuShoppingCart/>
//                             {
//                                 totalItems > 0 && (
//                                     <span>
//                                         {totalItems}
//                                     </span>
//                                 )
//                             }
//                         </Link>
//                     )
//                 }
//                 {
//                     token === null && (
//                         <Link to='/login'>
//                             <button className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                                 Log In
//                             </button>

//                         </Link>
//                     )
//                 }
//                 {
//                     token === null && (
//                         <Link to='/signup' className='border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'>
//                             <button>
//                                 Sign Up
//                             </button>
//                         </Link>
//                     )
//                 }
//                 {
//                     token !== null && <ProfileDropDown/>
//                 }

                
//             </div>


//         </div>
//     </div>
//   )
// }

// export default Navbar




