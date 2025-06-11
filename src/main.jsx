import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router";
import { router } from "./routes/router.jsx";
import AuthProvider from "./Providers/AuthProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
   <AuthProvider>
      <div className="bg-gray-200">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
   </QueryClientProvider>
    
  </StrictMode>
);
