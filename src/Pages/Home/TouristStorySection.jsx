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
    axios.get("http://localhost:8000/stories")
      .then((res) => {
        // console.log(res.data);
        setStories(res.data);
      });
  }, []);

//   console.log(stories, 'touristStorySection')

  const handleShareClick = (storyUrl) => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto text-center">
        <Title title="Traveler Stories" subtitle="Real journeys, real voices from around the world." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
  {stories.slice(0, 5).map((story, idx) => (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      viewport={{ once: true }}
      className={`bg-white rounded-2xl shadow-lg hover:shadow-xl border border-green-200 overflow-hidden flex flex-col ${
        idx === 2 ? "md:row-span-2 md:col-span-1 h-full" : "h-full"
      }`}
    >
      <img
        src={story.photo}
        alt={story.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-green-700 mb-2">{story.title}</h3>
          <p className="text-sm text-gray-500 mb-1">
            By {story.author} • {new Date(story.date).toDateString()}
          </p>
          <p className="text-gray-700 text-sm mb-4">
            {story.story.slice(0, 120)}...
          </p>
        </div>
        <div className="flex justify-end">
          <FacebookShareButton
            url={`http://localhost:5173/stories/${idx}`}
            quote={story.title}
            onClick={() => handleShareClick(`http://localhost:5173/stories/${idx}`)}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>
      </div>
    </motion.div>
  ))}
</div>



        {/* One All Stories Button Below All Cards */}
        <div className="mt-12">
          <button
            onClick={() => navigate("/all-stories")}
            className="btn btn-lg btn-outline btn-success"
          >
            View All Stories
          </button>
        </div>
      </div>
    </section>
  );
};

export default TouristStorySection;
