import { Helmet } from "react-helmet";

const TabTitle = ({ title }) => {
  return (
    <Helmet>
      <title>Eco Comfort Socks LTD. - {title}</title>
    </Helmet>
  );
};

export default TabTitle;
