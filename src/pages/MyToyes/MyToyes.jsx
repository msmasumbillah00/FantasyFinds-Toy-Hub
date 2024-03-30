import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const MyToyes = () => {
    const [toyes, setToyes] = useState([]);
    const { user } = useContext(UserContext);
    const [totalCost, setTotalCost] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [totalItemsCost, setTotalItemsCost] = useState(0);
    const [shippingFee, setShippinFee] = useState(0);
    const [dataToCheckout, setDataToCheckout] = useState([])
    const navigate = useNavigate();




    useEffect(() => {
        fetch(`http://localhost:5000/myToys?user=${user.uid}`)
            .then(res => res.json())
            .then(data => {
                setToyes(data)


            })
    }, [toyes])

    useEffect(() => {
        const checkout = document.getElementById("checkout").querySelectorAll('input[type="checkbox"]:checked');
        let initItems = 0;
        let initPrice = 0;
        let data = [];
        for (let i = 0; i < checkout.length; i++) {
            initItems = initItems + Number(checkout[i].parentNode.querySelectorAll("span")[1].innerText)
            initPrice = initPrice + (Number(checkout[i].parentNode.querySelectorAll("span")[0].innerText) * Number(checkout[i].parentNode.querySelectorAll("span")[1].innerText));
            data.push({
                title: checkout[i].parentNode.querySelectorAll("h4")[1].innerText,
                colorFamily: checkout[i].parentNode.querySelectorAll("p")[0].innerText,
                quntity: Number(checkout[i].parentNode.querySelectorAll("span")[1].innerText)
            })

        }
        setDataToCheckout(data)
        setTotalItems(initItems);
        setTotalItemsCost(toFixed(initPrice));
        setShippinFee(toFixed(4.60 * checkout.length))
        setTotalCost(toFixed(initPrice + shippingFee))

    }, [toyes])

    const handelDelete = async (id) => {
        await fetch(`http://localhost:5000/myToys?id=${id}`, {
            headers: { 'Content-Type': 'application/json' },
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(data => console.log(data))
    }

    const handelQuentity = (event, id) => {
        const ndx = Number(event.target.parentNode.children[1].innerText);
        // const productCost = Number(e.target.parentNode.parentNode.parentNode.parentNode.querySelectorAll("span")[0].innerText)

        if (event.target.innerText === "-" && ndx > 1) {
            event.target.parentNode.children[1].innerText = ndx - 1


        }
        if (event.target.innerText === "+") {
            event.target.parentNode.children[1].innerText = ndx + 1

        }
        const quntity = Number(event.target.parentNode.children[1].innerText)
        fetch(`http://localhost:5000/myToys/${id}`, {
            method: 'PUT', // Use PUT or PATCH for update operations
            headers: {
                'Content-Type': 'application/json', // Specify content type as JSON
                // Include any additional headers if needed
            },
            body: JSON.stringify({ quntity: quntity }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to update data');
                }
                return response.json(); // Parse the JSON response
            })
            .then(updatedData => {
                // Handle the updated data
                console.log('Data updated successfully:', updatedData);
            })
            .catch(error => {
                // Handle errors
                console.error('Error updating data:', error.message);
            });

    }
    const buyNow = async () => {
        if (dataToCheckout.length < 1) {
            Swal.fire({
                title: "You must have to select a product to check out",
                showClass: {
                    popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                    popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
            });
            return
        }
        localStorage.setItem("checkoutData", JSON.stringify(dataToCheckout))
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate("/checkout")
    }
    const toFixed = (num) => {
        return Number(num.toFixed(2))
    }


    return (
        <div>
            <div className="my-10 max-w-7xl mx-auto p-3">
                <h1 className="text-3xl font-semibold text-center mb-8">Please Checkout</h1>
                {
                    toyes.length == 0 ? <h3 className="text-3xl font-semibold">There ie no Products to Checkout</h3> : <h3 className="flex ">Select All:- <input onClick={(event) => {
                        const allCheckboxes = document.querySelectorAll('input[type="checkbox"]');

                        if (event.target.checked === true) {
                            allCheckboxes.forEach(ele => {
                                ele.checked = true
                            })
                        }
                        else {
                            allCheckboxes.forEach(ele => {
                                ele.checked = false
                            })
                        }
                    }} type="checkbox" className="checkbox  border-black shadow-lg border ms-3" /></h3>
                }
                <div className="mx-2" id="checkout">

                    {

                        toyes.map((ele, ndx) =>
                            <div key={ndx}>
                                <div className=" ms-10 shadow-sm mt-5 border rounded-md relative flex items-center p-3 ">
                                    <button onClick={() => handelDelete(ele._id)} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                    <input className=" absolute -left-10 translate-y-1/2 shadow-lg border checkbox border-black" type="checkbox" />
                                    <div className=" flex w-full justify-between">
                                        <Link to={`/productDetails/${ele.products_id}`}><div className=" flex items-center">
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
                                                        <div onClick={() => handelQuentity(event, ele._id)} className=" flex justify-between w-fit items-center text-xl   px-8">
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
                            </div>
                        )

                    }
                </div>
                <div >

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
                                <button onClick={() => buyNow()} className="btn btn-md text-xl  text-black bg-gradient-to-tr  from-amber-500 to-amber-200">Please Checkout</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MyToyes;