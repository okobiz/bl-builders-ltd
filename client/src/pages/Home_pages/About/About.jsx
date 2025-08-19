import { baseUrl } from "../../../redux/api/baseApi";
import { useGetAboutQuery } from "../../../redux/features/about/aboutApi";
import SectionHead from "../../../utilits/SectionHead";

import mission from "../../../assets/image/mission.png";
import vision from "../../../assets/image/vission.png";
import value from "../../../assets/image/value.png";
import FixModals from "../../../utilits/FixModals";
import A1 from "../../../assets/about/a1.jpg"

import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const About = () => {
  const { data } = useGetAboutQuery("");

  console.log(data);
  

  // Separate animation controls for each section
  const missionControls = useAnimation();
  const visionControls = useAnimation();
  const valueControls = useAnimation();
  const imageControls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      missionControls.start("visible");
      visionControls.start("visible");
      valueControls.start("visible");
      imageControls.start("visible");
    } else {
      missionControls.start("hidden");
      visionControls.start("hidden");
      valueControls.start("hidden");
      imageControls.start("hidden");
    }
  }, [missionControls, visionControls, valueControls, inView, imageControls]);

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: 50,
    },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.3, // Staggered animation for each item
        ease: "easeOut", // Smooth transition
        duration: 0.8, // Duration for the animation
      },
    }),
  };

  const cardVariant2 = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1, // Staggered animation for each item
        ease: "easeOut", // Smooth transition
        duration: 0.8, // Duration for the animation
      },
    }),
  };

  return (
    <div
      id="about"
      className="xl:py-32 lg:py-32 md:py-24 py-20 md:w-[90%] mx-auto overflow-hidden"
    >
      <div>
        {data?.data?.slice(0, 1).map((about, index) => (
          <div key={about._id} className="w-full">
            <div className="flex lg:flex-row  flex-col-reverse lg:justify-start justify-center lg:items-start items-center 2xl:gap-20 lg:gap-12 gap-12 w-full">
              <motion.div
                ref={ref}
                initial="hidden"
                variants={cardVariant2}
                animate={imageControls}
                custom={index}
                className="lg:w-2/4"
              >
                <img className="rounded" src={A1} alt="" />
              </motion.div>
              <div className="lg:w-3/4 xl:mt-0 lg:mt-0 mt-4">
                <div>
                  <SectionHead
                    subTitle="ABOUT US"
                    title={
                      <span>
                        {about.title.split(" ").slice(0, -1).join(" ")}{" "}
                        <span className="text-[#244436]">
                          {about.title.split(" ").slice(-1)}
                        </span>
                      </span>
                    }
                  ></SectionHead>

                  <div className="mt-4">
                    {/* details function */}
                    <div className="flex flex-col gap-3 text-[#262626]/70">
                      <p>{about.details.slice(0, 240)}</p>
                      <p className="relative">
                        {about.details.slice(240, 419) ||
                          "Let's Talk about Company"}
                        <FixModals type="about" about={about}></FixModals>
                      </p>
                    </div>

                    {/* mission, vision, value */}
                    <div className="flex flex-col gap-3 mt-8 relative">
                      {/* mission */}
                      <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={missionControls}
                        variants={cardVariants}
                        custom={index}
                        className="bg-[#4F6F5E]/50 relative overflow-hidden group cursor-pointer border flex lg:flex-row md:flex-row flex-col items-center gap-2 xl:rounded-full lg:rounded-full md:rounded-full rounded px-4 py-2"
                      >
                        <img
                          src={mission}
                          alt="mission"
                          className="z-[3] w-28 lg:flex md:flex hidden"
                        />

                        <div className="text-[#262626]/80 group  duration-300 z-[3]">
                          <p className="">
                            <span className="font-semibold group-hover:text-[#fff]">
                              Mission:{" "}
                            </span>
                            <span className="group-hover:text-[#fff]">
                              {about.mission.slice(0, 250)}
                            </span>
                          </p>
                          {about.mission.length > 250 && (
                            <FixModals type="mission" about={about}></FixModals>
                          )}
                        </div>
                        <div className="absolute inset-0 w-full h-full bg-[#244436] xl:rounded-full lg:rounded-full md:rounded-full rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-700 ease-in-out z-[2]"></div>
                      </motion.div>

                      {/* Vision */}

                      <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={visionControls}
                        variants={cardVariants}
                        custom={index + 1}
                        className="hover:z-10 bg-[#DDEBB0]/50 relative overflow-hidden group cursor-pointer border flex items-center gap-2 xl:rounded-full lg:rounded-full md:rounded-full rounded px-4 py-2"
                      >
                        <img
                          src={vision}
                          alt="vision"
                          className="w-28 lg:flex md:flex hidden"
                        />
                        <div className=" text-[#262626]/80 group  duration-300">
                          <p className="">
                            <span className="font-semibold group-hover:text-[#fff]">
                              Vision:{" "}
                            </span>
                            <span className="group-hover:text-[#fff]">
                              {about.vision.slice(0, 250)}
                            </span>
                          </p>
                          {about.vision.length > 250 && (
                            <FixModals type="vision" about={about}></FixModals>
                          )}
                        </div>
                        <div className="absolute inset-0 -z-10 w-full h-full bg-[#244436] xl:rounded-full lg:rounded-full md:rounded-full rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-700 ease-in-out"></div>
                      </motion.div>

                      {/* value */}
                      <motion.div
                        ref={ref}
                        initial="hidden"
                        animate={valueControls}
                        variants={cardVariants}
                        custom={index + 2}
                        className="hover:z-10 bg-[#A6C291]/50 relative overflow-hidden group cursor-pointer border flex items-center gap-2 xl:rounded-full lg:rounded-full md:rounded-full rounded px-4 py-2"
                      >
                        <img
                          src={value}
                          alt="value"
                          className="w-28 lg:flex md:flex hidden"
                        />
                        <div className="text-[#262626]/80 group  duration-300">
                          <p className="">
                            <span className="font-semibold group-hover:text-[#fff]">
                              Value:{" "}
                            </span>
                            <span className="group-hover:text-[#fff]">
                              {about.value.slice(0, 250)}
                            </span>
                          </p>
                          {about.value.length > 250 && (
                            <FixModals type="value" about={about}></FixModals>
                          )}
                        </div>
                        <div className="absolute -z-10 inset-0 w-full h-full bg-[#244436] xl:rounded-full lg:rounded-full md:rounded-full rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-700 ease-in-out"></div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
