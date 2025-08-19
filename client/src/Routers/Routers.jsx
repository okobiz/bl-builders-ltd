import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home_pages/Home/Home";
import Services from "../pages/Services/Services";
import { Experience } from "../pages/Experience/Experience";

import { Brochure } from "../pages/Brochure/Brochure";
import { Contact } from "../pages/Contact/Contact";
import { GalleryPage } from "../pages/Gallary/Gallary";
import ServiceDetails from "../pages/Services/ServiceDetails/ServiceDetails";
import DetailsLayout from "../Layout/DetailsLayout";
import NotFound from "../pages/NotFound/NotFound";
import { About } from "../pages/Profile/About";
import Academic from "../pages/AcademicPage/Academic/Academic";

import AppiliedPage from "../pages/AppiliedPage/AppiliedPage";
import Career from "../pages/Career/Career";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      { path: "/", element: <Home /> },

      { path: "/experience", element: <Experience /> },
      { path: "/gallery", element: <GalleryPage /> },
      { path: "/about", element: <About /> },
      { path: "/profile", element: <Brochure /> },
      // { path: "/academy", element: <Academic /> },
      { path: "/career", element: <Career /> },
      { path: "/contact", element: <Contact /> },
      { path: "/applied/:id", element: <AppiliedPage /> },

      {
        path: "/products",
        element: <Services />,
      },
      {
        path: "/service/:id",
        element: <DetailsLayout />,
        children: [
          { path: "", element: <ServiceDetails /> }, // Relative path
        ],
      },
    ],
  },
  { path: "*", element: <NotFound /> },
]);
