import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Myorders = () => {
    const { user } = useContext(UserContext);
    const [toyes, setToyes] = useState([]);
    const navigate = useNavigate()


    useEffect(() => {
        fetch(`http://localhost:5000/orders?user=${user.uid}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("car-access-token")}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                setToyes(data)

            })
    }, [toyes])

    const handelDelete = async (id) => {
        await fetch(`http://localhost:5000/orders?id=${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setToyes(toyes.filter(ele => {
                        ele._id !== id
                    }))
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your work has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }
    const seeDetails = (id) => {
        navigate("/orders/" + id)
    }

    return (
        <div className="mb-10">
            <h1 className="text-3xl  font-semibold text-center mb-8 mt-5">My Orders</h1>
            {

                toyes.map((ele, ndx) =>
                    <div key={ndx}
                        onClick={() => seeDetails(ele._id)}
                    >

                        <div className=" m-2 shadow-sm mt-5 border rounded-md relative flex items-center p-3 ">
                            <div className="flex flex-col w-full">
                                <div className=" flex w-full justify-between">
                                    <Link onClick={(event) => {
                                        event.stopPropagation();
                                    }} to={`/productDetails/${ele.products_id}`}><div className=" flex items-center">
                                            <img className="max-h-[150px] rounded-md" src={ele.image} alt="" />
                                        </div></Link>
                                    <div className=" w-full flex flex-col md:flex-row items-center justify-between">

                                        <div className=" ps-4  lg:w-6/12 mx-4">
                                            <h4 className="font-bold md:hidden ">{ele.title.slice(0, 50)}...</h4>
                                            <h4 className="font-bold hidden md:block">{ele.title}</h4>
                                            <p className="font-semibold bg-slate-50 w-fit p-2 text-slate-500">{ele.colorFamily}</p>
                                        </div>
                                        <div className="  ps-4 ms-6 flex items-center justify-between w-full md:w-[290px] lg:w-[350px]">
                                            <p className="font-bold text-2xl">$<span className="price">{ele.price}</span></p>
                                            <div className="">
                                                <div className="flex items-center ">
                                                    <span className="text-xl font-bold me-4" name="quentity">Qty: {ele.quntity}</span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                                <div className="flex items-end flex-col md:flex-row w-full ms-auto   max-w-[1000px] md:justify-between">
                                    <p className="flex items-center">
                                        Total (inclusive of tax, if any)({ele.quntity} items): <span className="text-2xl font-bold ms-3">${(ele.price * ele.quntity) + 4.60}</span>
                                    </p>
                                    <p onClick={(event) => event.stopPropagation()}>
                                        <button onClick={() => handelDelete(ele._id)} className="btn btn-sm me-3 mt-4 btn-outline">Delete</button>
                                        <button className="btn btn-sm me-3 mt-4 btn-outline btn-error">Buy Again</button>
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                )

            }
        </div>
    );
};

export default Myorders;