import { useEffect, useState } from "react";
import Swal from "sweetalert2";


const AddToy = () => {
    const [catagories, setCatagories] = useState();
    useEffect(() => {
        fetch("https://fantasy-finds-server.vercel.app/catagories")
            .then(res => res.json())
            .then(data => {
                setCatagories(data)
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const price = Number(form.price.value);
        const available = Number(form.available.value);
        const photo = form.photo.value;
        const catagori = form.catagori.value;
        const rating = form.rating.value;
        const discription = form.discription.value;
        const family = getLiTextContent(form.querySelectorAll("ul")[0])
        const groups = getLiTextContent(form.querySelectorAll("ul")[1])
        const photos = getLiTextContent(form.querySelectorAll("ul")[2])
        const data = {
            available: available,
            catagori_id: catagori,
            colors_family: family,
            discrip: discription,
            group: groups,
            image: photo,
            images: photos,
            price: price,
            rating: rating,
            title: title
        }
        fetch(`https://fantasy-finds-server.vercel.app/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Set the content type if sending JSON data
                // Add any other headers if needed
            },
            body: JSON.stringify(data), // Convert data to JSON string
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Parse the response body as JSON
            })
            .then(data => {
                // Handle the data returned from the server
                if (data.insertedId) {
                    let timerInterval;
                    Swal.fire({
                        title: "Product Added Successfully",
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                            const timer = Swal.getPopup().querySelector("b");
                            timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                            }, 100);
                        },
                        willClose: () => {
                            clearInterval(timerInterval);
                            form.reset()
                            // e.target.querySelectorAll("ul").map(ele => console.log(ele));
                            e.target.querySelectorAll("ul").forEach(ele => {
                                ele.innerHTML = ""
                            })
                        }
                    }).then((result) => {
                        /* Read more about handling dismissals below */
                        if (result.dismiss === Swal.DismissReason.timer) {
                            console.log("I was closed by the timer");
                        }
                    });
                }

            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });



    };

    const getLiTextContent = (ulElement) => {
        const liElements = ulElement.querySelectorAll('li');
        const liTextContent = Array.from(liElements).map(li => li.querySelector('input').value);
        return liTextContent;
    };


    const handelAddNew = async (event, type) => {
        const ul = event.target.parentNode.querySelector("ul");

        if (event.target.innerText === "+") {
            const newLi = document.createElement("li");
            newLi.innerHTML = ` 
            
            <input
            placeholder="Enter a ${type}"
            type="${type}"
            class="appearance-none border rounded mb-2 w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />`
            ul.appendChild(newLi)

        }
    }
    return (
        <div className="my-10 mb-20 p-3">
            <h1 className="my-10 text-4xl font-bold text-center">Add a New Toy</h1>
            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto border rounded shadow-lg p-8">
                <div className="grid lg:grid-cols-2 content-start  gap-x-10 mx-auto">
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
                        <input required
                            placeholder="Enter a title"
                            type="text"
                            name="title"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="flex gap-4">
                        <div className="mb-4">
                            <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price</label>
                            <input required
                                placeholder="Enter price $00"
                                type="text"
                                name="price"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="available" className="block text-gray-700 font-bold mb-2">Available</label>
                            <input required
                                placeholder="Quentity"
                                type="text"
                                name="available"
                                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="photo" className="block text-gray-700 font-bold mb-2">Photo</label>
                        <input required
                            placeholder="Enter a url"
                            type="url"
                            name="photo"
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="mb-4 me-8">
                            <label htmlFor="catagori" className="block text-gray-700 font-bold mb-2">catagori</label>
                            <select
                                name="catagori"
                                className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select Catagory</option>
                                {
                                    catagories?.map(ele => {
                                        return (
                                            <option key={ele._id} value={ele._id}>{ele.title}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating</label>
                            <select
                                name="rating"
                                className="select select-bordered w-full max-w-xs">
                                <option disabled selected>Select Rating</option>
                                <option>1</option>
                                <option>1.5</option>
                                <option>2</option>
                                <option>2.5</option>
                                <option>3</option>
                                <option>3.5</option>
                                <option>4</option>
                                <option>4.5</option>
                                <option>5</option>
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="discription" className="block text-gray-700 font-bold mb-2">Discription</label>
                        <textarea
                            rows="8"
                            placeholder="Enter a discription"
                            type="text"
                            name="discription"
                            className="appearance-none textarea-lg border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-x-4">
                        <div className="mb-4">
                            <label htmlFor="family" className="block text-gray-700 font-bold mb-2">Class & Family</label>
                            <div onClick={() => handelAddNew(event, "text")} className="p-2 shadow border bg-base-100 rounded-md ">
                                <ul tabIndex={0} className="family">
                                </ul>
                                <button type="button" className="btn btn-sm text-xl mt-2 px-10 min-w-32">+</button>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="Groups" className="block text-gray-700 font-bold mb-2">Groups</label>
                            <div onClick={() => handelAddNew(event, "text")} className="p-2 shadow border bg-base-100 rounded-md ">
                                <ul tabIndex={0} className="">
                                </ul>
                                <button type="button" className="btn btn-sm text-xl mt-2 px-10 min-w-32">+</button>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 mb-auto">
                        <label htmlFor="photos" className="block text-gray-700 font-bold mb-2">Photos</label>
                        <div onClick={() => handelAddNew(event, "url")} className="p-2 shadow border bg-base-100 rounded-md ">
                            <ul tabIndex={0} className="">
                            </ul>
                            <button type="button" className="btn btn-sm text-xl mt-2 px-10 min-w-32">+</button>
                        </div>
                    </div>



                </div>
                <div className="flex justify-between max-w-md ms-auto mt-2">
                    <button type="reset" className="bg-gradient-to-r from-red-500  rounded-lg to-red-400 btn w-36 mt-5 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Reset</button>
                    <button type="submit" className="bg-gradient-to-r from-teal-500 rounded-lg to-teal-400  btn w-36  mt-5     hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default AddToy;