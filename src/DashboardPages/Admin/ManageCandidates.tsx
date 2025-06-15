// 📁 src/DashboardPages/Admin/ManageCandidates.tsx
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import Swal from "sweetalert2";
import { useState } from "react";

interface Candidate {
  _id: string;
  userEmail: string;
  title: string;
  reason: string;
  cvLink: string;
  status: "pending";
  appliedAt: string;
}

const ManageCandidates = () => {
  const axiosSecure = useAxiosSecure();
  const [loadingId, setLoadingId] = useState<string | null>(null);


  const { data: candidates, isLoading, refetch } = useQuery<Candidate[]>({
    queryKey: ["guide-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/guide-requests");
      return res.data;
    },
  });

 
  const acceptMutation = useMutation({
    mutationFn: async (candidate: Candidate) => {
      setLoadingId(candidate._id);
      await axiosSecure.patch(`/admin/users/upgrade-role`, {
        email: candidate.userEmail,
        newRole: "TourGuide",
      });
      await axiosSecure.delete(`/admin/guide-requests/${candidate._id}`);
    },
    onSuccess: () => {
      Swal.fire("Success", "User upgraded to Tour Guide", "success");
      refetch();
      setLoadingId(null);
    },
  });

 
  const rejectMutation = useMutation({
    mutationFn: async (id: string) => {
      setLoadingId(id);
      await axiosSecure.delete(`/admin/guide-requests/${id}`);
    },
    onSuccess: () => {
      Swal.fire("Rejected", "Application has been removed", "info");
      refetch();
      setLoadingId(null);
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-6">Manage Candidates</h2>
      {candidates?.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No pending applications.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full bg-base-100 dark:bg-base-200">
            <thead>
              <tr>
                <th>Email</th>
                <th>Title</th>
                <th>Reason</th>
                <th>CV</th>
                <th>Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {candidates?.map((c) => (
                <tr key={c._id}>
                  <td>{c.userEmail}</td>
                  <td>{c.title}</td>
                  <td>{c.reason.slice(0, 50)}...</td>
                  <td>
                    <a
                      href={c.cvLink}
                      className="link text-blue-500 underline"
                      target="_blank"
                    >
                      View CV
                    </a>
                  </td>
                  <td>{new Date(c.appliedAt).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button
                      onClick={() => acceptMutation.mutate(c)}
                      className="btn btn-success btn-xs"
                      disabled={loadingId === c._id}
                    >
                      {loadingId === c._id ? "..." : "Accept"}
                    </button>
                    <button
                      onClick={() => rejectMutation.mutate(c._id)}
                      className="btn btn-error btn-xs"
                      disabled={loadingId === c._id}
                    >
                      {loadingId === c._id ? "..." : "Reject"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageCandidates;
