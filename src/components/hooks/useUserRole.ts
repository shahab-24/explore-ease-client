import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

type Role = "admin" | "tourist" | "tourGuide";

interface RoleResponse {
  role: Role;
}

const useUserRole = () => {
        const { user } = useAuth();
        const axiosSecure = useAxiosSecure();
      
        const {
          data,
          isLoading,
          isError,
          error,
        } = useQuery<RoleResponse>({
          queryKey: ["role-data", user?.email],
          enabled: !!user?.email,
          queryFn: async () => {
            const res = await axiosSecure.get(`/users/role?email=${user?.email}`);
            return res.data;
          },
          retry: 1, 
          staleTime: 5 * 60 * 1000,
        });

        console.log(data?.role, 'use role')
      
        return {
          role: data?.role || null,
          isLoading,
          isError,
          error,
        };
      };
      

export default useUserRole;
