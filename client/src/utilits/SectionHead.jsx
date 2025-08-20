/* eslint-disable react/prop-types */
const SectionHead = ({
  subTitle,
  alDesign,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${alDesign}`}>
        <p className="text-[#244436] uppercase mt-6 text-2xl md:text-3xl xl:text-4xl font-semibold">
          {subTitle}
        </p>
    </div>
  );
};

export default SectionHead;
