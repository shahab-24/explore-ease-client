import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const StoriesPage = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/all-stories").then((res) => setStories(res.data));
  }, []);

  return (
    <section className="min-h-screen py-20 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">All Travel Stories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md border hover:shadow-xl transition group overflow-hidden"
            >
              <img
                src={story.photo}
                alt={story.title}
                className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-xl font-bold text-green-700 group-hover:underline">{story.title}</h3>
                <p className="text-sm text-gray-500">By {story.author} • {new Date(story.date).toDateString()}</p>
                <p className="text-gray-600 text-sm">{story.story.slice(0, 120)}...</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StoriesPage;
