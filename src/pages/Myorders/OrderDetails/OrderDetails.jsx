import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdMessage } from "react-icons/md";
import { FaAngleRight } from "react-icons/fa";
import Swal from "sweetalert2";



const OrderDetails = () => {
    const params = useParams();
    const [data, setData] = useState([]);
    const [totalCost, setTotalCost] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalItemsCost, setTotalItemsCost] = useState(0);
    const [shippingFee, setShippinFee] = useState(4.60);



    useEffect(() => {
        fetch(`http://localhost:5000/orders/${params.id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setData(data)
                setTotalItemsCost((data.quntity * data.price))
                setTotalItems(data.quntity)
                setTotalCost((data.quntity * data.price) + 4.60)
            })
    }, [])
    console.log(params.id)
    return (
        <div>
            <div className=" max-w-[800px] mx-auto m-2 shadow-sm mt-5 border rounded-md relative flex items-center p-3 ">
                <div className="flex flex-col w-full">
                    <div className=" flex w-full justify-between">
                        <Link onClick={(event) => {
                            event.stopPropagation();
                        }} to={`/productDetails/${data.products_id}`}><div className=" flex items-center">
                                <img className="max-h-[150px] rounded-md" src={data.image} alt="" />
                            </div></Link>
                        <div className=" w-full flex flex-col items-center justify-between">

                            <div className=" ps-4  mx-4">
                                <h4 className="font-bold">{data.title}</h4>
                                <p className="font-semibold bg-slate-50 w-fit p-2 text-slate-500">{data.colorFamily}</p>
                            </div>
                            <div className="  ps-4 ms-6 flex items-center justify-between w-full  lg:w-[350px]">
                                <p className="font-bold text-2xl">$<span className="price">{data.price}</span></p>
                                <div className="">
                                    <div className="flex items-center ">
                                        <span className="text-xl font-bold me-4" name="quentity">Qty: {data.quntity}</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <hr className="my-4" />
                    <div className="flex  flex-col  w-full ms-auto   max-w-[1000px] md:justify-between">
                        <p className="flex items-center justify-center">
                            <MdMessage className="me-1 text-red-600" />
                            <span className="pb-1"> Chat with Seller</span>
                            <FaAngleRight className="ms-4" />

                            {/* Total (inclusive of tax, if any)({data.quntity} items): <span className="text-2xl font-bold ms-3">${(ele.price * ele.quntity) + 4.60}</span> */}
                        </p>
                    </div>
                </div>

            </div>

            <div className="p-3" >

                <div className="mt-10 mx-auto shadow-md rounded-lg border ms-auto max-w-[800px] p-4">
                    <div className="flex justify-between">
                        <p>Merchendise Subtotal ({totalItems} items)</p>
                        <h4 className="text-xl font-bold">${totalItemsCost}</h4>
                    </div>
                    <div className="flex justify-between border-b">
                        <p>Shipping Fee Subtotal </p>
                        <h4 className="text-xl font-bold">${shippingFee}</h4>
                    </div>
                    <div className="flex justify-between">
                        <p><span className="text-xl font-bold">Total:-  </span><span>(SST included, where applicable)</span></p>
                        <h2 className="text-2xl font-bold">${totalCost}</h2>
                    </div>
                </div>
            </div>
            <div className="p-3 mb-10" >

                <div className=" mx-auto shadow-md rounded-lg border ms-auto max-w-[800px] p-4">
                    <div className="flex justify-between">
                        <p className="font-bold">Order No. </p>
                        <div className="flex items-center">
                            <h4 className=" font-bold text-slate-600">{data._id} </h4>
                            <button className="btn btn-link btn-sm no-underline"
                                onClick={() => {
                                    navigator.clipboard.writeText(data._id)
                                    const Toast = Swal.mixin({
                                        toast: true,
                                        position: "top-end",
                                        showConfirmButton: false,
                                        timer: 3000,
                                        timerProgressBar: true,
                                        didOpen: (toast) => {
                                            toast.onmouseenter = Swal.stopTimer;
                                            toast.onmouseleave = Swal.resumeTimer;
                                        }
                                    });
                                    Toast.fire({
                                        icon: "success",
                                        title: "coppied to clipboard"
                                    });
                                }}
                            >coppy</button>
                        </div>
                    </div>
                    <div className="flex justify-between ">
                        <p>More Details:</p>
                        <FaAngleRight className="" />
                    </div>
                    <div className="flex justify-between">
                        <p><span className="">Place on  </span></p>
                        <h2 className=" font-semibold text-slate-500">{data.date_time}</h2>
                    </div>
                </div>
            </div>
            <div className="mb-5">
                <h3 className="text-center text-2xl font-bold">Similer Products</h3>
            </div>
        </div>
    );
};

export default OrderDetails;