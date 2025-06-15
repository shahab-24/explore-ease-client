import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { User } from "../UserTypes"
const axiosSecure = useAxiosSecure()

export const getUserProfile = async(email: string): Promise<User> => {
        const res = await axiosSecure.get(`/users/profile?email=${email}`)
        return res.data;

}

export const updateUserProfile = async (email:string, data: Partial<User>): Promise <User> => {
        const res = await axiosSecure.put(`/users/profile`, {...data, email})
        return res.data
}