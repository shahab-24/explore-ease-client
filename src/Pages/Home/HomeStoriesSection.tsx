// src/pages/Home/HomeStoriesSection.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoryCard from "@/components/StoryCard";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const HomeStoriesSection = () => {
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["home-stories"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/stories/random`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <section className="bg-base-100 dark:bg-base-200 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          Traveler's Top Stories 🌍
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories?.map((story: any) => (
            <StoryCard
              key={story._id}
              _id={story._id}
              title={story.title}
              description={story.story}
              image={story.images?.[0] || story.photo}
              author={story.author || "Anonymous"}
              date={story.date || new Date().toISOString()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeStoriesSection;
