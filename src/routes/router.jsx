import { createBrowserRouter } from "react-router";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import StoriesPage from "../Pages/StoriesPage/StoriesPage";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import TourGuideProfilePage from "../Pages/TourGuideProfilePage/TourGuideProfilePage";
import MyBookingsPage from "../Pages/MyBookings/MyBookingsPage";
import StoryDetailsPage from "../Pages/StoryDetailsPage/StoryDetailsPage";
import AboutMePage from "../Pages/About/AboutMePage";
import AllTripsPage from "../Pages/AllTripsPage/AllTripsPage";
import TripsDetailsPage from "../Pages/TripDetails/TripDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageProfile from "../DashboardPages/ManageProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h3>page not created or not found 404</h3>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      { path: "login",
         element: <Login></Login>
         },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "all-stories",
        element: <StoriesPage></StoriesPage>,
      },
      {
        path: "packages/:id",
        element: <PackageDetails></PackageDetails>,
      },
      {
        path: "tourGuidesProfile/:id",
        element: <TourGuideProfilePage></TourGuideProfilePage>,
      },
      {
        path: "my-bookings/:id",
        element: <MyBookingsPage></MyBookingsPage>,
      },
      {
        path: "stories/:id",
        element: <StoryDetailsPage></StoryDetailsPage>,
      },
      {
        path: "about",
        element: <AboutMePage></AboutMePage>,
      },
      {
        path: "trips",
        element: <AllTripsPage></AllTripsPage>,
      },
      {
        path: "trips/:id",
        element: <TripsDetailsPage></TripsDetailsPage>,
      },
    ],
  },

//   dashboard Layout
{
        
                
                        path: '/dashboard',
                        element: <DashboardLayout></DashboardLayout>, 
                        children: [
                                {
                                        path: 'profile',
                                        element:<ManageProfile></ManageProfile>
                                }
                        ]
                
        
}
]);
