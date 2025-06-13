import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "@/components/hooks/useAuth";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageStories = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: stories = [], refetch } = useQuery({
    queryKey: ["stories", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/stories?email=${user?.email}`);
      return res.data;
    },
  });

  const deleteStory = useMutation({
    mutationFn: (id: string) => axiosSecure.delete(`/stories/${id}`),
    onSuccess: () => {
      Swal.fire("Deleted!", "Story has been deleted", "success");
      refetch();
    },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Manage Your Stories</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div key={story._id} className="card bg-base-100 dark:bg-base-200 shadow">
            <figure>
              <img src={story.images?.[0]} alt={story.title} className="h-48 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title">{story.title}</h3>
              <p className="text-sm text-gray-500">{story.description?.slice(0, 100)}...</p>
              <div className="card-actions justify-end mt-2">
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
