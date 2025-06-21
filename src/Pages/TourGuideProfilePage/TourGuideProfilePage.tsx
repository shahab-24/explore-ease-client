import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { TourGuide } from "@/Types/TourGuide";
import LoadingSpinner from "@/components/shared/LoadingSpinner";



const fetchTourGuide = async (id: string): Promise<TourGuide> => {
        const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/tourGuidesProfile/${id}`
              );
              return res.data;
}


const TourGuideProfilePage = () => {
        const {id} = useParams<{id: string}>()
        const [selectedImage,setSelectedImage] = useState<string | null>(null)

        const {data: guideProfile, isLoading, isError} = useQuery<TourGuide>({
                queryKey: ["tourGuide", id as string],
                queryFn: () => fetchTourGuide(id as string),
                enabled: !!id,

        })

        if (isLoading) return <LoadingSpinner></LoadingSpinner>;
  if (isError) return <div className="text-center mt-20 text-red-500">Something went wrong!</div>;


  return (
        <div className="min-h-screen bg-gradient-to-br from-white to-sky-100 dark:from-gray-800 dark:to-gray-900 p-6 mt-16">
          <motion.div
            className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Guide Info */}
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
                <p className="mt-4 text-gray-600 dark:text-gray-300">{guideProfile?.bio}</p>
              </div>
            </div>
    
            <hr className="my-6 border-t border-gray-300 dark:border-gray-700" />
    
            {/* Tour Stories */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Tour Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {guideProfile?.stories?.map((story, idx) => (
                <motion.div
                  key={idx}
                  className="bg-sky-50 dark:bg-gray-700 rounded-xl overflow-hidden shadow-md cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setSelectedImage(story.image)}
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
    
            {/* Image Modal */}
            <Dialog open={!!selectedImage} onClose={() => setSelectedImage(null)} className="relative z-50">
              <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
              <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="max-w-3xl w-full">
                  <img src={selectedImage || ""} alt="Story Large View" className="rounded-xl shadow-lg w-full h-auto object-contain" />
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="absolute top-4 right-4 text-white text-2xl"
                  >
                    ✖
                  </button>
                </Dialog.Panel>
              </div>
            </Dialog>
          </motion.div>
        </div>
      );
};

export default TourGuideProfilePage;