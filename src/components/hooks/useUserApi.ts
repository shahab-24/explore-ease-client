
import { User } from "@/Types/UserTypes";
import useAxiosSecure from "./useAxiosSecure";

const useUserApi = () => {
  const axiosSecure = useAxiosSecure();

  const getUserProfile = async (email: string): Promise<User> => {
    const res = await axiosSecure.get(`/users/profile?email=${email}`);
    return res.data;
  };

  const updateUserProfile = async (
    email: string,
    data: Partial<User>
  ): Promise<User> => {
    const res = await axiosSecure.put(`/users/profile`, { ...data, email });
    return res.data;
  };

  return {
    getUserProfile,
    updateUserProfile,
  };
};

export default useUserApi;
