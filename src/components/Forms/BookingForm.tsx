import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { BookingFormProps, BookingData } from "@/Types/BookingFormProps";
import useAuth from "../hooks/useAuth";


const BookingForm = ({
  user,
  packageName,
  packagePrice,
  guides,
  onSubmit,
}: BookingFormProps) => {
  const [tourDate, setTourDate] = useState<Date | null>(null);
  const [selectedGuide, setSelectedGuide] = useState("");
  const {loading} = useAuth()

  // Handle form submit
  const handleSubmit = () => {
    if (!tourDate || !selectedGuide) return;

    onSubmit({
      tourDate,
      guideName: selectedGuide,
    });
  };

  return (
    <div className="bg-base-100 dark:bg-base-200 p-6 rounded-lg shadow-md">
      <h3 className="text-2xl font-bold mb-6 text-green-700">
        Book Your Trip
      </h3>

      <div className="space-y-5">
        {/* Package Name */}
        <input
          type="text"
          readOnly
          value={packageName}
          className="input input-bordered w-full"
        />

        {/* Tourist Name */}
        <input
          type="text"
          readOnly
          value={user?.displayName || "Anonymous"}
          className="input input-bordered w-full"
        />

        {/* Email */}
        <input
          type="email"
          readOnly
          value={user?.email || "Not available"}
          className="input input-bordered w-full"
        />

        {/* Tourist Image */}
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt="Tourist"
            className="w-16 h-16 rounded-full border-2 border-green-600"
          />
          <span className="text-sm text-gray-500 dark:text-gray-300">
            Tourist Image
          </span>
        </div>

        {/* Price */}
        <input
          type="text"
          readOnly
          value={`$${packagePrice}`}
          className="input input-bordered w-full"
        />

        {/* Tour Date */}
        <div>
          <label className="block font-medium mb-1">Tour Date</label>
          <DatePicker
            selected={tourDate}
            onChange={(date) => setTourDate(date)}
            className="input input-bordered w-full"
            placeholderText="Select your tour date"
          />
        </div>

        {/* Tour Guide Select */}
        <div>
          <label className="block font-medium mb-1">Select Tour Guide</label>
          <select
            value={selectedGuide}
            onChange={(e) => setSelectedGuide(e.target.value)}
            className="select select-bordered w-full"
          >
            <option value="">-- Choose a guide --</option>
            {guides?.map((guide) => (
              <option key={guide._id} value={guide.name}>
                {guide.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button
  onClick={handleSubmit}
  disabled={!tourDate || !selectedGuide}
  className={`btn btn-success w-full mt-3 ${loading ? "btn-disabled" : ""}`}
>
  {loading ? "Processing..." : "Book Now"}
</button>

      </div>
    </div>
  );
};

export default BookingForm;
