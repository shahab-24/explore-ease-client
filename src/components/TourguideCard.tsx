import { Link } from "react-router-dom";

interface Story {
  title: string;
  image: string;
  snippet: string;
}

interface TourGuide {
  _id: string;
  name: string;
  email: string;
  phone: string;
  photo: string;
  bio: string;
  specialty: string;
  experience: string;
  stories: Story[];
}

interface TourGuideCardProps {
  guide: TourGuide;
}

const TourGuideCard: React.FC<TourGuideCardProps> = ({ guide }) => {
  return (
    <div className="relative bg-base-100 shadow-xl rounded-lg p-4 group hover:shadow-2xl transition">
      {/* Badge */}
      <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
        🔥 Trending
      </span>

      <div className="flex justify-center">
        {/* Diamond shaped image */}
        <div className="w-40 h-40 overflow-hidden">
          <img
            src={guide.photo}
            alt={guide.name}
            className="w-full h-full object-cover rotate-45 border-4 border-green-500"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <h3 className="text-xl font-bold">{guide.name}</h3>
        <p className="text-gray-500 text-sm">{guide.specialty}</p>
        <Link
          to={`/tourGuidesProfile/${guide._id}`}
          className="btn btn-outline btn-success btn-sm mt-3"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TourGuideCard;
