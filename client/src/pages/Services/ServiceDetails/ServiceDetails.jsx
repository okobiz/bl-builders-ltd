import { useParams } from "react-router-dom";
import { useGetSingleServicesQuery } from "../../../redux/features/services/serviceApi";

import TabTitle from "../../../utilits/TabTitle";
import { baseUrl } from "../../../redux/api/baseApi";
import ServiceContact from "../ServiceContact/ServiceContact";
import { MdLocalPhone } from "react-icons/md";
import { useEffect } from "react";

const ServiceDetails = () => {
  const id = useParams();
  const { data: service, isLoading } = useGetSingleServicesQuery(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <TabTitle title={service?.data?.title || "Loading..."}></TabTitle>

      <div>
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-[300px] bg-gray-200 rounded"></div>
            <div className="py-4 px-2">
              <div className="h-6 bg-gray-200 w-1/2 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 w-full rounded mb-2"></div>
              <div className="h-4 bg-gray-200 w-4/5 rounded"></div>
            </div>
          </div>
        ) : (
          <div className="">
            {/* Image */}
            <div className="h-[250px] md:h-[300px] lg:h-[320px] w-full overflow-hidden">
              <img
                src={baseUrl + service?.data?.image}
                alt={service?.data?.title || "Service Image"}
                className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h2 className="text-xl lg:text-2xl font-semibold text-[#262626]/90">
                {service?.data?.title}
              </h2>
              <p className="mt-2 text-[#262626]/70 text-sm">
                {service?.data?.details}
              </p>
              {service?.data?.location && (
                <p className="mt-2 text-[#244436]/80 font-medium text-sm">
                  Location: {service.data.location}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col xl:hidden lg:hidden">
        <div className="bg-[#F5FDF8] mt-8 rounded flex items-center gap-4 px-4 py-2">
          <div className="px-2 py-2 rounded bg-[#244436] text-xl font-semibold text-[#fff]">
            <MdLocalPhone />
          </div>
          <div>
            <p>Contact Us</p>
            <p className="text-[#262626]/80">+8801846670394</p>
          </div>
        </div>

        <div className="mt-4">
          <ServiceContact></ServiceContact>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
