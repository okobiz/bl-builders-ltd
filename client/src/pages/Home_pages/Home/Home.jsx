import { useEffect } from "react";
import TabTitle from "../../../utilits/TabTitle";
import About from "../About/About";
// import DevelopmentProcess from "../DevelopmentProcess/DevelopmentProcess";

import Gallary from "../Gallary/Gallary";
import Services from "../Services/Services";
import Banner from "../banner/Banner";
// import Values from "../Values/Values";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <TabTitle title={"Home"}></TabTitle>
      <Banner/>
      <About />
      <Services />
      {/* <Values /> */}
      <Gallary />
      {/* <DevelopmentProcess /> */}
    </div>
  );
};

export default Home;
