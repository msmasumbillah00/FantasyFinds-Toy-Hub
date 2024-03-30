import { BsSearch } from "react-icons/bs";
import { LuLogIn, LuLogOut } from "react-icons/lu";
import { GiArchiveRegister } from "react-icons/gi";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";

import { FaShoppingCart } from "react-icons/fa";


import logo from "../../assets/home/logo/fantasyhub.png"
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import Swal from "sweetalert2";
const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logOut, setLoading } = useContext(UserContext)
    const handelLogout = () => {
        Swal.fire({
            title: "Are you sure want to Sing out?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Sing Out!"
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Sing Out Successful!",
                            text: "Your are just log out .",
                            icon: "success"
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    })

            }
            setLoading(false)
        });

    }
    return (
        <div>
            <nav className=" shadow-md">
                <div className=" mx-auto px-6 py-6 ">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <Link to="/" className=" text-lg font-semibold"><img src={logo} alt="" className=" h-16 md:h-20 lg:h-24 rounded" /></Link>

                        </div>
                        <div className="hidden md:block ml-4">
                            <Link to="/" className=" px-3 lg:px-8 py-2 rounded-md  font-medium">Home</Link>
                            <Link to="/myToys" className=" px-3 lg:px-8 py-2 rounded-md  font-medium">My Toyes</Link>

                        </div>
                        <div className="flex">
                            <div className="items-center flex me-4">

                                <button className=" ">
                                    <BsSearch className="md:hidden me-3" />
                                    <label className="input  hidden md:flex input-bordered me-3  input-sm items-center gap-2">
                                        <input type="text" className="grow" placeholder="Search" />
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                                    </label>
                                </button>
                                <button className=" me-3">
                                    <Link to="/myToys"> <FaShoppingCart /></Link>
                                </button>
                                {
                                    !user ?
                                        <Link to={"/login"}> <LuLogIn className="text-3xl ms-5" /></Link>

                                        :
                                        <div className="dropdown dropdown-hover ">
                                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                                <div className="w-8 rounded-full">
                                                    <img alt="Tailwind CSS Navbar component" src={`${user.photoURL ? user.photoURL : "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"}`} />
                                                </div>
                                            </div>
                                            <ul tabIndex={0} className="dropdown-content -right-16 md:-right-12 xl:right-4 z-[1] menu p-2 shadow bg-base-100  w-52">
                                                <li><Link to={"/profile"} className="font-semibold"> {user?.displayName || "Profile"}</Link></li>
                                                <li className="flex"><Link to={"/orders"} className="flex justify-between"><span>Orders</span> <MdOutlineProductionQuantityLimits className=" ms-5 font-bold text-xl" /></Link></li>
                                                <li className="flex"><Link to={"/register"} className="flex justify-between"><span>Register</span> <GiArchiveRegister className=" ms-5 font-bold text-xl" /></Link></li>
                                                <li className="flex" onClick={handelLogout}><Link to={"/"} className="flex justify-between"><span>LogOut</span> <LuLogOut className=" ms-5 font-bold text-xl" /></Link></li>

                                            </ul>
                                        </div>
                                }
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                <button onClick={() => setIsOpen(!isOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                                    {isOpen ? (
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    ) : (
                                        <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {isOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link to="/" className=" block px-3 py-2 rounded-md  font-medium">Home</Link>
                            <Link to="/myToys" className=" block px-3 py-2 rounded-md  font-medium">My Toys</Link>
                            <Link to="/" className=" block px-3 py-2 rounded-md  font-medium">Services</Link>
                            <Link to="/" className=" block px-3 py-2 rounded-md  font-medium">Contact</Link>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Navigation;