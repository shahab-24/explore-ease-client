import React from "react";
import ReactPlayer from "react-player";

const OverviewSection = () => {
  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-10">
        
        
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-green-700 leading-snug">
            Discover Bangladesh <br /> with ExploreEase
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            ExploreEase is your personal gateway to the hidden beauty of Bangladesh. Whether you’re a solo traveler, group explorer, or a family on vacation, we help you:
          </p>
          <ul className="list-disc list-inside text-gray-700 pl-2 space-y-1 text-sm md:text-base">
            <li>Find verified tour guides and local experiences</li>
            <li>Discover cultural hotspots and off-the-beaten-path gems</li>
            <li>Book, plan, and enjoy your trip with confidence</li>
            <li>Join a growing travel community</li>
          </ul>
          <p className="text-gray-500 italic text-sm md:text-base">
            Let ExploreEase turn your next trip into a lifelong memory 
          </p>
        </div>

        
        <div className="w-full h-[300px] md:h-[400px] aspect-w-16 aspect-h-9">
          <ReactPlayer
            url="https://youtu.be/Z44fFqBQQtg?si=QWB5DkZGNMgcJNGQ" 
            width="100%"
            height="100%"
            controls={true}
            className="rounded-lg overflow-hidden object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
