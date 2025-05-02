import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";

const TourGuideProfilePage = () => {
  const [guideProfile, setGuideProfile] = useState();
  const { id } = useParams();
//   console.log(id);

  useEffect(() => {
    axios.get(`http://localhost:8000/tourGuidesProfile/${id}`).then((res) => {
      console.log(res.data);
      setGuideProfile(res.data);
    });
  }, [id]);

//   console.log(guideProfile);
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-sky-100 dark:from-gray-800 dark:to-gray-900 p-6 mt-16">
      <motion.div
        className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6">
          <motion.img
            src={guideProfile?.photo}
            alt={guideProfile?.name}
            className="w-40 h-40 rounded-full object-cover shadow-md border-4 border-white dark:border-gray-700"
            whileHover={{ scale: 1.05 }}
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
              {guideProfile?.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2 italic">
              {guideProfile?.specialty}
            </p>
            <p className="text-gray-700 dark:text-gray-200">
              <strong>Email:</strong> {guideProfile?.email}
              <br />
              <strong>Phone:</strong> {guideProfile?.phone}
              <br />
              <strong>Experience:</strong> {guideProfile?.experience}
            </p>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {guideProfile?.bio}
            </p>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />

        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          Tour Stories
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {guideProfile?.stories.map((story) => (
            <motion.div
              key={story.id}
              className="bg-sky-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={story?.image}
                alt={story?.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-1">
                  {story?.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {story?.snippet}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default TourGuideProfilePage;
