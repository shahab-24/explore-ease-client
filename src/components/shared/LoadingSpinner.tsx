import { ClipLoader } from "react-spinners";

const LoadingSpinner = ({ size = 40, color = "#3B82F6" }) => {
  return (
    <div className="flex items-center justify-center h-full py-10">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default LoadingSpinner;
