import { useState } from "react";
import SectionHead from "../../../utilits/SectionHead";

import NewsModel from "../../../utilits/NewsModel";
import { useGetNewsQuery } from "../../../redux/features/news/newsApi";
import { baseUrl } from "../../../redux/api/baseApi";

const News = () => {
  // const [news, setNews] = useState([]);
  const { data: news, isLoading } = useGetNewsQuery();
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   fetch("news.json")
  //     .then((response) => response.json())
  //     .then((data) => setNews(data));
  // }, []);

  const handleShowMore = () => {
    if (visibleCount >= news?.data?.length) {
      setVisibleCount(3);
    } else {
      setVisibleCount((prev) => prev + 3);
    }
  };

  const openModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden"; // Fix background scrolling
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    document.body.style.overflow = "auto"; // Restore scrolling
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
          subTitle="OUR NEWS"
          title="Read Our news"
          shortInfo="Bibendum at varius vel pharetra vel turpis. Nisl condimentum id venenatis a condimentum vitae sapien 
  pellentesque habitant. Urna cursus eget nunc scelerisque viverra mauris."
        />
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-12">
        {news?.data?.slice(0, visibleCount).map((event) => (
          <div key={event.id}>
            <div className="border p-1 rounded group cursor-pointer">
              <div className="h-[300px] w-full">
                <img
                  className="rounded w-full h-full object-cover"
                  src={baseUrl + event.image}
                  alt=""
                />
              </div>
              <div className="py-4 px-2">
                <div className="mt-2">
                  <h2
                    onClick={() => openModal(event)}
                    className="xl:text-xl text-base font-medium group-hover:text-[#244436] duration-300"
                  >
                    {event.title}
                  </h2>

                  <p className="mt-2 line-clamp-2 text-[#262626]/60">
                    {event.details}
                  </p>

                  <button
                    onClick={() => openModal(event)}
                    className="relative flex items-center origin-right gap-2 py-2 px-4 bg-[#244436] rounded text-white font-rajdhani overflow-hidden group cursor-pointer mt-2"
                  >
                    <span className="relative z-10 lg:text-base text-sm uppercase">
                      Read more
                    </span>
                    <div className="absolute inset-0 w-full h-full bg-[#65e09d] rounded origin-right transform scale-x-0 group-hover:scale-x-100 group-hover:origin-left transition-transform duration-300 ease-in-out"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {news?.data?.length > 3 && (
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-[#244436] text-center uppercase text-[#fff] rounded mt-4"
          >
            {visibleCount >= news?.data?.length ? "LESS news" : "MORE news"}
          </button>
        </div>
      )}

      <NewsModel
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
      />
    </div>
  );
};

export default News;
