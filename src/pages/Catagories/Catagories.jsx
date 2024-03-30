import { useLoaderData } from "react-router-dom";
import '@smastrom/react-rating/style.css'
import ShopingCard from "../../components/ShopingCard/ShopingCard";

const Catagories = () => {

    const data = useLoaderData();

    const catagoryProducts = data.result;
    const catagoriDetails = data.catagoriDetails;

    // console.log(data)
    return (
        <div>
            <h1 className="text-5xl mt-10 text-center font-semibold">{catagoriDetails.title}</h1>
            <div
                className="grid my-20 container_scrl grid-cols-1 place-items-center md:grid-cols-2 mt-10 lg:grid-cols-3 xl:grid-cols-4 gap-4  ">
                {
                    catagoryProducts.map(ele => <ShopingCard ele={ele} key={ele._id}></ShopingCard>)
                }

            </div>
        </div>
    );

};

export default Catagories;