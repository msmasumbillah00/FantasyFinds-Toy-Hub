import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const Banner = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    const banners = [
        {
            id: 1,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://img.freepik.com/free-vector/scene-with-many-kids-classroom_1308-42160.jpg?size=626&ext=jpg&ga=GA1.2.462971205.1709915735&semt=ais"
        },
        {
            id: 2,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://img.freepik.com/free-vector/messy-kids-room-interior-kindergarten_107791-2009.jpg?w=996&t=st=1710825643~exp=1710826243~hmac=9b5d999394b1c203afa1bd7f173dcea002a74fff0886218340178cf83ddc0f55"
        },
        {
            id: 3,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://img.freepik.com/free-photo/miniature-transport-vehicle-arranged-row-pink-backdrop_23-2148084238.jpg?t=st=1710825687~exp=1710829287~hmac=897c5ec73d0763931aa1df0e7ca47bd18b57090f2fc2e0b95a05402b8f4d3ae2&w=996"
        },
        {
            id: 4,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://img.freepik.com/free-vector/shop-with-kids-toys-games-gifts-children_107791-20999.jpg?t=st=1710825706~exp=1710829306~hmac=682c151b2d23d7feb540fd09389b88336af59223d2832913cb15564a961e0c38&w=996"
        },
        {
            id: 5,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://img.freepik.com/free-vector/modern-sedan-new-models-standing-waiting-buyers-exhibition-hall-dealer-center-salon-cartoon_1441-3111.jpg?t=st=1710825809~exp=1710829409~hmac=456126af8bf133746da8fb7c74311ead81c238e573f198dc8ed49286e76db26e&w=996"
        },
        {
            id: 6,
            discribe: "Your enchanted emporium for whimsical wonders and playful treasures, curated to spark imagination and adventure in every child's heart.",
            imgUrl: "https://img.freepik.com/free-vector/toy-store-with-shelf-cartoon-vector-illustration_107791-20749.jpg?t=st=1710825950~exp=1710829550~hmac=612ee02b867638a5c3d82c44df9a6ee8bbf08aa05e6e6e235c99714376d860ad&w=996"
        },

    ]


    return (
        <div className="bg-gradient-to-l from-cyan-100 p-4 mt-5">
            <Carousel
                swipeable={true}
                showDots={true}
                responsive={responsive}
                infinite={true}
                autoPlay={true}
                autoPlaySpeed={3000}
                removeArrowOnDeviceType={["tablet", "mobile"]}
            >

                {
                    banners.map((ele, ndx) => <div key={ndx} className="overflow-hidden flex flex-col-reverse  lg:flex-row  w-full h-[100vw] md:h-[70vw] lg:h-[30vw] ">
                        <div className="lg:w-5/12 flex flex-col justify-center py-5">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-mono font-semibold"><span className="">FANTASYFIND</span> HUB <br /> KIDS ZOON </h1>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae cum adipisci omnis cupiditate distinctio, alias tempore architecto? Repudiandae, quam at!
                            </p>
                            <button className="btn w-fit my-4 btn-md text-white bg-gradient-to-tr  from-cyan-500 to-slate-400">Shope Now</button>
                        </div>
                        <img className="object-cover lg:w-7/12 h-full rounded-xl " src={ele.imgUrl}></img>

                    </div>)
                }
            </Carousel>
        </div>
    );
};

export default Banner;
