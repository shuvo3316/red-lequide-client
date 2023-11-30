import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoutes/PrivateRoute";
import CreateDonationRequest from "../Pages/Dashboard/DonationRequest/CreateDonationRequest";
import MyDonationRequest from "../Pages/Dashboard/DonationRequest/MyDonationRequest";
import WelcomeDashboard from "../Pages/Dashboard/WelcomeDashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import UpdateDonation from "../Pages/Dashboard/Updatedonation/UpdateDonation";
import AllUser from "../Pages/Dashboard/AllUser/AllUser";
import AdminRoutes from "./PrivateRoutes/AdminRoutes";
import Welcomedashboard2 from "../Pages/Dashboard/Welcomedashboard2";
import AllBloodRequest from "../Pages/Dashboard/AllUser/AllBloodRequest";
import ContentManagement from "../Pages/Dashboard/AllUser/ContentManagement";
import Blogs from "../Pages/Blogs/AddBlog";
import path from "path";
import { element } from "prop-types";
import AddBlog from "../Pages/Blogs/AddBlog";



 export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children:[
        {
            path:'/',
            element:<Home></Home>
        },
        {
            path:'/login',
            element:<Login></Login>
        },
        {
            path:'/blogs',
            element:<Blogs></Blogs>
        },
        {
            path:'/signup',
            element:<SignUp></SignUp>
        },
      ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children:[
            {
                path:'/dashboard',
                element:<PrivateRoute><WelcomeDashboard></WelcomeDashboard></PrivateRoute>

            },
            {
                path:'create-donation-request',
                element:<CreateDonationRequest></CreateDonationRequest>

            },
            {
                path:'my-donation-request',
                element:<MyDonationRequest></MyDonationRequest>

            },
            {
                path:'profile',
                element:<PrivateRoute><Profile></Profile></PrivateRoute>

            },
            {
                path:'my-donation-request/dpdaterequest/:id',
                element:<PrivateRoute><UpdateDonation></UpdateDonation></PrivateRoute>,
                loader: ({params})=>fetch(`http://localhost:5000/blood-request/${params.id}`)

            },
            // admin panel 
            {
                path:'all-users',
                element:<PrivateRoute><AllUser></AllUser></PrivateRoute>,

            },
            {
                path:'all-blood-request',
                element:<AllBloodRequest></AllBloodRequest>

            },
            {
                path:'content-management',
                element:<ContentManagement></ContentManagement>,
                

            },
            {
                path:'content-management/add-blog',
                element:<AddBlog></AddBlog>
               }
         
        ]
    }
  ]);