import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface TourGuide {
        _id: string;
        name: string;
        email: string;
        photo: string;
        phone?: string;
        bio?: string;
        specialty?: string;
        role: "tourGuide";
        stories: any[];
        createdAt: string;
      }
      
const DebugTourGuides: React.FC = () => {
  const { data: guides, isLoading, error } = useQuery<TourGuide[]>({
    queryKey: ["debug-tour-guides"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/debug/tourguides`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Failed to load guides.</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-center text-primary mb-6">Latest Tour Guides</h2>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="table w-full table-zebra bg-base-100 dark:bg-base-200">
          <thead>
            <tr className="text-base-content text-sm md:text-base">
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialty</th>
              <th>Bio</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {guides?.map((guide) => (
              <tr key={guide?._id}>
                <td>
                  <img
                    src={guide?.photo}
                    alt={guide?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </td>
                <td>{guide?.name}</td>
                <td>{guide?.email}</td>
                <td>{guide?.specialty || "—"}</td>
                <td className="max-w-xs truncate">{guide?.bio || "—"}</td>
                <td className="max-w-xs truncate">{guide?.role || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DebugTourGuides;
