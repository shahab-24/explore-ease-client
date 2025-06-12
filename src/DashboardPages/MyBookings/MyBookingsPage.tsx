import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import useAuth from "@/components/hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import BookingTable from "@/components/Table/BookingTable";

const MyBookings = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["myBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?email=${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleCancel = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This booking will be canceled!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it!",
    });

    if (confirm.isConfirmed) {
      await axiosSecure.delete(`/bookings/${id}`);
      refetch();
      Swal.fire("Cancelled!", "Your booking has been cancelled.", "success");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-green-700 mb-6">My Bookings</h2>
      <div className="overflow-x-auto">
        {/* <table className="table w-full text-center">
          <thead className="bg-green-100">
            <tr>
              <th>#</th>
              <th>Package</th>
              <th>Guide</th>
              <th>Date</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr key={b._id}>
                <td>{index + 1}</td>
                <td>{b.packageName}</td>
                <td>{b.guideName}</td>
                <td>{new Date(b.tourDate).toLocaleDateString()}</td>
                <td>${b.price}</td>
                <td>
                  <span
                    className={`badge ${
                      b.status === "pending"
                        ? "badge-warning"
                        : b.status === "in review"
                        ? "badge-info"
                        : b.status === "accepted"
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="space-x-2">
                  {b.status === "pending" && (
                    <>
                      <Link to={`/payment/${b._id}`}>
                        <button className="btn btn-sm btn-primary">Pay</button>
                      </Link>
                      <button
                        className="btn btn-sm btn-error"
                        onClick={() => handleCancel(b._id)}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  {b.status !== "pending" && (
                    <span className="text-xs text-gray-500">No actions</span>
                  )}
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table> */}
        <BookingTable bookings={bookings} onCancel={handleCancel}></BookingTable>
        
      </div>
    </div>
  );
};

export default MyBookings;
