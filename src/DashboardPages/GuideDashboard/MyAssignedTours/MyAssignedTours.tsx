import useAuth from "@/components/hooks/useAuth";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";

import Swal from "sweetalert2";

const MyAssignedTours = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["assignedTours", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/assigned?guide=${user?.displayName}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const updateStatus = async (id: string, status: "accepted" | "rejected") => {
    const confirm = await Swal.fire({
      title: `Are you sure you want to ${status}?`,
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.patch(`/bookings/${id}/status`, { status });
      Swal.fire("Updated!", "Status changed", "success");
      refetch();
    }
  };

  return (
    <div className="overflow-x-auto bg-base-100 dark:bg-base-200 p-4 rounded">
      <h2 className="text-xl font-bold mb-4">My Assigned Tours</h2>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Package</th>
            <th>Tourist</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b._id}>
              <td>{b.packageName}</td>
              <td>{b.touristName}</td>
              <td>{new Date(b.tourDate).toLocaleDateString()}</td>
              <td>${b.price}</td>
              <td>{b.status}</td>
              <td className="space-x-2">
                <button
                  onClick={() => updateStatus(b._id, "accepted")}
                  disabled={b.status !== "in-review"}
                  className="btn btn-xs btn-success"
                >
                  Accept
                </button>
                <button
                  onClick={() => updateStatus(b._id, "rejected")}
                  disabled={b.status !== "in-review"}
                  className="btn btn-xs btn-error"
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAssignedTours;
