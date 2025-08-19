import { useEffect } from "react";
import { motion } from "framer-motion"; // Import motion from framer-motion
import PagesHead from "../../../utilits/PagesHead";
import TabTitle from "../../../utilits/TabTitle";
import Event from "../Event/Event";

import Publication from "../Publication/Publication";

const Academic = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="">
      <TabTitle title={"Academy"} />
      <PagesHead title="Academy" subTitle="Academy" />

      <div className="container">
        {/* Wrap each component with motion.div and add the scroll animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Start from opacity 0 and 50px below
          animate={{ opacity: 1, y: 0 }} // Animate to opacity 1 and 0px
          transition={{ duration: 0.8 }} // Smooth animation with 0.8s duration
        >
          <Event />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Publication />
        </motion.div>

        {/* <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <News />
        </motion.div> */}
      </div>
    </div>
  );
};

export default Academic;
