import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataContextProvider";
import ShopingCard from "../../../components/ShopingCard/ShopingCard";

const Products = () => {
    const [homedata, sethomeData] = useState([]);
    const params = useParams();
    const { setCurrentPage, currentPage } = useContext(DataContext);






    useEffect(() => {
        !params.id && setCurrentPage(1)
        params.id && setCurrentPage(Number(params.id));

    }, [params])

    useEffect(() => {
        async function fetchData() {
            let response = await fetch(`https://fantasy-finds-server.vercel.app/products?page=${currentPage}&limin=${12}`);
            const data = await response.json();

            sethomeData(data)
        }
        fetchData();
    }, [currentPage])

    return (
        <div className="my-16">
            <h1 className="text-[40px] my-20 pb-6 text-center font-semibold sticky top-0 z-10 bg-white">Just For you</h1>
            <div className="mb-20">
                <div
                    className="grid my-20 container_scrl grid-cols-1 place-items-center md:grid-cols-2 mt-10 lg:grid-cols-3 xl:grid-cols-4 gap-5  ">
                    {
                        homedata.map(ele => <ShopingCard ele={ele} key={ele._id}></ShopingCard>)
                    }

                </div>
            </div>

        </div>
    );
};

export default Products;