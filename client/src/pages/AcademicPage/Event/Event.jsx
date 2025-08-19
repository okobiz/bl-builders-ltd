import { useState } from "react";
import SectionHead from "../../../utilits/SectionHead";
import { MdAccessTime, MdDateRange } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

import EventModal from "../../../utilits/EventModal";
import { useGetEventsQuery } from "../../../redux/features/event/eventApi";
import { baseUrl } from "../../../redux/api/baseApi";

const Event = () => {
  const { data: events, isLoading } = useGetEventsQuery();
  console.log("event data", events);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleShowMore = () => {
    if (visibleCount >= events?.data?.length) {
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
    return (
      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-12">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border p-1 rounded animate-pulse">
            <div className="h-[300px] w-full bg-gray-300 rounded"></div>
            <div className="py-4 px-2">
              <div className="flex items-center gap-2 text-[#262626]/60">
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
                <div className="w-24 h-4 bg-gray-300 rounded"></div>
              </div>
              <div className="mt-2">
                <div className="w-32 h-6 bg-gray-300 rounded mb-2"></div>
                <div className="w-24 h-4 bg-gray-300 rounded mb-2"></div>
                <div className="w-full h-16 bg-gray-300 rounded mb-4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center">
        <SectionHead
          alDesign="item-center justify-center text-center"
          centerDesign="item-center flex justify-center text-center"
          subTitle="Our Announcement"
          title="Stay Updated with Important Updates, Insights, and Opportunities"
          shortInfo="Explore our latest announcements, industry insights, and key updates to stay informed about our
initiatives, projects, and upcoming events."
        />
      </div>

      <div className="grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 gap-4 mt-12">
        {events?.data
          ?.filter((event) => event.isActive === true)
          .slice(0, visibleCount)
          .map((event) => (
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
                  <div className="flex items-center gap-2 text-[#262626]/60">
                    <p className="flex items-center gap-1">
                      <MdAccessTime />
                      <span>{event.time}</span>
                    </p>
                    <p className="flex items-center gap-1">
                      <MdDateRange />
                      <span>{event.date}</span>
                    </p>
                  </div>
                  <div className="mt-2">
                    <h2
                      onClick={() => openModal(event)}
                      className="xl:text-xl lg:text-lg text-base font-medium group-hover:text-[#65e09d] line-clamp-2"
                    >
                      {event.title}
                    </h2>
                    <p className="flex items-center gap-1 text-[#262626]/60 mt-2">
                      <FaLocationDot />
                      <span className="line-clamp-1">{event.location}</span>
                    </p>
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

      {events?.data?.filter((event) => event.isActive === true).length > 3 && (
        <div className="flex items-center justify-center mt-8">
          <button
            onClick={handleShowMore}
            className="px-6 py-3 bg-[#244436] hover:bg-[#65e09d] duration-300 text-center uppercase text-[#fff] rounded mt-4"
          >
            {visibleCount >= events?.data?.length
              ? "LESS EVENTS"
              : "MORE EVENTS"}
          </button>
        </div>
      )}

      <EventModal
        isOpen={isModalOpen}
        onClose={closeModal}
        event={selectedEvent}
      />
    </div>
  );
};

export default Event;
