import axios from "axios";
import React, { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});



const useAxiosSecure = () => {
  const { logOut, setLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {


    const requestInterceptor = axiosSecure.interceptors.request.use(
      function (config) {
        // setLoading(true);
        return config;
      },
      async (error) => {
        // setLoading(false);

        return Promise.reject(error);
      }
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      function (res) {
        // setLoading(false);
        return res;
      },
      async function (error) {
        const status = error.response?.status;

        if (status === 401) {
          try {
            await logOut();
            console.log("unauthorised access");
          } catch (error) {
            console.error("logout failed", error);
          } finally {
            navigate("/login");
          }
        } else if (status === 403) {
          console.warn("forbidden access");
        }
        return Promise.reject(error);
      }
    );


//     unmount==========
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };


  }, [logOut, navigate, setLoading]);

  return axiosSecure;
};

export default useAxiosSecure;
