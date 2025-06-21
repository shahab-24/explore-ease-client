

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import useAxiosPublic from "@/components/hooks/useAxiosPublic";

const AllTripsPage = () => {
  const [packages, setPackages] = useState([]);
  const axiosPublic = useAxiosPublic()

  useEffect(() => {
    axiosPublic.get("/trips").then((res) => {
      setPackages(res.data);
    });
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
        All Tour Packages
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {packages.map((pkg, index) => (
          <motion.div
            key={pkg._id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <img
              src={pkg.images?.[0]}
              alt={pkg.name}
              className="h-56 w-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold text-green-600">{pkg.name}</h3>
              <p className="text-gray-600">{pkg.description.slice(0, 80)}...</p>
              <p className="text-sm font-medium text-green-700">
                Price: ${pkg.price}
              </p>
              <Link to={`/trips/${pkg._id}`}>
                <button className="mt-2 btn btn-sm btn-success w-full">
                  View Details
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AllTripsPage;
