import logo from "../../assets/home/logo/fantasyhub.png"

const Footer = () => {
    return (
        <footer className="footer p-2 lg:grid-cols-2 ">
            <aside className=" lg:w-6/12">
                <img src={logo} alt="" />
                <p className="w-10/12 md:w-10/12 lg:w-full">Edwin Diaz is a software and web technologies engineer, a life coach trainer who is also a serial .</p>
            </aside>
            <dev className="grid grid-cols-3 w-full">
                <nav className="">
                    <h6 className="footer-title">Services</h6>
                    <div className="flex flex-col">
                        <a className="link link-hover">Branding</a>
                        <a className="link link-hover">Design</a>
                        <a className="link link-hover">Marketing</a>
                        <a className="link link-hover">Advertisement</a>
                    </div>
                </nav>
                <nav className="">
                    <h6 className="footer-title">Company</h6>
                    <div className="flex flex-col">
                        <a className="link link-hover">About us</a>
                        <a className="link link-hover">Contact</a>
                        <a className="link link-hover">Jobs</a>
                        <a className="link link-hover">Press kit</a>
                    </div>
                </nav>
                <nav className="">
                    <h6 className="footer-title">Legal</h6>
                    <div className="flex flex-col">
                        <a className="link link-hover">Terms of use</a>
                        <a className="link link-hover">Privacy policy</a>
                        <a className="link link-hover">Cookie policy</a>
                    </div>
                </nav>
            </dev>
        </footer>
    );
};

export default Footer;