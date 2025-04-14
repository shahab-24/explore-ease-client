import {
        createBrowserRouter,
        
      } from "react-router";


export const router = createBrowserRouter([
        {
          path: "/",
          element:<div className="text-center bg-purple-400">Hello
          <button className="btn btn-secondary btn-lg">click</button></div>,
        },
      ]);