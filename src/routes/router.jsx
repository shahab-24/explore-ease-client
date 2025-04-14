import {
        createBrowserRouter,
        
      } from "react-router";

import MainLayout from "../Layouts/MainLayout";
import Home from "../Home/Home";


export const router = createBrowserRouter([
        {
          path: "/",
          element:<MainLayout></MainLayout>,
          children: [{
                path: '/',
                element: <Home></Home>
          }]
        },
      ]);