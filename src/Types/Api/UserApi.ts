import useAxiosPublic from "@/components/hooks/useAxiosPublic"
import { User } from "../UserTypes"
import axios from 'axios'
const axiosPublic = useAxiosPublic()

export const getUserProfile = async(email: string): Promise<User> => {
        const res = await axiosPublic.get(`/users/profile?email=${email}`)
        return res.data;

}

export const updateUserProfile = async (email:string, data: Partial<User>): Promise <User> => {
        const res = await axiosPublic.put(`/users/profile`, {...data, email})
        return res.data
}