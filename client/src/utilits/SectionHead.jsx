/* eslint-disable react/prop-types */
const SectionHead = ({
  subTitle,
  title,
  alDesign,
  shortInfo,
  centerDesign,
  shortStyle,
}) => {
  return (
    <div className={`flex flex-col gap-4 ${alDesign}`}>
      <div className={`flex items-end ${centerDesign}`}>
        {/* <p className="w-[30px] h-[2px] bg-[#244436]"></p> */}
        <p className="text-base font-semibold text-[#244436] uppercase mt-6">
          {subTitle}
        </p>
      </div>
      <h2 className="xl:text-2xl lg:text-xl text-lg font-semibold">{title}</h2>
      <p className={`xl:px-40  text-[#262626]/60  ${shortStyle}`}>
        {shortInfo}
      </p>
    </div>
  );
};

export default SectionHead;
