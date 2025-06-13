import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import { motion } from "framer-motion";
import useAuth from "../../components/hooks/useAuth";
import BookingForm from "@/components/Forms/BookingForm";
import { BookingData } from "../../Types/BookingFormProps";
import { BookingInfo } from "@/Types/BookingInfo";
import { Package } from "@/Types/Package";
import { TourGuide } from "@/Types/TourGuide";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import GalleryImage from "@/components/GalleryImage";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [tourDate, setTourDate] = useState<Date | null>(null);
  const [selectedGuide, setSelectedGuide] = useState<string>("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    if (!id) return;

    axios
      .get<Package>(`${import.meta.env.VITE_API_URL}/packages/${id}`)
      .then((res) => setPkg(res.data))
      .catch((err) => console.error(err));

    axios
      .get<TourGuide[]>(
        `${import.meta.env.VITE_API_URL}/tourGuides?mode=serial`
      )
      .then((res) => setGuides(res.data))
      .catch((err) => console.error(err));
  }, [id]);

//   const handleBooking = async () => {
//     if (!user) {
//       Swal.fire("Login Required", "Please log in to book", "warning");
//       return;
//     }
//     if (!pkg) return;

//     const bookingInfo: BookingInfo = {
//       packageId: pkg._id,
//       packageName: pkg.name,
//       touristName: user.displayName,
//       touristEmail: user.email,
//       touristImage: user.photoURL,
//       price: pkg.price,
//       tourDate,
//       guideName: selectedGuide,
//     };

//     try {
//       await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingInfo);
//       await Swal.fire({
//         title: "Confirmed your Booking",
//         text: "Booking submitted! Check My Bookings.",
//         icon: "success",
//         confirmButtonText: "Go to My Bookings",
//         showConfirmButton: true,
//       });
//       navigate(`/dashboard/bookings`);
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

  if (!pkg) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {pkg.images.map((img, i) => (
          <GalleryImage key={i} src={img} alt={`Gallery ${i}`} index={i} />
        ))}
      </div>

      {/* About */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-green-700 mb-2">{pkg.name}</h2>
        <p className="text-gray-700">{pkg.description}</p>
      </div>

      {/* Tour Plan */}
      <div className="mb-8">
        <h3 className="text-2xl font-semibold text-green-600 mb-4">
          Tour Plan
        </h3>
        <ul className="space-y-3">
          {pkg?.tourplan?.map((plan, i) => (
            <li key={i} className="bg-base-100 shadow p-4 rounded-lg">
              <h4 className="font-bold">
                Day {plan.day}: {plan.title}
              </h4>
              <p className="text-sm text-gray-600">{plan.details}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Tour Guides with Diamond Shape and Hover */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-6 px-2">
          {guides.map((g) => (
            <Link key={g._id} to={`/tourGuidesProfile/${g._id}`}>
              <motion.div
                className="relative transform rotate-45 w-32 h-32 bg-base-200 shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                tabIndex={0}
              >
                <div className="transform -rotate-45 flex flex-col items-center">
                  <img
                    src={g.photo}
                    alt={g.name}
                    className="w-16 h-16 rounded-full object-cover mb-1 border-2 border-white dark:border-gray-700"
                  />
                  <p className="text-xs font-semibold text-center">{g.name}</p>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 text-center">
                    {g.specialty}
                  </p>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      {user ? (
        <BookingForm
          user={user}
          packageName={pkg.name}
          packagePrice={pkg.price}
          guides={guides}
          onSubmit={async (formData: BookingData) => {
            const bookingInfo: BookingInfo = {
              packageId: pkg._id,
              packageName: pkg.name,
              touristName: user.displayName,
              touristEmail: user.email,
              touristImage: user.photoURL,
              price: pkg.price,
              tourDate: formData.tourDate,
              guideName: formData.guideName,
            };

            try {
              await axiosSecure.post(
                `${import.meta.env.VITE_API_URL}/bookings`,
                bookingInfo
              );
              Swal.fire({
                title: "Confirm your Booking",
                text: "Booking submitted! Check My Bookings.",
                icon: "success",
                confirmButtonText: "Go to My Bookings",
              });
              navigate(`/dashboard/bookings`);
            } catch (err) {
              console.error(err);
              Swal.fire("Error", "Something went wrong", "error");
            }
          }}
        />
      ) : (
        <Link to="/login">
          <button className="btn btn-warning w-full">
            Please Login to Book
          </button>
        </Link>
      )}
    </section>
  );
};

export default PackageDetails;
