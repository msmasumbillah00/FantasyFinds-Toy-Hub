import { Rating } from '@smastrom/react-rating';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { UserContext } from '../../context/UserContextProvider';
import moment from 'moment';

const ShopingCard = ({ ele }) => {
    const [colorFamily, setColorFamily] = useState("");
    const [quntity, setQuentity] = useState(1);
    const navigate = useNavigate();
    const { user } = useContext(UserContext);

    const [eventName, setEventName] = useState("");
    const [modalData, setModalData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const buyProduct = async (titl, q, f) => {
        localStorage.setItem("checkoutData", JSON.stringify([{ title: titl, quntity: q, colorFamily: f }]))
        await new Promise(resolve => setTimeout(resolve, 1500));
        navigate("/checkout")

    }
    const addtoChart = (title, quntity, colorFamily) => {
        // console.log("Add product", title, quntity, colorFamily)
        const date = moment().format('MMMM Do YYYY, h:mm:ss a');
        const orderdata = {
            products_id: modalData._id,
            image: modalData.image,
            title: title,
            price: modalData.price,
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
                // console.log(data);
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
    const Dialogue = (data, name) => {
        // console.log(data, name)

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
    const openDialogue = (event, id) => {
        setEventName(event.target.innerText, id)
        fetch(`http://localhost:5000/products/${id}`)
            .then(res => res.json())
            .then(data => {
                setModalData(data)
                setColorFamily(data.colors_family[0])
                // console.log(data)
            })

        setIsOpen(true);
    }

    const closeDialogue = () => {
        setIsOpen(false);
        setColorFamily(modalData.colors_family[0])
        setQuentity(1)
    };

    if (isOpen) {
        return Dialogue(modalData, eventName);
    }

    return (
        <div>
            <div className="card rounded max-w-80 shadow-lg  glass h-full">
                <Link to={`/productDetails/${ele._id}`}> <figure className="p-3"><img className="rounded-md h-[100%] object-cover" src={ele.image} alt="car!" /></figure></Link>
                <div className="card-body p-2 ">
                    <div>

                        <Link to={`/productDetails/${ele._id}`}>
                            {
                                ele.title.length > 20 ?

                                    <h2 className="card-title text-[22px] mb-3">{ele.title.slice(0, 55)}.... {modalData?.price}</h2>
                                    : <h2 className="card-title text-[30px] mb-3">{ele.title}</h2>
                            }
                        </Link>

                    </div>


                    <div className="card-actions mt-auto">
                        <div className="flex w-full">
                            <h3 className="text-xl font-semibold">${ele.price}</h3>
                            <p className="flex items-center justify-end">

                                <Rating
                                    readOnly
                                    style={{ maxWidth: 80 }}
                                    value={ele.rating}
                                />
                                <div>
                                    ({ele.rating})
                                </div>
                            </p>
                        </div>
                        <div onClick={() => openDialogue(event, ele._id)} className="justify-left mt-auto w-full">
                            <button className="btn btn-sm w-full text-white bg-gradient-to-tr  from-cyan-500 mb-1 to-slate-400">Add to chart</button>
                            <button className="btn btn-sm w-full text-black bg-gradient-to-tr  from-amber-500 to-amber-400">Buy Now</button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default ShopingCard;