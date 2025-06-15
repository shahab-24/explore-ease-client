import { FacebookShareButton, FacebookIcon } from "react-share";
import { Link } from "react-router-dom";

type Props = {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  
  isManage?: boolean; 
  onDelete?: (id: string) => void;
};

const StoryCard = ({ _id, title, description, image, isManage, onDelete }: Props) => {
  const shareUrl = `${window.location.origin}/stories/${_id}`;

  return (
    <div className="card bg-base-100 dark:bg-base-200 shadow rounded overflow-hidden">
      <img src={image} alt={title} className="h-40 w-full object-cover" />
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {description?.slice(0, 100)}...
        </p>
        <div className="flex justify-between items-center mt-3">
          <FacebookShareButton url={shareUrl} >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          {isManage && (
            <div className="flex gap-2">
              <Link to={`/dashboard/edit-story/${_id}`} className="btn btn-xs btn-info">
                Edit
              </Link>
              <button onClick={() => onDelete?.(_id)} className="btn btn-xs btn-error">
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StoryCard;
