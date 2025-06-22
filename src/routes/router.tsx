import { createBrowserRouter } from "react-router";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import StoriesPage from "../Pages/StoriesPage/StoriesPage";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import TourGuideProfilePage from "../Pages/TourGuideProfilePage/TourGuideProfilePage";
import MyBookingsPage from "../DashboardPages/MyBookings/MyBookingsPage";
import StoryDetailsPage from "../Pages/StoryDetailsPage/StoryDetailsPage";
import AboutMePage from "../Pages/About/AboutMePage";
import AllTripsPage from "../Pages/AllTripsPage/AllTripsPage";
import TripsDetailsPage from "../Pages/TripDetails/TripDetailsPage";
import DashboardLayout from "../Layouts/DashboardLayout";
import ManageProfile from "../DashboardPages/ManageProfile";
import WelcomeNote from "../components/WelcomeNote";
import JoinAsTourGuide from "../DashboardPages/JoinAsTourGuide";
import AddStoryForm from "../DashboardPages/AddStoryForm/AddStoryForm";
import ManageStories from "../DashboardPages/ManageStories/ManageStories";
import EditStoryPage from "../DashboardPages/EditStoryPage/EditStoryPage";
import MyAssignedTours from '../DashboardPages/GuideDashboard/MyAssignedTours/MyAssignedTours';
import { dashboardRoutes } from "./DashboardRoutes";
import StripeProvider from "@/components/StripeProvider/StripeProvider";
import PaymentPage from "@/Pages/PaymentPage/PaymentPage";

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

      { path: "login", element: <Login></Login> },
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
        path:'payment/:id',
        element: <StripeProvider>
                <PaymentPage></PaymentPage>
        </StripeProvider>
      },
      {
        path: "tourGuidesProfile/:id",
        element: <TourGuideProfilePage></TourGuideProfilePage>,
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
//   {
//     path: "/dashboard",
//     element: <DashboardLayout></DashboardLayout>,
//     children: [
//       {
//         path: "profile",
//         element: <ManageProfile></ManageProfile>,
//       },
//       {
//         path: "",
//         element: <WelcomeNote></WelcomeNote>,
//       },
//       {
//         path: "become-guide",
//         element: <JoinAsTourGuide></JoinAsTourGuide>,
//       },
//       //       tourist pages===============
//       {
//         path: "bookings",
//         element: <MyBookingsPage></MyBookingsPage>,
//       },
//       {
//         path: "stories-add",
//         element: <AddStoryForm></AddStoryForm>,
//       },
//       {
//         path: "stories-manage",
//         element: <ManageStories></ManageStories>,
//       },
//       {
//         path: "edit-story/:id",
//         element: <EditStoryPage></EditStoryPage>,
//       },

//       //       guide route=================================
//       {
//         path: "guide/add-story",
//         element: <AddStoryForm></AddStoryForm>,
//       },
//       {
//         path: "guide/manage-stories",
//         element: <ManageStories></ManageStories>,
//       },
//       {
//         path:'guide/manage-profile',
//         element: <ManageProfile></ManageProfile>
//       },
//       {
//         path: "gudie/assigned-tours",
//         element: <MyAssignedTours></MyAssignedTours>
//       }
//     ],
//   },
  dashboardRoutes
]);
