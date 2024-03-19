import { FaGoogle, FaFacebook, FaPhone } from 'react-icons/fa';

import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import Swal from 'sweetalert2'


const Register = () => {
    const navigate = useNavigate();
    const { createUserWithEmailPAss, setLoading } = useContext(UserContext)
    const handelEmailSingIn = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoading(true);
        createUserWithEmailPAss(email, password)
            .then(async result => {
                const user = result.user;
                if (user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "User Created sussessfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    form.reset()
                }
                setLoading(false)
                await new Promise(resolve => setTimeout(resolve, 1000));

                navigate("/")
            })
            .catch(error => {
                console.log(error)
            })

    }
    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full">
                    <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-12">Please Register </h2>
                    <form onSubmit={handelEmailSingIn} className="space-y-4">
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Email Address"
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                placeholder="Password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                        <p>
                            <span className="mt-4 text-sm text-gray-500">Already have an account? <Link to="/login">Login </Link></span>
                        </p>
                    </form>
                    <hr className="my-6 border-t" />
                    <p className="text-center text-gray-500">Or sign in with</p>
                    <div className="flex justify-center mt-4 ">
                        <button
                            className="flex btn border-none  btn-circle items-center justify-center mr-2 bg-white hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FaGoogle className=" text-4xl text-indigo-600" />
                        </button>
                        <button
                            className="flex btn border-none  btn-circle items-center justify-center mr-2 bg-white hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FaFacebook className=" text-4xl text-blue-600" />
                        </button>
                        <button
                            className="flex btn border-none  btn-circle items-center justify-center  bg-white hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <FaPhone className=" text-2xl text-blue-400" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;