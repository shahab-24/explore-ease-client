import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import "react-datepicker/dist/react-datepicker.css";
import useAuth from "../../components/hooks/useAuth";
import axios from "axios";
import { motion } from "framer-motion";

const PackageDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [pkg, setPkg] = useState(null);
  const [guides, setGuides] = useState([]);
  const [tourDate, setTourDate] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState("");

  console.log("package id", id);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/packages/${id}`)
      .then((res) => setPkg(res.data));
    axios
      .get("http://localhost:8000/tourGuides?mode=serial")
      .then((res) => setGuides(res.data));
  }, [id]);

  const handleBooking = async () => {
    if (!user)
      return Swal.fire("Login Required", "Please log in to book", "warning");

    const bookingInfo = {
      packageId: id,
      packageName: pkg.name,
      touristName: user.displayName,
      touristEmail: user.email,
      touristImage: user.photoURL,
      price: pkg.price,
      tourDate,
      guideName: selectedGuide,
      status: "pending",
    };

    try {
      await axios.post("http://localhost:8000/bookings", bookingInfo);
      Swal.fire({
        title: "Confirm your Booking",
        text: "Booking submitted! Check My Bookings.",
        icon: "success",
        confirmButtonText: `<a href="/my-bookings" class="text-white">Go to My Bookings</a>`,
        showConfirmButton: true,
      });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  if (!pkg) return <p className="text-center py-20">Loading...</p>;

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      {/* Gallery */}
      ...
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {pkg.images.map((img, i) => (
          <motion.div
            key={i}
            className={`relative overflow-hidden rounded-lg group`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={img}
              alt={`Gallery ${i}`}
              className="object-cover w-full h-40 group-hover:scale-105 transition-transform duration-300"
            />
          </motion.div>
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
          {pkg.tourPlan.map((plan, i) => (
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
              key={g._id}
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
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h3 className="text-xl font-bold mb-4 text-green-700">
          Book Your Trip
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block">Package Name</label>
            <input
              type="text"
              value={pkg.name}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block">Tourist Name</label>
            <input
              type="text"
              value={user?.displayName}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block">Image URL</label>
            <input
              type="text"
              value={user?.photoURL}
              readOnly
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block">Tour Date</label>
            <DatePicker
              selected={tourDate}
              onChange={(date) => setTourDate(date)}
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="block">Select Guide</label>
            <select
              className="select select-bordered w-full"
              value={selectedGuide}
              onChange={(e) => setSelectedGuide(e.target.value)}
            >
              <option disabled value="">
                Choose a Guide
              </option>
              {guides.map((guide) => (
                <option key={guide._id} value={guide.name}>
                  {guide.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleBooking}
            className="btn btn-success w-full mt-4"
          >
            Book Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default PackageDetails;
