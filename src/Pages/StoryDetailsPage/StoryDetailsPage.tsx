import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FacebookShareButton, FacebookIcon } from "react-share";

import { FaHeart } from "react-icons/fa";
import useAuth from "../../components/hooks/useAuth";
import Swal from "sweetalert2";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const StoryDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [story, setStory] = useState(null);
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const axiosSecure = useAxiosSecure()

  
  useEffect(() => {
    axiosSecure.get(`/stories/${id}`)
      .then((res) => {
        setStory(res.data);
        setLikes(res.data?.likes || 0);
        setIsLiked(res.data?.likedBy?.includes(user?.email) || false);
      });
  }, [id, user]);

  // Handle like
  const handleLike = () => {
    if (!user) return Swal.fire("Please login to like a story.");

    axiosSecure.patch(`/stories/${id}/like`, {
      userEmail: user?.email,
    }).then(res => {
      setLikes(res.data?.likes);
      setIsLiked(true);
    });
  };

  if (!story) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <img src={story.photo} alt={story.title} className="w-full rounded-xl mb-6" />
      <h2 className="text-3xl font-bold text-green-700 mb-2">{story.title}</h2>
      <p className="text-sm text-gray-500 mb-4">
        By {story.author} • {new Date(story.date).toDateString()}
      </p>
      <p className="text-gray-800 text-base mb-6">{story.story}</p>

      <div className="flex items-center justify-between mt-6">
        <button
          onClick={handleLike}
          disabled={isLiked}
          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${
            isLiked ? "bg-pink-300 text-white" : "bg-white"
          }`}
        >
          <FaHeart className="text-pink-500" />
          <p className="text-black"> {likes} {likes === 1 ? "Like" : "Likes"}</p>
        </button>
        

        <FacebookShareButton
          url={`http://localhost:5173/stories/${story._id}`}
          quote={story.title}
        >
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>
    </div>
  );
};

export default StoryDetailsPage;
