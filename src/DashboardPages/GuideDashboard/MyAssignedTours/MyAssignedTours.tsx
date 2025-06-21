import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";


interface AssignedTour {
  _id: string;
  packageName: string;
  touristName: string;
  tourDate: string;
  tourPrice: number;
  status: "pending" | "in-review" | "accepted" | "rejected";
}

const MyAssignedTours: React.FC = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { data: tours, isLoading } = useQuery<AssignedTour[]>({
    queryKey: ["assigned-tours"],
    queryFn: () =>
      axiosSecure.get("/tourGuide/assigned-tours").then((res) => res.data),
  });
//   console.log(tours)

  const updateStatusMutation = useMutation({
    mutationFn: async ({
      tourId,
      status,
    }: {
      tourId: string;
      status: "accepted" | "rejected";
    }) => {
      await axiosSecure.patch(`/tourGuide/tours/${tourId}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assigned-tours"] });
    },
  });

  const handleAccept = (tourId: string) => {
    updateStatusMutation.mutate({ tourId, status: "accepted" });
  };

  const handleReject = (tourId: string) => {
    Swal.fire({
      title: "Reject this tour?",
      text: "Are you sure you want to reject this assignment?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatusMutation.mutate({ tourId, status: "rejected" });
      }
    });
  };

  return (
    <div className="p-6 space-y-4 bg-gray-700 text-white">
      <h2 className="text-2xl font-bold text-primary"> My Assigned Tours</h2>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Package</th>
                <th>Tourist</th>
                <th>Date</th>
                <th>Price</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours?.map((tour) => (
                <tr key={tour._id}>
                  <td>{tour.packageName}</td>
                  <td>{tour.touristName}</td>
                  <td>{new Date(tour.tourDate).toLocaleDateString()}</td>
                  <td>${tour.tourPrice?.toFixed(2)}</td>
                  <td>
                    <span className={`badge capitalize ${tour.status === 'accepted' ? 'badge-success' : tour.status === 'rejected' ? 'badge-error' : 'badge-warning'}`}>
                      {tour.status}
                    </span>
                  </td>
                  <td className="flex gap-2 justify-center">
                    <button
                      className="btn btn-sm btn-success"
                      disabled={tour.status !== "in-review"}
                      onClick={() => handleAccept(tour._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-sm btn-error"
                      disabled={tour.status !== "in-review"}
                      onClick={() => handleReject(tour._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
              {tours?.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-gray-500 py-6">
                    No assigned tours found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssignedTours;
