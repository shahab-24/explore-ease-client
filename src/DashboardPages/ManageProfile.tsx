import { useState } from "react";
import useAuth from "../components/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import {getUserProfile, updateUserProfile} from '../Types/Api/UserApi'

import EditProfileForm from "@/components/Forms/EditProfileForm";
import { User } from "@/Types/UserTypes";



const ManageProfile = () => {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();

//   const { register, handleSubmit, reset } = useForm({
//     defaultValues: {
//       name: user?.name,
//       photo: user?.photo,
//       phone: user?.phone || "",
//       address: user?.address || "",
//     },
//   });

const {data: profile, refetch} = useQuery<User>({
        queryKey: ['profile', user?.email],
        queryFn: () => getUserProfile(user?.email)
})

//   const updateUserMutation = useMutation({
//     mutationFn: (updatedData) =>
//       axios.put(`/users/profile/${user._id}`, updatedData),
//     onSuccess: () => {
//       Swal.fire({
//         icon: "success",
//         title: "Profile updated successfully!",
//       });
//       setIsEditing(false);
//       reset();
//     },
//   });

const mutation = useMutation({
        mutationFn: (data: Partial<User>) => updateUserProfile(user.email, data),
        onSuccess: () => {
                Swal.fire("Updated!", "Your profile has been updated", "success");
                setEditing(false)
                refetch()
        }
})

if(!profile) return <p>Loading.....</p>

//   const onSubmit = (data) => {
//     updateUserMutation.mutate(data);
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-gray-400 shadow-md rounded-xl">
//       <h1 className="text-2xl font-bold mb-6">Welcome, {user?.name || 'user name'} </h1>

//       <div className="flex flex-col md:flex-row items-center gap-6">
//         <div className="avatar">
//           <div className="w-32 rounded-full">
//             <img src={user?.photo} alt={user?.name} />
//           </div>
//         </div>
//         <div>
//           <p>
//             <strong>Email:</strong> {user?.email}
//           </p>
//           <p>
//             <strong>Role:</strong> {user?.role}
//           </p>
//           <p>
//             <strong>Phone:</strong> {user?.phone || "Not provided"}
//           </p>
//           <p>
//             <strong>Address:</strong> {user?.address || "Not provided"}
//           </p>
//         </div>
//       </div>

//       <div className="mt-6 flex gap-4">
//         <button
//           className="btn btn-primary"
//           onClick={() => setIsEditing(true)}
//         >
//           Edit Profile
//         </button>
//         <button
//           className="btn btn-outline"
//           onClick={() => navigate("/dashboard/become-guide")}
//         >
//           Apply for Tour Guide
//         </button>
//       </div>

//       {isEditing && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-md space-y-4">
//             <h2 className="text-xl font-semibold">Edit Your Info</h2>
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
//               <input
//                 {...register("name")}
//                 type="text"
//                 placeholder="Your Name"
//                 className="input input-bordered w-full"
//               />
//               <input
//                 {...register("photo")}
//                 type="text"
//                 placeholder="Photo URL"
//                 className="input input-bordered w-full"
//               />
//               <input
//                 {...register("phone")}
//                 type="text"
//                 placeholder="Phone Number"
//                 className="input input-bordered w-full"
//               />
//               <input
//                 {...register("address")}
//                 type="text"
//                 placeholder="Address"
//                 className="input input-bordered w-full"
//               />
//               <div className="flex justify-between">
//                 <button type="submit" className="btn btn-success">
//                   Save
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setIsEditing(false)}
//                   className="btn btn-ghost"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );

return (
        <div className="max-w-3xl mx-auto bg-gray-400 p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">Welcome, {profile.name} 👋</h1>
    
          <div className="flex gap-4">
            <img src={profile.photo} alt={profile.name} className="w-24 h-24 rounded-full" />
            <div className="space-y-1">
              <p><strong>Email:</strong> {profile.email}</p>
              <p><strong>Role:</strong> {profile.role}</p>
              <p><strong>Phone:</strong> {profile.phone || "N/A"}</p>
              <p><strong>Address:</strong> {profile.address || "N/A"}</p>
            </div>
          </div>
    
          <div className="mt-4 flex gap-3">
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit</button>
            <button className="btn btn-outline" onClick={() => location.href = "/dashboard/become-guide"}>Apply as Tour Guide</button>
          </div>
    
          {editing && (
            <div className="mt-6 border-t pt-6">
              <EditProfileForm user={profile} onSubmit={(data) => mutation.mutate(data)} />
            </div>
          )}
        </div>
      );
};

export default ManageProfile;
