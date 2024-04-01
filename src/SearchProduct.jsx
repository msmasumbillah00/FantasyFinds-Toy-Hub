import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ShopingCard from "./components/ShopingCard/ShopingCard";

const SearchProduct = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const value = location.search.slice(1, location.search.length).split("=")[1]

    if (value.length < 2) {
        setData([])
    }
    useEffect(() => {
        // const key = location.search.slice(1, location.search.length).split("=")[0];

        if (value.length > 2) {
            fetch(`https://fantasy-finds-server.vercel.app/search${location.search}`)
                .then(res => res.json())
                .then(data => {
                    setData(data)
                })
        }
    }, [location])
    return (
        <div className="my-16">
            <h1 className="text-[40px] my-20 pb-6 text-center font-semibold sticky top-0 z-10 bg-white">Search For "{decodeURIComponent(value)}"</h1>
            <div className="mb-20">
                {
                    data.length == 0 && <h1 className="text-[40px] my-20 mx-auto pb-6 text-center font-semibold sticky top-0 z-10 bg-white" > No product found for <span className="underline">{decodeURIComponent(value)}</span></h1>
                }
                <div
                    className="grid my-20 container_scrl grid-cols-1 place-items-center md:grid-cols-2 mt-10 lg:grid-cols-3 xl:grid-cols-4 gap-5  ">

                    {
                        data.map(ele => <ShopingCard ele={ele} key={ele._id}></ShopingCard>)
                    }

                </div>
            </div>

        </div>
    );
};

export default SearchProduct;