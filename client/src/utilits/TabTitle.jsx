import { Helmet } from "react-helmet";

const TabTitle = ({ title }) => {
  return (
    <Helmet>
      <title>BL Builders Ltd - {title}</title>
    </Helmet>
  );
};

export default TabTitle;
