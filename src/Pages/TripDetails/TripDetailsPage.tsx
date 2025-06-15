import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";

const TripsDetailsPage = () => {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/trips/${id}`).then((res) => {
      setTrip(res.data);
    });
  }, [id]);

  if (!trip) {
    return <div className="text-center mt-10 text-green-700 text-xl">Loading trip details...</div>;
  }

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      <motion.div
        className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Trip Image */}
        <img
          src={trip.images?.[0]}
          alt={trip.name}
          className="w-full h-80 object-cover"
        />

        {/* Trip Details */}
        <div className="p-6 md:p-10 space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700">{trip.name}</h2>

          {/* Optional Visual Enhancements */}
          <div className="flex flex-wrap gap-4 text-gray-600 text-sm font-medium">
            <span className="flex items-center gap-1">
              📍 <span>{trip.location || "Unknown location"}</span>
            </span>
            <span className="flex items-center gap-1">
              🕒 <span>{trip.duration || "3 Days"}</span>
            </span>
            <span className="flex items-center gap-1">
              💵 <span>${trip.price}</span>
            </span>
          </div>

          <p className="text-gray-700 text-base leading-relaxed">
            {trip.description}
          </p>

          {/* Features list if available */}
          {trip.features && trip.features.length > 0 && (
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-green-600 mb-2">What’s included:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {trip.features.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Back and Book Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Link to="/trips" className="btn btn-outline btn-success w-full sm:w-auto">
              ← Back to All Trips
            </Link>
            <button className="btn btn-success w-full sm:w-auto">
              Book Now
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default TripsDetailsPage;
