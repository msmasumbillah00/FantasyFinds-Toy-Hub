
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import Swal from 'sweetalert2'
import { FaGoogle, FaFacebook, FaPhone } from 'react-icons/fa';


const Login = () => {
    const { singInWithEmailPAss, setLoading, singInWithGoogle } = useContext(UserContext);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location?.state?.from?.pathname || "/";

    const handelSingin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoading(true);
        singInWithEmailPAss(email, password)
            .then(async result => {
                if (result.user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    navigate(path)
                    setLoading(false)
                    form.reset();
                }
            })
            .catch((error) => {
                if (error.message.includes("auth/invalid-credential")) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... ",
                        text: "The email or Password is Wrong",
                        footer: '<a href="#" className="label-text-alt link link-hover">Forgot password?</a>'
                    });
                }
            })

    }
    const handelsingInWithGoogle = () => {
        singInWithGoogle()
            .then(async result => {

                if (result.user) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Login Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });

                }
                await new Promise(resolve => setTimeout(resolve, 1000));

                navigate(path)
                setLoading(false)
            })
            .catch((error) => {
                if (error.message.includes("auth/invalid-credential")) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops... ",
                        text: "The email or Password is Wrong",
                        footer: '<a href="#" className="label-text-alt link link-hover">Forgot password?</a>'
                    });
                }
            })
    }

    return (
        <div>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-slate-300 shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm w-full">
                    <h2 className="text-center text-4xl font-extrabold text-gray-900 mb-6">Sign in to your account</h2>
                    <form onSubmit={handelSingin} className="space-y-4">
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
                            <p>
                                <span className="mt-4 text-sm text-gray-500">Forget Password? <Link className="">Reset</Link></span>
                            </p>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Sign In
                        </button>
                        <p>
                            <span className="mt-4 text-sm text-gray-500">New to FantacyHub ? <Link to="/register">Register</Link></span>
                        </p>
                    </form>
                    <hr className="my-6 border-t" />
                    <p className="text-center text-gray-500">Or sign in with</p>
                    <div className="flex justify-center mt-4 ">
                        <button onClick={handelsingInWithGoogle}
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

export default Login;