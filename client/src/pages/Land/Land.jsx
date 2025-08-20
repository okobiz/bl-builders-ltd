import { Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useGetServicesQuery } from "../../redux/features/services/serviceApi";
import SectionHead from "../../utilits/SectionHead";
import { baseUrl } from "../../redux/api/baseApi";

const LandPage = () => {
  const { data: apartments } = useGetServicesQuery("land");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const variants = {
    hidden: (direction) => ({
      opacity: 0,
      x: direction === "left" ? -100 : 100,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Filter active services
  const activeServices =
    apartments?.data?.filter((service) => service.isActive) || [];

  // Sort by status
  const statusOrder = ["running", "upcoming", "delivered"];
  const sortedServices = activeServices.sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  // Group services by status
  const groupedServices = {
    running: sortedServices.filter((s) => s.status === "running"),
    upcoming: sortedServices.filter((s) => s.status === "upcoming"),
    delivered: sortedServices.filter((s) => s.status === "delivered"),
  };

  const statusTitles = {
    running: {
      title: "Running Projects",
      description:
        "These projects are currently in progress and actively being developed.",
    },
    upcoming: {
      title: "Upcoming Projects",
      description: "Projects that are planned and will start soon.",
    },
    delivered: {
      title: "Delivered Projects",
      description: "Projects that have been completed successfully.",
    },
  };

  return (
    <div className="bg-[#f2f6f7]/20 mb-16">
      <div className="px-5 md:w-[90%] mx-auto">
        <div className="flex items-center justify-center">
          <SectionHead
            subTitle="OUR LAND / PROJECTS"
          />
        </div>

        {statusOrder.map((status) => {
          const services = groupedServices[status];
          if (!services.length) return null;

          return (
            <div key={status} className="mt-16">
              {/* Section Title & Description */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl xl:text-4xl font-bold text-[#244436]">
                  {statusTitles[status].title}
                </h2>
                {/* <p className="mt-2 text-[#262626]/70">{statusTitles[status].description}</p> */}
              </div>

              {/* Services Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {services.map((service, index) => (
                  <motion.div
                    key={service._id}
                    custom={index % 2 === 0 ? "left" : "right"}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={variants}
                  >
                    <div className="group border border-[#244436]/20 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                      <Link
                        to={`/service/${service._id}`}
                        className="block relative"
                      >
                        <div className="relative w-full lg:h-[300px] md:h-[300px] h-[250px] overflow-hidden rounded-t-lg">
                          <img
                            src={baseUrl + service.image}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#244436]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-lg"></div>
                        </div>

                        <div className="p-4">
                          <h3 className="text-lg font-semibold text-[#262626] group-hover:text-[#244436] transition-colors duration-300 line-clamp-1">
                            {service.title}
                          </h3>
                          <p className="mt-2 text-[#262626]/70 group-hover:text-[#262626]/90 text-sm line-clamp-4">
                            {service.details}
                          </p>

                          <div className="mt-4">
                            <button className="relative px-4 py-2 border border-[#244436]/20 text-[#244436] rounded overflow-hidden group">
                              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                                Read More
                              </span>
                              <div className="absolute inset-0 bg-orange-500 rounded origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></div>
                            </button>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
              {(status === "running" || status === "upcoming") && (
                <p className="mt-4 font-semibold text-[#262626]/60">
                  Need a Custom Plan?
                  <Link
                    to="/contact"
                    className="text-[#e46565] cursor-pointer ml-[2px] duration-300"
                  >
                    Contact Us
                  </Link>
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LandPage;
