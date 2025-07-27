import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { GiTripleBeak } from "react-icons/gi";
import { GoPackage } from "react-icons/go";
import { GrUserSettings } from "react-icons/gr";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiVipCrownFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "",
    icon: <RxDashboard  size={20}/>
  },
  {
    key: "all-users",
    label: "All User",
    path: "users-list",
    icon: <FaRegCircleUser size={20}/>
  },
  {
    key: "trip-history",
    label: "Trip History",
    path: "trip-history",
    icon: <GiTripleBeak size={20}/>
  },
  {
    key: "all-admin",
    label: "Manage Admin",
    path: "all-admin",
    icon: <GrUserSettings size={20}/>
  },
  {
    key: "moderation-reporting",
    label: "Moderation & Report",
    path: "moderation-reporting",
    icon: <GrUserSettings size={20}/>
  },
  {
    key: "subscribers",
    label: "Subscriber's List",
    path: "subscribers",
    icon: <RiVipCrownFill size={20}/> 
  },
  {
    key: "package",
    label: "Package",
    path: "package-list",
    icon: <GoPackage size={20}/>
  },
  {
    key: "password-change",
    label: "Change Password",
    path: "password-change",
    icon: <CiLock size={20}/>
  },
  {
    key: "faq",
    label: "FAQ",
    path: "faq",
    icon: <AiOutlineSafetyCertificate size={20}/>
  },
  {
    key: "about",
    label: "About Us",
    path: "about",
    icon: <PiUsersThreeLight size={20}/>
  },
  
  {
    key: "terms-condition",
    label: "Terms & Condition",
    path: "terms-condition",
    icon: <IoDocumentTextOutline size={20}/>
  },
  {
    key: "support",
    label: "Help & Support",
    path: "support",
    icon: <BiSupport size={20}/>
  },
];
