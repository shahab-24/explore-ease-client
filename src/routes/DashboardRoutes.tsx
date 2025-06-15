
import { RouteObject } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import RoleBasedRoute from "./RoleBasedRoute";
import ManageProfile from "../DashboardPages/ManageProfile";
import AddStoryForm from "../DashboardPages/AddStoryForm/AddStoryForm";
import ManageStories from "../DashboardPages/ManageStories/ManageStories";
import MyBookingsPage from "../DashboardPages/MyBookings/MyBookingsPage";
import JoinAsTourGuide from "../DashboardPages/JoinAsTourGuide";
import WelcomeNote from "../components/WelcomeNote";
import MyAssignedTours from "../DashboardPages/GuideDashboard/MyAssignedTours/MyAssignedTours";
import DashboardLayout from './../Layouts/DashboardLayout';
import EditStoryPage from "@/DashboardPages/EditStoryPage/EditStoryPage";
import AddPackageForm from "@/DashboardPages/Admin/AddPackageForm";
import ManageUsers from "@/DashboardPages/Admin/ManageUsers";
import ManageCandidates from "@/DashboardPages/Admin/ManageCandidates";

export const dashboardRoutes: RouteObject = {
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardLayout />
    </ProtectedRoute>
  ),
  children: [
    { path: "", 

        element: (
                <RoleBasedRoute allowedRoles={['tourist', 'admin', 'guide']}>
<WelcomeNote />
                </RoleBasedRoute>
        )
         },

    {
      path: "profile",
      element: <ManageProfile />,
    },
    {
        path:"edit-story/:id",
        element: <EditStoryPage></EditStoryPage>
    },
    {
      path: "become-guide",
      element: (
        <RoleBasedRoute allowedRoles={["tourist"]}>
          <JoinAsTourGuide />
        </RoleBasedRoute>
      ),
    },
    {
      path: "bookings",
      element: (
        <RoleBasedRoute allowedRoles={["tourist"]}>
          <MyBookingsPage />
        </RoleBasedRoute>
      ),
    },
    {
      path: "stories-add",
      element: (
        <RoleBasedRoute allowedRoles={["tourist", "guide"]}>
          <AddStoryForm />
        </RoleBasedRoute>
      ),
    },
    {
      path: "stories-manage",
      element: (
        <RoleBasedRoute allowedRoles={["tourist", "guide"]}>
          <ManageStories />
        </RoleBasedRoute>
      ),
    },
    {
      path: "guide/manage-profile",
      element: (
        <RoleBasedRoute allowedRoles={["guide"]}>
          <ManageProfile />
        </RoleBasedRoute>
      ),
    },
    {
      path: "guide/assigned-tours",
      element: (
        <RoleBasedRoute allowedRoles={["guide"]}>
          <MyAssignedTours />
        </RoleBasedRoute>
      ),
    },

    // ✅ Admin routes can be added like this
    {
      path: "admin/manage-users",
      element: (
        <RoleBasedRoute allowedRoles={["admin"]}>
          <ManageUsers></ManageUsers>
        </RoleBasedRoute>
      ),
    },
    {
        path: 'admin/add-package',
        element: (
                <RoleBasedRoute allowedRoles={['admin']}>
                        <AddPackageForm></AddPackageForm>
                </RoleBasedRoute>
        )
    },
    {
        path: 'admin/manage-candidates',
        element: (
                <RoleBasedRoute allowedRoles={['admin']}>
                <ManageCandidates></ManageCandidates>
                </RoleBasedRoute>
        )
    }
  ],
};
