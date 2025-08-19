import { useEffect, useState } from "react";
import PagesHead from "../../utilits/PagesHead";
import TabTitle from "../../utilits/TabTitle";
import { baseUrl } from "../../redux/api/baseApi";
import { FaQuoteLeft } from "react-icons/fa6";

import { motion } from "framer-motion";
import { useGetBrochuresQuery } from "../../redux/features/brochure/brochureApi";
import { BsBoxArrowInDownRight } from "react-icons/bs";

const SkeletonLoader = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
    <div className="h-4 bg-gray-300 rounded w-2/3 mb-6"></div>
    <div className="grid lg:grid-cols-2 gap-4">
      <div className="h-24 bg-gray-300 rounded mb-4"></div>
      <div className="h-24 bg-gray-300 rounded mb-4"></div>
    </div>
    <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4 mt-6">
      <div className="h-[250px] bg-gray-300 rounded"></div>
      <div className="h-[250px] bg-gray-300 rounded"></div>
      <div className="h-[250px] bg-gray-300 rounded"></div>
    </div>
    <div className="h-[400px] bg-gray-300 rounded mt-6"></div>
  </div>
);

export const Brochure = () => {
  const { data: brochures, isLoading } = useGetBrochuresQuery("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showFullDatails, setShowFullDatails] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const extractYouTubeId = (url) => {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  return (
    <div>
      <TabTitle title={"Brochure"} />
      <PagesHead title="Our Brochure" subTitle="Our Brochure" />
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="container"
      >
        <div>
          {isLoading ? (
            <SkeletonLoader />
          ) : (
            brochures?.data?.map((brochure) => {
              const video = extractYouTubeId(brochure.video);
              const description =
                brochure?.description || "brochure description";
              const truncatedDescription = description.slice(0, 200);
              const detail = brochure?.detail || "brochure description";
              const truncatedDetail = detail.slice(0, 200);
              return (
                <div key={brochure._id}>
                  <div className="grid lg:grid-cols-2 gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-[#244436] capitalize">
                        {brochure.title}
                      </h2>
                      {/* <p className="mt-4 leading-relaxed text-[#262626]/80">
                        {brochure.description}
                      </p> */}
                      <div className="cursor-pointer group">
                        <p className="mt-4 leading-relaxed text-[#262626]/80">
                          {showFullDescription
                            ? description
                            : truncatedDescription}
                        </p>
                        {description.length > 200 && (
                          <button
                            onClick={() =>
                              setShowFullDescription(!showFullDescription)
                            }
                            className="text-[#244436] opacity-0 group-hover:opacity-100 duration-300"
                          >
                            {showFullDescription ? (
                              <div className="flex items-center gap-1">
                                <BsBoxArrowInDownRight /> less
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <BsBoxArrowInDownRight /> more
                              </div>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="group duration-300">
                      {/* <p className="leading-relaxed text-[#262626]/80 font-medium">
                        {brochure.detail}
                      </p> */}
                      <div className="cursor-pointer group">
                        <p className=" leading-relaxed text-[#262626]/80">
                          {showFullDatails ? detail : truncatedDetail}
                        </p>
                        {detail.length > 200 && (
                          <button
                            onClick={() => setShowFullDatails(!showFullDatails)}
                            className="text-[#244436] opacity-0 group-hover:opacity-100 duration-300"
                          >
                            {showFullDatails ? (
                              <div className="flex items-center gap-1">
                                <BsBoxArrowInDownRight /> less
                              </div>
                            ) : (
                              <div className="flex items-center gap-1">
                                <BsBoxArrowInDownRight /> more
                              </div>
                            )}
                          </button>
                        )}
                      </div>

                      <div className="mt-[20px] duration-300">
                        <a
                          href={
                            brochure?.pdf ? baseUrl + brochure.pdf : undefined
                          }
                          download={!!brochure?.pdf}
                          target={brochure?.pdf ? "_blank" : undefined}
                          className={`relative inline-flex items-center origin-right gap-2 py-3 px-4 rounded font-rajdhani overflow-hidden group ${
                            brochure?.pdf
                              ? "bg-[#244436] text-white cursor-pointer"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`}
                          aria-disabled={!brochure?.pdf}
                        >
                          <span className="relative z-10 tracking-widest lg:text-base text-sm">
                            Discover More
                          </span>
                          {brochure?.pdf && (
                            <div className="absolute inset-0 w-full h-full bg-[#65e09d] rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                          )}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="grid xl:grid-cols-3 lg:grid-cols-2 gap-2 mt-12">
                    <div className="bg-[#F5FDF8] px-8 py-8 rounded">
                      <p className="text-xl text-[#244436]">
                        <FaQuoteLeft />
                      </p>
                      <div className="mt-4">
                        <p className="text-[#262626]/70 line-clamp-4">
                          {brochure.quote}
                        </p>
                        <div className="mt-2">
                          <h2 className="text-lg font-medium">
                            {brochure.honorName}
                          </h2>
                          <p className="text-sm text-[#262626]/70 mt-1">
                            {brochure.honorDesignation}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:h-[250px] xl:h-[250px] h-[250px] md:h-[320px] border rounded p-2 overflow-hidden">
                      <img
                        className="w-full h-full rounded hover:scale-110 duration-500 "
                        src={baseUrl + brochure.image1}
                        alt=""
                      />
                    </div>
                    <div className="lg:h-[250px] xl:h-[250px] h-[250px] md:h-[320px] border rounded p-2 overflow-hidden">
                      <img
                        className="w-full h-full rounded hover:scale-110 duration-500"
                        src={baseUrl + brochure.image2}
                        alt=""
                      />
                    </div>
                  </div>

                  {
                    video && (
                      <div className="border relative group rounded cursor-pointer mt-12">
                        <div className="relative lg:h-[400px] md:h-[300px] h-[280px]  w-full bg-[#262626] rounded overflow-hidden">
                          <iframe
                            className="h-full w-full object-cover rounded duration-300"
                            title={`Video player for ${brochure._id}`}
                            src={`https://www.youtube.com/embed/${video}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      </div>
                    )
                    // : (
                    //   <video
                    //     className="h-full w-full object-cover rounded duration-300"
                    //     src={baseUrl + brochure.video}
                    //     controls
                    //     aria-label="Video player"
                    //   ></video>
                    // )
                  }
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </div>
  );
};
