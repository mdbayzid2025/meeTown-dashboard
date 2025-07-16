import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import ErrorPage from '../pages/error/ErrorPage'
import Dashboard from '../dasbboard/dashboard/Dashboard';
import Login from '../pages/authentication/Login';
import ForgetPassword from '../pages/authentication/ForgetPassword';
import VerifyOTP from '../pages/authentication/VerifyOTP';
import NewPassword from '../pages/authentication/NewPassword';
import ChangePassword from '../pages/authentication/ChangePassword';

 const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children:[
            {path: "/", element: <Dashboard />},
        ]
    },
    {path: "login", element: <Login />},
    {path: "forget-password", element: <ForgetPassword />},
    {path: "verify-otp", element: <VerifyOTP />},
    {path: "new-password", element: <NewPassword />},
    {path: "change-password", element: <ChangePassword />},
])

export default router;