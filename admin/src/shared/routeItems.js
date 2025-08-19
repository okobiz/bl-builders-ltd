import { MdOutlineEventAvailable, MdOutlineWorkOutline } from "react-icons/md";
import {
  IoBookOutline,
  IoImageOutline,
  IoNewspaperOutline,
  IoVideocamOutline,
} from "react-icons/io5";
import { RiNumbersLine } from "react-icons/ri";
import { LuBookCheck, LuContact, LuImages, LuInfo } from "react-icons/lu";
import { ImProfile } from "react-icons/im";
import { MdOutlineHomeRepairService } from "react-icons/md";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { SlPeople } from "react-icons/sl";
import { BsGraphUpArrow } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";

export const menuItems = [
  {
    key: "homepage",
    label: "Homepage",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "banners", label: "Banners", icon: IoImageOutline },
      { key: "about-us", label: "About Us", icon: LuInfo },
      { key: "latest-gallery", label: "Latest Gallery", icon: LuImages },
    ],
  },
  {
    key: "aboutpage",
    label: "AboutPage",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "our-team", label: "Our Team", icon: GrGroup },
      { key: "profile", label: "About Profile", icon: ImProfile },
    ],
  },
  {
    key: "productpage",
    label: "ProductPage",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "service", label: "Product", icon: MdOutlineHomeRepairService },
    ],
  },
  {
    key: "profilepage",
    label: "ProfilePage",
    icon: MdOutlineHomeRepairService,
    children: [{ key: "brochure", label: "Profile", icon: IoBookOutline }],
  },
  {
    key: "gallerypage",
    label: "GalleryPage",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "gallery", label: "Gallery", icon: LuImages },
      { key: "video", label: "Video", icon: IoVideocamOutline },
    ],
  },
  {
    key: "carrerpage",
    label: "CareerPage",
    icon: MdOutlineHomeRepairService,
    children: [
      { key: "careers", label: "Careers", icon: MdOutlineWorkOutline },
      { key: "job-applicants", label: "Job Applicant", icon: SlPeople },
    ],
  },
  {
    key: "contactpage",
    label: "ContactPage",
    icon: MdOutlineHomeRepairService,
    children: [{ key: "contact", label: "Messages", icon: LuContact }, ,],
  },
];
