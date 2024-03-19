import { Outlet } from "react-router-dom";
import Header from '../../components/Header/Header';
import Footer from "../../components/Footer/Footer"
const Main = () => {
    return (
        <div className=" min-h-screen flex flex-col">
            <div className="container mx-auto">
                <Header></Header>
                <Outlet></Outlet>
            </div>
            <div className="mt-auto bg-black text-white p-5">
                <div className="container mx-auto">
                    <Footer></Footer>
                </div>
            </div>
        </div>
    );
};

export default Main;