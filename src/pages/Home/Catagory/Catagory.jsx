import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Catagory = () => {
    const [catagories, setCatagories] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/catagories")
            .then(res => res.json())
            .then((data) => {
                setCatagories(data);
            })
    }, [])

    return (
        <div className="my-10 ">
            <h1 className="text-center text-4xl my-5 font-semibold sticky top-0 z-10 bg-white my-8">Shope By Catagories</h1>
            <div
                className="grid my-10 container_scrl grid-cols-2 place-items-center md:grid-cols-3 mt-10 lg:grid-cols-4 xl:grid-cols-5 gap-4  max-h-[450px] overflow-scroll">
                {
                    catagories.map((ele, ndx) => <div key={ndx} className="card rounded max-w-80 glass h-[200px]">
                        <figure className="p-3"><img className="rounded-md h-[130%] object-cover" src={ele.img} alt="car!" /></figure>
                        <div className="card-body p-2 ">
                            <h2 className="card-title">{ele.title}</h2>
                            <div className="card-actions justify-left">
                                <Link to={`/catagories/${ele._id}`}> <button className="btn btn-sm w-fit text-white bg-gradient-to-tr mb-3  from-cyan-500 to-slate-400">See All Products</button></Link>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Catagory;