// import { useState } from "react";
// import Lightbox from "yet-another-react-lightbox";
// import "yet-another-react-lightbox/styles.css";
// import { baseUrl } from "../../../redux/api/baseApi";
// import { useGetImagesQuery } from "../../../redux/features/gallery/galleryApi";

// const GalleryImages = () => {
//   const { data: imagesItems } = useGetImagesQuery("");
//   console.log("for new gallery", imagesItems);
//   const [open, setOpen] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = imagesItems?.data[0]?.event.map((items) => {
//     items?.image?.map((img) => {
//       return {
//         src: baseUrl + img,
//       };
//     });
//   });

//   const handleImageClick = (index) => {
//     setCurrentIndex(index);
//     setOpen(true);
//   };

//   return (
//     <>
//       <div
//       //  className="grid xl:grid-cols-3 lg:grid-cols-2 gap-4"
//       >
//         {imagesItems?.data[0]?.event?.map((item) => (
//           <div key={item._id} className="">
//             <h2 className="text-4xl">{item.eventTitle}</h2>
//             <p>{item._id}</p>
//             <div
//               // className="xl:h-[280px] lg:h-[300px] md:h-[350px] h-[300px] w-full p-2 rounded border border-[#F5FDF8] cursor-pointer overflow-hidden"
//               onClick={() => handleImageClick(item._id)} // Passing unique identifier
//             >
//               {item?.image.length}
//               {item?.image?.map((imageItem) => (
//                 <img
//                   key={imageItem} // Assuming imageItem is a unique identifier or you can use imageItem._id if available
//                   src={baseUrl + imageItem}
//                   alt={imageItem}
//                 />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>

//       {slides && (
//         <Lightbox
//           open={open}
//           close={() => setOpen(false)}
//           slides={slides}
//           index={currentIndex}
//         />
//       )}
//     </>
//   );
// };

// export default GalleryImages;

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { baseUrl } from "../../../redux/api/baseApi";
import { useGetImagesQuery } from "../../../redux/features/gallery/galleryApi";

const GalleryImages = () => {
  const { data: imagesItems } = useGetImagesQuery("");

  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure slides is properly structured
  const slides =
    imagesItems?.data[0]?.event?.flatMap((item) =>
      item?.image?.map((img) => ({
        src: baseUrl + img,
      }))
    ) || [];

  const handleImageClick = (index) => {
    setCurrentIndex(index);
    setOpen(true);
  };

  return (
    <>
      <div>
        {imagesItems?.data[0]?.event?.map((item, eventIndex) => (
          <div key={item._id}>
            <div className=" mt-8 py-4">
              <h2 className="xl:text-2xl lg:text-2xl text-xl capitalize">
                {item.eventTitle}
              </h2>
              <p className="text-[#262626]/70">{item.eventDetails}</p>
            </div>
            <div
              onClick={() => handleImageClick(eventIndex)}
              className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  gap-4  w-full border p-2 rounded"
            >
              {item?.image?.map((imageItem, imageIndex) => (
                <img
                  key={imageIndex}
                  src={baseUrl + imageItem}
                  alt={imageItem}
                  className="w-full h-full rounded"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent parent div click event
                    handleImageClick(
                      slides.findIndex(
                        (slide) => slide.src === baseUrl + imageItem
                      )
                    );
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {slides.length > 0 && (
        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={slides}
          index={currentIndex}
        />
      )}
    </>
  );
};

export default GalleryImages;
