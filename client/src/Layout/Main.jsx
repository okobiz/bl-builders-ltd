import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar/NavBar";
import ScrollToBottomToTop from "../utilits/ScrollToBottomToTop";
import Footer from "../shared/Footer/Footer";

const Main = () => {
  return (
    <div className="overflow-hidden">
      <NavBar></NavBar>
      <Outlet></Outlet>

      <Footer></Footer>
      <ScrollToBottomToTop></ScrollToBottomToTop>
    </div>
  );
};

export default Main;
