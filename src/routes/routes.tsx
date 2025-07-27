import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import About from "../dasbboard/About";
import AllAdmin from "../dasbboard/AllAdmin/AllAdmin";
import Dashboard from "../dasbboard/dashboard/Dashboard";
import PasswordChange from "../dasbboard/dashboard/PasswordChange";
import FAQ from "../dasbboard/FAQ";
import NotificationPage from "../dasbboard/NotificationPage";
import PackageList from "../dasbboard/packageList/PackageList";
import PrivacyPolicy from "../dasbboard/PrivacyPolicy";
import Profile from "../dasbboard/profile/Profile";
import ReportedUsers from "../dasbboard/ReportedUsers/ReportedUser";
import SubscriberList from "../dasbboard/subscriberList/SubscriberList";
import Support from "../dasbboard/Support";
import TermsCondition from "../dasbboard/TermsCondition";
import UserList from "../dasbboard/userList/UserList";
import ChangePassword from "../pages/authentication/ChangePassword";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import Login from "../pages/authentication/Login";
import NewPassword from "../pages/authentication/NewPassword";
import VerifyOTP from "../pages/authentication/VerifyOTP";
import ErrorPage from "../pages/error/ErrorPage";
import TripHistory from "../dasbboard/TripHistory/TripHistory";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "users-list", element: <UserList /> },
      { path: "all-admin", element: <AllAdmin /> },
      { path: "subscribers", element: <SubscriberList /> },
      { path: "package-list", element: <PackageList /> },
      { path: "support", element: <Support /> },
      { path: "about", element: <About /> },
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms-condition", element: <TermsCondition /> },
      { path: "moderation-reporting", element: <ReportedUsers /> },
      { path: "trip-history", element: <TripHistory /> },

      { path: "password-change", element: <PasswordChange /> },
      { path: "faq", element: <FAQ /> },
      { path: "notification", element: <NotificationPage /> },
      { path: "profile", element: <Profile /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "forget-password", element: <ForgetPassword /> },
  { path: "verify-otp", element: <VerifyOTP /> },
  { path: "new-password", element: <NewPassword /> },
  { path: "change-password", element: <ChangePassword /> },
]);

export default router;
