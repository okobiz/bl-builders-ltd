import { useState } from "react";
import SectionHead from "../../../utilits/SectionHead";

import { LuSquareUser } from "react-icons/lu";

import { useGetPublicationsQuery } from "../../../redux/features/publication/publicationApi";
import { baseUrl } from "../../../redux/api/baseApi";

const Publication = () => {
  const { data: publications, isLoading } = useGetPublicationsQuery();

  const [visibleCount, setVisibleCount] = useState(3);

  const handleShowMore = () => {
    if (visibleCount >= publications?.data?.length) {
      setVisibleCount(3);
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="mt-20">
      <div className="flex items-center justify-center">
        <SectionHead
          alDesign="item-center justify-center text-center"
          centerDesign="item-center flex justify-center text-center"
          subTitle="Our Publication"
          title="Insights & Research for a Sustainable Future"
          shortInfo="Dive into our latest publications featuring in-depth research, case studies, and expert insights on
sustainability, compliance, and industry advancements."
        />
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-12">
        {publications?.data
          ?.filter((publication) => publication.isActive === true)
          .slice(0, visibleCount)
          .map((publication) => (
            <div key={publication.id}>
              <div className="border p-1 rounded group cursor-pointer">
                <div className="h-[300px] w-full">
                  <img
                    className="rounded w-full h-full object-cover"
                    src={baseUrl + publication.image}
                    alt=""
                  />
                </div>
                <div className="py-4 px-2">
                  <div className="mt-2">
                    <h2 className="xl:text-xl text-base font-medium group-hover:text-[#65e09d] duration-300 line-clamp-1">
                      {publication.title}
                    </h2>
                    <p className="flex items-center gap-1 font-medium text-[#262626]/60 mt-1">
                      <span className="text-lg">
                        <LuSquareUser />
                      </span>
                      {publication.author}
                    </p>
                    <p className="mt-2 line-clamp-2 text-[#262626]/60">
                      {publication.details}
                    </p>
                    <div className="mt-4">
                      <a
                        href={publication.link}
                        target="_blank"
                        className="relative inline-flex items-center origin-right gap-2 py-2 px-4 bg-[#244436] rounded text-white font-rajdhani overflow-hidden group cursor-pointer mt-2"
                      >
                        <span className="relative z-10 lg:text-base text-sm uppercase">
                          Read more
                        </span>
                        <div className="absolute inset-0 w-full h-full bg-[#65e09d] rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>

      {publications?.data?.filter(
        (publication) => publication.isActive === true
      ).length > 3 && (
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-[#244436] hover:bg-[#65e09d] duration-300 text-center uppercase text-[#fff] rounded mt-4"
          >
            {visibleCount >= publications?.data?.length
              ? "LESS PUBLICATIONS"
              : "MORE PUBLICATIONS"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Publication;
