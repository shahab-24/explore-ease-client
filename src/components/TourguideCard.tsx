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

      {/* Guide Photo */}
      <div className="flex justify-center">
        <div className="w-32 h-32 md:w-40 md:h-40 overflow-hidden">
          <img
            src={guide.photo || "/default-avatar.png"}
            alt={guide.name}
            className="w-full h-full object-cover border-4 border-green-500"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            }}
          />
        </div>
      </div>

      <div className="text-center mt-4">
        <h3 className="text-xl font-bold">{guide.name}</h3>
        <p className="text-gray-500 text-sm">{guide.specialty}</p>
        {/* Optional: Short bio */}
        {/* <p className="text-sm text-gray-600 mt-2">
          {guide.bio.slice(0, 100)}...
        </p> */}
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
