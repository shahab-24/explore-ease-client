import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";

import useAuth from "@/components/hooks/useAuth";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import GalleryImage from "@/components/GalleryImage";
import BookingForm from "@/components/Forms/BookingForm";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

import { BookingData } from "@/Types/BookingFormProps";
import { BookingInfo } from "@/Types/BookingInfo";
import { Package } from "@/Types/Package";
import { TourGuide } from "@/Types/TourGuide";

const PackageDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [pkg, setPkg] = useState<Package | null>(null);
  const [guides, setGuides] = useState<TourGuide[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch package & guide data
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [pkgRes, guidesRes] = await Promise.all([
          axiosSecure.get<Package>(`/packages/${id}`),
          axiosSecure.get<TourGuide[]>("/tourGuides?mode=serial"),
        ]);
        setPkg(pkgRes.data);
        setGuides(guidesRes.data);
      } catch (err) {
        console.error("Error loading data", err);
        Swal.fire("Error", "Failed to load package details", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, axiosSecure]);

  // ✅ Handle booking submission
  const handleBookingSubmit = async (formData: BookingData) => {
    if (!pkg || !user) return;

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
      await axiosSecure.post("/bookings", bookingInfo);
      Swal.fire({
        title: "Booking Confirmed!",
        text: "Check your bookings for details.",
        icon: "success",
        confirmButtonText: "Go to My Bookings",
      });
      navigate("/dashboard/bookings");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong while booking.", "error");
    }
  };

  if (loading || !pkg) return <LoadingSpinner />;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16 space-y-12">
      {/* ✅ Gallery */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {pkg.images.map((img, i) => (
          <GalleryImage key={i} src={img} alt={`Gallery ${i}`} index={i} />
        ))}
      </div>

      {/* ✅ About Section */}
      <div>
        <h2 className="text-3xl font-bold text-green-700 mb-2">{pkg.name}</h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{pkg.description}</p>
      </div>

      {/* ✅ Tour Plan */}
      <div>
        <h3 className="text-2xl font-semibold text-green-600 mb-4">Tour Plan</h3>
        <ul className="space-y-3">
          {pkg?.tourPlan?.map((plan, i) => (
            <li key={i} className="bg-base-100 shadow-md p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-bold text-lg">Day {plan.day}: {plan.title}</h4>
              <p className="text-gray-600 dark:text-gray-300">{plan.details}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* ✅ Tour Guides */}
      <div>
        <h3 className="text-2xl font-semibold text-green-600 mb-4">Our Tour Guides</h3>
        <div className="overflow-x-auto">
          <div className="flex gap-6">
            {guides.map((g) => (
              <Link key={g._id} to={`/tourGuidesProfile/${g._id}`}>
                <motion.div
                  className="transform rotate-45 w-32 h-32 bg-base-200 shadow hover:shadow-lg transition flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="transform -rotate-45 text-center">
                    <img
                      src={g.photo}
                      alt={g.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-gray-700 mx-auto"
                    />
                    <p className="text-sm font-semibold mt-1">{g.name}</p>
                    <p className="text-xs text-gray-500">{g.specialty}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Booking Form */}
      <div className="mt-8">
        {user ? (
          <BookingForm
            user={user}
            packageName={pkg.name}
            packagePrice={pkg.price}
            guides={guides}
            onSubmit={handleBookingSubmit}
          />
        ) : (
          <Link to="/login">
            <button className="btn btn-warning w-full">
              Please Login to Book
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default PackageDetails;
