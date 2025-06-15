import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "@/components/hooks/useAuth";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Story } from "@/Types/TourGuide";
import useUserRole from "@/components/hooks/useUserRole";

const ManageStories = () => {
  const { user } = useAuth();
  const{role, isLoading} = useUserRole()
  const axiosSecure = useAxiosSecure();
//   console.log(user.email)
//   console.log(role)

  const { data: stories = [], refetch } = useQuery<Story[]>({
    queryKey: ["stories", user?.email],
    enabled: !!user.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories?email=${user?.email}`);
      return res.data;
    },
  });
//   console.log(stories)

  const deleteStory = useMutation({
    mutationFn: (id: string) => axiosSecure.delete(`/stories/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Story has been deleted", "success");
      refetch();
    },
  });

  return (
        <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Manage Your Travel Stories</h2>
      
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => (
  <div key={story._id} className="bg-base-100 dark:bg-base-200 shadow-md rounded-xl overflow-hidden">
    {/* Image Grid */}
    <div className="grid grid-cols-2 gap-2 p-2">
      {(story.images && story.images.length > 0 ? story.images : [story.photo || "placeholder.jpg"]).map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Story Image ${index + 1}`}
          className="h-24 w-full object-cover rounded"
        />
      ))}
    </div>

    {/* Story Info */}
    <div className="p-4 space-y-2">
      <h3 className="text-xl font-semibold">{story.title}</h3>
      <p className="text-gray-500 text-sm">{story.description?.slice(0, 100)}...</p>

      <div className="flex justify-between pt-3">
        <Link to={`/dashboard/edit-story/${story._id}`} className="btn btn-sm btn-info">Edit</Link>
        <button onClick={() => deleteStory.mutate(story._id)} className="btn btn-sm btn-error">Delete</button>
      </div>
    </div>
  </div>
))}

        </div>
      </div>
      
  );
};

export default ManageStories;
