import { useEffect, useState } from "react";
import Banner from "../Banner/Banner";
import Catagory from "../Catagory/Catagory";
import { Outlet } from "react-router-dom";
import Pagination from './../../../components/Pagination/Pagination';

const Home = () => {
    const [totalPage, setTotalPage] = useState(0)
    useEffect(() => {
        fetch("https://fantasy-finds-server.vercel.app/allproducts")
            .then(res => res.json())
            .then(data => setTotalPage(Math.ceil((data.length) / 12)))
    }, [])
    return (
        <div className="p-4">
            <Banner></Banner>
            <Catagory></Catagory>
            <Outlet></Outlet>
            <div className="my-5">
                <Pagination totalPages={totalPage}></Pagination>
            </div>
        </div>
    );
};

export default Home;