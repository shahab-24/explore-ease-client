import { createBrowserRouter } from "react-router";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import StoriesPage from "../Pages/StoriesPage/StoriesPage";
import PackageDetails from "../Pages/PackageDetails/PackageDetails";
import TourGuideProfilePage from "../Pages/TourGuideProfilePage/TourGuideProfilePage";

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
    ],
  },
]);
