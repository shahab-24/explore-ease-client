// import { ClipLoader } from "react-spinners";

// const LoadingSpinner = ({ size = 40, color = "#3B82F6" }) => {
//   return (
//     <div className="flex items-center justify-center h-full py-10">
//       <ClipLoader size={size} color={color} />
//     </div>
//   );
// };

// export default LoadingSpinner;

const LoadingSpinner = () => {
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-80">
            <div className="w-full max-w-md px-6">
              {/* Loader label */}
              <div className="text-center mb-4">
                <h2 className="text-lg md:text-xl font-semibold text-white animate-pulse tracking-wide">
                  Loading...
                </h2>
              </div>
      
              {/* Horizontal loader bar */}
              <div className="w-full h-2 bg-gray-700 rounded overflow-hidden shadow-md">
                <div className="h-full bg-gradient-to-r from-green-500 via-indigo-500 to-violet-500 animate-loader-progress"></div>
              </div>
            </div>
          </div>
        );
      };
      
      export default LoadingSpinner;
      
