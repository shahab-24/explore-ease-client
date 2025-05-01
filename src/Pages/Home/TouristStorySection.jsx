import { useEffect, useState } from "react";
import axios from "axios";
import { FacebookShareButton, FacebookIcon } from "react-share";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import useAuth from "../../components/hooks/useAuth";
import Title from "../../components/shared/Title";


const TouristStorySection = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    axios.get("/stories").then((res) => setStories(res.data));
  }, []);

  const handleShareClick = (storyUrl) => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-10"></h2>
        <Title title={'Traveler Stories'} subtitle={""}></Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {Array.isArray(stories) && stories.map((story, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-lg p-4 border border-green-100 hover:shadow-xl transition"
            >
              <img src={story.photo} alt={story.title} className="rounded-md w-full h-48 object-cover mb-3" />
              <h3 className="text-xl font-bold text-green-700">{story.title}</h3>
              <p className="text-sm text-gray-500 mb-1">By {story.author} • {new Date(story.date).toDateString()}</p>
              <p className="text-gray-700 text-sm mb-3">{story.story.slice(0, 120)}...</p>

              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleShareClick(`https://your-site.com/stories/${idx}`)}
                  className="btn btn-sm btn-outline btn-primary"
                >
                  <FacebookShareButton url={`https://your-site.com/stories/${idx}`} quote={story.title}>
                    <FacebookIcon size={28} round />
                  </FacebookShareButton>
                </button>

                <button onClick={() => navigate("/stories")} className="btn btn-sm btn-success">
                  All Stories
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TouristStorySection;
