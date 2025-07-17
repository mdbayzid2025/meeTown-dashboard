import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ErrorPage from '../pages/error/ErrorPage'
import Dashboard from '../dasbboard/dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOTP from '../pages/authentication/VerifyOTP';
import NewPassword from '../pages/authentication/NewPassword';
import ChangePassword from '../pages/authentication/ChangePassword';
import UserList from '../dasbboard/userList/UserList';
import SubscriberList from '../dasbboard/subscriberList/SubscriberList';
import PackageList from '../dasbboard/packageList/PackageList';
import Support from '../dasbboard/Support';
import About from '../dasbboard/About';
import PrivacyPolicy from '../dasbboard/PrivacyPolicy';
import PasswordChange from '../dasbboard/dashboard/PasswordChange';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <Dashboard /> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "users-list", element: <UserList /> },
            { path: "subscribers", element: <SubscriberList /> },
            { path: "package-list", element: <PackageList /> },            
            { path: "support", element: <Support /> },
            { path: "about", element: <About /> },
            { path: "privacy-policy", element: <PrivacyPolicy /> },
            { path: "terms-condition", element: <PrivacyPolicy /> },
             { path: "password-change", element: <PasswordChange /> },
             { path: "faq", element: <PasswordChange /> },
        ]
    },
    { path: "login", element: <Login /> },
    { path: "forget-password", element: <ForgetPassword /> },
    { path: "verify-otp", element: <VerifyOTP /> },
    { path: "new-password", element: <NewPassword /> },
    { path: "change-password", element: <ChangePassword /> },
])

export default router;