// src/pages/StoriesPage.tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import StoryCard from "@/components/StoryCard";

const StoriesPage = () => {
  const { data: stories = [], isLoading } = useQuery({
    queryKey: ["stories"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/all-stories`);
      return res.data;
    },
  });

  if (isLoading) return <p className="text-center py-10">Loading stories...</p>;

  return (
    <section className="min-h-screen py-16 px-4 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          All Travel Stories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story: any) => (
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

export default StoriesPage;
