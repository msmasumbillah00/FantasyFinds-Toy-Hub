import { Rating } from "@smastrom/react-rating";
import moment from "moment";
import { useContext, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";
import Swal from "sweetalert2";

const ProductDetails = () => {
    const data = useLoaderData()
    const [quntity, setQuentity] = useState(1);
    const [productImage, setProductImage] = useState(data.image);
    const [colorFamily, setColorFamily] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [dailogData, setDailogData] = useState("")
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const buyProduct = async (titl, q, f) => {
        localStorage.setItem("checkoutData", JSON.stringify([{ title: titl, quntity: q, colorFamily: f }]))
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate("/checkout")
    }
    const addtoChart = (title, quntity, colorFamily) => {
        // console.log("Add product", title, quntity, colorFamily)
        const date = moment().format('MMMM Do YYYY, h:mm:ss a');
        const orderdata = {
            products_id: data._id,
            image: data.image,
            title: title,
            price: data.price,
            quntity: quntity,
            colorFamily: colorFamily,
            date_time: date,
            user: {
                name: user.displayName || "",
                uid: user.uid,
                email: user.email
            }

        }
        fetch('http://localhost:5000/myToys', {
            method: 'POST', // Specify the request method
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify([orderdata]) // Include the data you want to send in the request body
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
                    closeDialogue();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Added to Chart Successfully",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            })

        // console.log(orderdata)
        setQuentity(1)

    }

    const Dialogue = (name) => {
        // console.log(name)

        return (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
                <div className="bg-white relative max-w-[500px] max-h[650px] overflow-scroll container_scrl rounded-lg p-8">
                    <div>
                        <h1 className="font-bold my-4">Colors & Family</h1>
                        <div className="flex flex-wrap gap-3">
                            {
                                data.colors_family &&
                                data.colors_family.map((ele, ndx) => <div onClick={() => {
                                    if (colorFamily === ele) {
                                        setColorFamily("")
                                    }
                                    else {
                                        setColorFamily(ele)
                                    }
                                }} className={`${colorFamily === ele ? " from-emerald-100 to-emerald-200" : " from-slate-100 to-slate-200"} border bg-gradient-to-r min-w-24 text-center font-semibold rounded-lg p-3`} key={ndx}>{ele}</div>)
                            }
                        </div>
                    </div>
                    <button onClick={closeDialogue} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    <div className="my-4">
                        <h4 className="text-xl font-semibold">Quentity</h4>
                        <div className="flex items-center ">
                            <div className="border flex justify-between w-fit items-center  mt-3 px-8">
                                <button onClick={() => quntity > 1 && setQuentity(quntity - 1)} className="w-12 p-3 font-serif font-bold text-left">-</button>
                                <span>{quntity}</span>
                                <button onClick={() => setQuentity(quntity + 1)} className="w-12 p-3 font-serif font-bold text-right">+</button>
                            </div>
                            <div className="ms-3  mt-3">{data.available} pieces available</div>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        {/* onClick={() => buyProduct(data.title, quntity, colorFamily)} */}
                        <button onClick={() => name === "Add to chart" ? addtoChart(data.title, quntity, colorFamily) : buyProduct(data.title, quntity, colorFamily)} className={` ${name === "Add to chart" ? " text-white bg-gradient-to-r  from-cyan-500 mb-1 to-cyan-400" : "bg-red-500 hover:bg-red-700 text-white"} font-bold py-2 px-4 rounded`}>
                            {name === "Add to chart" ? name : "Checkout"}
                        </button>
                        {/* <div onClick={() => name === "Add to chart" ? addtoChart(data.title, quntity, colorFamily) : buyNow(data.title, quntity, colorFamily)} className={`btn w-full ${name === "Add to chart" ? " text-white  from-cyan-500 mb-1 to-slate-400" : " from-amber-500 text-black to-amber-200"}  bg-gradient-to-tr `}>{name}</div> */}

                    </div>
                </div>
            </div>
        );
    };

    const openDialogue = (event) => {
        setDailogData(event.target.innerText)
        setIsOpen(true);
        if (!colorFamily) {

            setColorFamily(data.colors_family[0])
        }
    };
    const closeDialogue = () => {
        setIsOpen(false);
        if (colorFamily === data.colors_family[0]) {
            setColorFamily("")
        }
    };

    if (isOpen) {
        return Dialogue(dailogData);
    }







    // console.log(data)
    return (
        <div>
            <h1 className="text-5xl my-10 text-center font-semibold">Products Details</h1>
            <div className="flex flex-col md:flex-row gap-10">
                <div className="p-4 md:w-6/12 ">
                    <div className="max-h-[500px] relative overflow-hidden p-10 md:p-0 flex items-center justify-center">
                        <img className="rounded-md max-h-[480px] object-cover" src={productImage} alt="" />
                    </div>
                    <div className="flex justify-center max-h-[130px] container_scrl overflow-x-scroll">
                        {
                            data.images.map((ele, ndx) => <div className="p-4 max-w-36" key={ndx}>
                                <img onMouseOver={() => setProductImage(ele)} className="rounded-md h-[100%] object-cover" src={ele} alt="" />
                            </div>)
                        }
                    </div>
                </div>
                <div className=" p-3 md:w-6/12 lg:w-5/12 p-6">
                    <h1 className="text-2xl font-semibold mb-5">{data.title}</h1>
                    <h3 className="text-xl font-semibold">Discription:-</h3>
                    <p>&bull; {data.discrip}</p>
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl  font-bold my-4">${data.price}</h1>
                        <div className="flex items-center">
                            <Rating
                                readOnly
                                style={{ maxWidth: 80 }}
                                value={data.rating}
                            />({data.rating})

                        </div>
                    </div>
                    {
                        data.colors_family.length > 1 &&
                        <div>
                            <h1 className="font-bold my-4">Colors & Family</h1>
                            <div className="flex flex-wrap gap-3">
                                {
                                    data.colors_family.map((ele, ndx) => <div onClick={() => {
                                        if (colorFamily === ele) {
                                            setColorFamily("")
                                        }
                                        else {
                                            setColorFamily(ele)
                                        }
                                    }} className={`${colorFamily === ele ? " from-emerald-100 to-emerald-200" : " from-slate-100 to-slate-200"} border bg-gradient-to-r min-w-24 text-center font-semibold rounded-lg p-3`} key={ndx}>{ele}</div>)
                                }
                            </div>
                        </div>
                    }
                    <div className="my-4">
                        <h4 className="text-xl font-semibold">Quentity</h4>
                        <div className="flex items-center ">
                            <div className="border flex justify-between w-fit items-center  mt-3 px-8">
                                <button onClick={() => quntity > 1 && setQuentity(quntity - 1)} className="w-12 p-3 font-serif font-bold text-left">-</button>
                                <span>{quntity}</span>
                                <button onClick={() => setQuentity(quntity + 1)} className="w-12 p-3 font-serif font-bold text-right">+</button>
                            </div>
                            <div className="ms-3  mt-3">{data.available} pieces available</div>
                        </div>
                    </div>
                    <div onClick={() => openDialogue(event, data._id, quntity, colorFamily)} className="justify-left mt-auto flex gap-4">
                        <button className="btn  w-1/2 text-white bg-gradient-to-tr  from-cyan-500 mb-1 to-slate-400">Add to chart</button>
                        <div className="btn w-1/2 text-black bg-gradient-to-tr  from-amber-500 to-amber-200">Buy Now</div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ProductDetails;


// </dialog>