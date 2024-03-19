import { useEffect } from "react";
import Banner from "../Banner/Banner";
import Catagory from "../Catagory/Catagory";
import { Outlet } from "react-router-dom";
import Pagination from './../../../components/Pagination/Pagination';

const Home = () => {
    useEffect(() => {

    }, [])
    return (
        <div className="p-4">
            <Banner></Banner>
            <Catagory></Catagory>
            <Outlet></Outlet>
            <div className="my-5">
                <Pagination totalPages={10}></Pagination>
            </div>
        </div>
    );
};

export default Home;