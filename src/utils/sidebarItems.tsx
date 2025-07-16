import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BiSupport } from "react-icons/bi";
import { CiLock } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { GoPackage } from "react-icons/go";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PiUsersThreeLight } from "react-icons/pi";
import { RiVipCrownFill } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export const sidebarItems = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "dashboard",
    icon: <RxDashboard  size={20}/>
  },
  {
    key: "all-users",
    label: "All User",
    path: "users-list",
    icon: <FaRegCircleUser size={20}/>
  },
  {
    key: "subscription",
    label: "Subscription",
    path: "subscription",
    icon: <RiVipCrownFill /> 
  },
  {
    key: "package",
    label: "Package",
    path: "package",
    icon: <GoPackage />
  },
  {
    key: "change-password",
    label: "Change Password",
    path: "change-password",
    icon: <CiLock />
  },
  {
    key: "about-us",
    label: "About Us",
    path: "about-us",
    icon: <PiUsersThreeLight />
  },
  {
    key: "privacy-policy",
    label: "Privacy Policy",
    path: "privacy-policy",
    icon: <AiOutlineSafetyCertificate />
  },
  {
    key: "terms-condition",
    label: "Terms & Condition",
    path: "terms-condition",
    icon: <IoDocumentTextOutline />
  },
  {
    key: "help-support",
    label: "Help & Support",
    path: "help-support",
    icon: <BiSupport />
  },
];
