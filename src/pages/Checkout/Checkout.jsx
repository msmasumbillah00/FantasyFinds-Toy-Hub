import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imge1 from "../../assets/payments/pay-1.png"
import imge2 from "../../assets/payments/pay-2.png"
import imge3 from "../../assets/payments/pay-3.png"
import imge4 from "../../assets/payments/pay-4.png"
import imge5 from "../../assets/payments/pay-5.png"
import imge6 from "../../assets/payments/pay-6.png"
import imge7 from "../../assets/payments/pay-7.png"
import imge8 from "../../assets/payments/pay-8.png"
import imge9 from "../../assets/payments/pay-9.png"
import Swal from "sweetalert2";
import { UserContext } from './../../context/UserContextProvider';
import moment from 'moment';

const paymentMethods = [
    { name: "cash", img: imge1 },
    { name: "visha", img: imge2 },
    { name: "mastercard", img: imge3 },
    { name: "american", img: imge4 },
    { name: "installment", img: imge5 },
    { name: "bkash", img: imge6 },
    { name: "nagad", img: imge7 },
    { name: "dutch", img: imge8 },
    { name: "raket", img: imge9 }]

const Checkout = () => {
    const [data, setData] = useState([]);
    const [paymethode, setPaymethode] = useState("");
    const [initialData, setInitialData] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalItemsCost, setTotalItemsCost] = useState(0);
    const [shippingFee, setShippinFee] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const storData = localStorage.getItem("checkoutData");
    const parseData = JSON.parse(storData);
    // console.log(parseData)

    const buyNow = () => {
        // console.log(data, paymethode, totalCost, user);
        const date = moment().format('MMMM Do YYYY, h:mm:ss a');
        const orderdata = data.map(ele => {
            return {
                products_id: ele._id,
                image: ele.image,
                title: ele.title,
                price: ele.price,
                quntity: ele.quntity,
                colorFamily: ele.colorFamily,
                date_time: date,
                paymethode: paymethode,
                user: {
                    name: user.displayName || "",
                    uid: user.uid,
                    email: user.email
                }

            }
        })
        if (!paymethode) {
            Swal.fire({
                title: "Please Select A Payment Methode",
                text: "You Must Have to select pay methode ",
                icon: "question"
            });
            return
        }
        Swal.fire({
            title: "Are you sure To order",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Order!",
            denyButtonText: `Add to Chart`
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch('http://localhost:5000/orders', {
                    method: 'POST', // Specify the request method
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type
                    },
                    body: JSON.stringify(orderdata) // Include the data you want to send in the request body
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); // Parse the response body as JSON
                    })
                    .then(data => {
                        // Handle the data returned from the server
                        console.log(data);
                        if (data.insertedCount > 0) {
                            Swal.fire("Order!", "", "success");
                            // localStorage.removeItem("checkoutData")
                            navigate("/orders")
                        }
                        else {
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong! Please Try Again",
                            });
                        }
                    })

            } else if (result.isDenied) {
                fetch('http://localhost:5000/myToys', {
                    method: 'POST', // Specify the request method
                    headers: {
                        'Content-Type': 'application/json', // Specify the content type
                    },
                    body: JSON.stringify(orderdata) // Include the data you want to send in the request body
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json(); // Parse the response body as JSON
                    })
                    .then(data => {
                        // Handle the data returned from the server
                        console.log(data);
                        if (data.insertedCount > 0) {
                            Swal.fire({
                                position: "top-end",
                                icon: "Added Chart success",
                                title: "Your prodact has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }

                    })
                Swal.fire("Changes are not saved", "", "info");
            }
        });


    }



    const handelQuentity = (event, title) => {
        const ndx = Number(event.target.parentNode.children[1].innerText);
        // const productCost = Number(e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll("span")[0].innerText)

        if (event.target.innerText === "-" && ndx > 1) {
            event.target.parentNode.children[1].innerText = ndx - 1


        }
        if (event.target.innerText === "+") {
            event.target.parentNode.children[1].innerText = ndx + 1

        }
        const newData = updateQuentityById(parseData, title, Number(event.target.parentNode.children[1].innerText))
        // console.log(newData)
        localStorage.setItem("checkoutData", JSON.stringify(newData))



    }

    const handelDelete = async (title) => {
        const newData = parseData.filter(obj => obj.title !== title);
        localStorage.setItem("checkoutData", JSON.stringify(newData))
        if (parseData.length === 1) {
            await new Promise(resolve => setTimeout(resolve, 300));

            window.history.go(-1)
        }

    }


    const updateQuentityById = (array, title, newquentity) => {
        // console.log(array, title, newquentity)
        return array.map(obj => {
            if (obj.title === title) {
                return { ...obj, quntity: newquentity }; // Modify the name property if the id matches
            }
            return obj; // Otherwise, return the object unchanged
        });
    };

    const setinitData = async (result) => {
        const initdata = result.map(ele => {
            return { id: ele._id, price: ele.price, quntity: ele.quntity }
        })
        setInitialData(initdata)
        // console.log(initdata)

    }
    useEffect(() => {


        fetch(`http://localhost:5000/checkoutProducts`, {
            method: 'POST', // Request method
            headers: {      // Request headers
                'Content-Type': 'application/json' // Specify content type as JSON
            },
            body: storData
        })
            .then(res => res.json())
            .then(async result => {
                result.map((ele) => {
                    ele.quntity = parseData.find(obj => obj.title === ele.title).quntity;
                    ele.colorFamily = parseData.find(obj => obj.title === ele.title).colorFamily;
                })

                setData(result)
                // console.log(result)
                setinitData(result)
            })

    }, [data])


    const toFixed = (num) => {
        return Number(num.toFixed(2))
    }



    useEffect(() => {
        let initItems = 0;
        let initPrice = 0;
        // console.log(initialData)
        for (let i = 0; i < initialData.length; i++) {
            initItems = initItems + initialData[i].quntity;
            initPrice = initPrice + Number(initialData[i].quntity * initialData[i].price)
        }
        setTotalItems(toFixed(initItems))
        setTotalItemsCost(toFixed(initPrice))
        setShippinFee(toFixed(4.60 * initialData.length))
        setTotalCost(toFixed(initPrice + shippingFee))
    }, [initialData])


    // console.log(data)
    return (
        <div className="my-10 mx-2 max-w-7xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-8">Please Checkout</h1>
            <div>

                {

                    data.map((ele, ndx) => <div key={ndx}>
                        <div className=" shadow-sm mt-5 border rounded-md relative flex items-center p-3 ">
                            <button onClick={() => handelDelete(ele.title)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

                            <div className=" flex w-full justify-between">
                                <Link to={`/productDetails/${ele._id}`}><div className=" flex items-center">
                                    <img className="max-h-[150px] rounded-md" src={ele.image} alt="" />
                                </div></Link>
                                <div className=" w-full flex flex-col md:flex-row items-center justify-between">

                                    <div className=" ps-4  lg:w-6/12 mx-4">
                                        <h4 className="font-bold md:hidden">{ele.title.slice(0, 25)}...</h4>
                                        <h4 className="font-bold hidden md:block">{ele.title}</h4>
                                        <p className="font-semibold text-slate-500">{ele.colorFamily ? "colors Family: " + ele.colorFamily : "No family for this product"}</p>
                                    </div>
                                    <div className="  ps-4 ms-6 flex items-center justify-between w-full md:w-[250px] lg:w-[350px]">
                                        <p className="font-bold text-2xl">$<span className="price">{ele.price}</span></p>
                                        <div className="">
                                            <div className="flex items-center ">
                                                <div onClick={() => handelQuentity(event, ele.title)} className=" flex justify-between w-fit items-center text-xl   px-8">
                                                    <button className="w-12 p-3 font-serif font-bold text-left">-</button>
                                                    <span name="quentity">{ele.quntity}</span>
                                                    <button className="w-12 p-3 font-serif font-bold text-right">+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                        <div className="flex justify-end mb-10 mt-3 font-semibold text-slate-500">
                            <p className="flex items-center">
                                Shipping Fee : <h3 className="text-xl ms-10">$4.60</h3>
                            </p>
                        </div>
                    </div>)

                }
            </div>
            <div >
                <h1 className="text-3xl font-semibold text-lef mb-8">Select Payment Methode</h1>
                <div className="overflow-x-scroll relative container_scrl">
                    <div className=" inline-flex   gap-8">
                        {
                            paymentMethods.map((ele, ndx) => <div onClick={() => {
                                paymethode === ele.name ? setPaymethode("") : setPaymethode(ele.name)


                            }
                            } className={` ${ele.name === paymethode ? "bg-emerald-200" : "bg-slate-50"}  hover:bg-emerald-200  w-40  shadow-md p-2 rounded-lg`} key={ndx}><img className="hover:opacity-70 h-20" src={ele.img} alt="" /></div>)
                        }
                    </div>
                </div>
                <div className="my-10 shadow-md rounded-lg border ms-auto max-w-[800px] p-4">
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
                    <hr className="mt-7" />
                    <div className="flex justify-end">
                        <div className="flex items-center mt-3 w-fit">
                            <p className="me-5 font-semibold"> total:- ${totalCost}</p>
                            <button onClick={() => buyNow()} className="btn btn-md text-xl  text-black bg-gradient-to-tr  from-amber-500 to-amber-200">Place Order</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;