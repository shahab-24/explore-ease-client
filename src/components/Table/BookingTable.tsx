import { Link } from "react-router";

export type Booking = {
  _id: string;
  packageName: string;
  guideName: string;
  tourDate: string;
  price: number;
  selectedGuide: {
        name: string,
        email: string
  }
  status: string;
};

export type Props = {
  bookings: Booking[];
  onCancel?: (id: string) => void;
};

const BookingTable = ({ bookings, onCancel }: Props) => {
  return (
    <div className="overflow-x-auto shadow rounded bg-base-100 dark:bg-base-200">
      <table className="table table-zebra w-full text-center">
        <thead className="bg-green-200 dark:bg-green-900">
          <tr>
            <th>#</th>
            <th>Package</th>
            <th>Guide</th>
            <th>Date</th>
            <th>Price</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b, i) => (
            <tr key={b._id}>
              <td>{i + 1}</td>
              <td>{b.packageName}</td>
              <td>{b.selectedGuide?.name}</td>
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
              <td className="flex justify-center gap-2">
                {b.status === "pending" && (
                  <>
                    <Link
                      to={`/payment/${b._id}`}
                      className="btn btn-xs btn-primary"
                    >
                      Pay
                    </Link>
                    <button
                      onClick={() => onCancel?.(b._id)}
                      className="btn btn-xs btn-error"
                    >
                      Cancel
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {bookings.length === 0 && (
        <p className="text-center p-4 text-gray-400">No bookings yet.</p>
      )}
    </div>
  );
};

export default BookingTable;
