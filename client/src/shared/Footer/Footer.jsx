import { Link } from "react-router-dom";

import logo from "../../assets/logo/eco_comfort.png";
import { navItems } from "../../utilits/navItems";
import SocialIcon from "../SocialIcon/SocialIcon";
import Map from "../../utilits/Map";
import footerImage from "../../assets/image/foolter.webp";

const Footer = () => {
  // Get initial state from localStorage or default to true (visible)
  // const [open, setOpen] = useState(true);

  // const handleOpen = () => {
  //   setOpen(!open);
  // };

  return (
    <div>
      <div className="relative">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${footerImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-[#262626]/20"></div>

        {/* Content Section */}
        <div className="relative py-12 2xl:px-80 xl:px-28 lg:px-20 md:px-12 px-8 mx-auto text-white">
          <div className="grid lg:grid-cols-3">
            <div className="flex flex-col gap-4 text-[#fff]/70 mt-10 xl:ml-0 lg:ml-12">
              <img
                src={logo}
                alt="Logo"
                className="h-20 w-40 bg-gray-200 p-2 rounded-lg"
              />
              <p className="hover:text-[#fff] duration-300 cursor-pointer mr-12">
                Zirani Bazar, BKSP - 1349, Ashulia, Savar, Dhaka
              </p>
            </div>
            <div className="flex flex-col gap-6 mt-10 xl:ml-0 lg:ml-12">
              <h2 className="text-[#fff] font-semibold">OUR COMPANY</h2>
              <div className="flex flex-col gap-2 text-[#fff]/70">
                {navItems?.map((navItem) => (
                  <div key={navItem.label}>
                    <Link to={navItem.href}>
                      <li
                        data-text={navItem.label}
                        className="list-none hover:text-[#4bf095] hover:ml-[6px] duration-300"
                      >
                        {navItem.label}
                      </li>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-10">
              <h2 className="text-[#fff] font-semibold">SOCIAL MEDIA</h2>
              <SocialIcon />
              <Map />
            </div>
          </div>

          {/* Footer Banner */}
          {/* {open && (
            <div className="bg-[#244436] fixed bottom-0 left-0 right-0 text-center z-[99] w-full py-10">
              <div
                className="w-[30px] h-[30px] bg-[#fff] rounded-full flex items-center justify-center xl:ml-20 lg:ml-20 ml-[350px] xl:mt-[-12px] lg:mt-[-12px] mt-[-50px] cursor-pointer"
                onClick={() => setOpen(false)}
              >
                <FaXmark className="text-[#262626]" />
              </div>
              <h2 className="lg:text-xl text-base">
                Right Now Eco Comfort Socks Website is Under Construction
              </h2>
            </div>
          )} */}
        </div>
      </div>
      <div className="bg-[#2e3b2c] py-4 flex flex-wrap items-center justify-between 2xl:px-80 xl:px-28 lg:px-20 md:px-12 px-8 mx-auto text-[#fff]">
        <p>ECO COMFORT SOCKS LIMITED © 2025. All Rights Reserved.</p>
        <p className="flex gap-1">
          <span>Developed by</span>
          <a
            href="https://okobiz.com/"
            target="_black"
            className=" font-semibold"
          >
            okobiz
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
