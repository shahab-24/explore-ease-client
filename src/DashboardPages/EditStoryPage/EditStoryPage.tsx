import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

const EditStoryPage = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [story, setStory] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  useEffect(() => {
    axiosSecure.get(`/stories/${id}`).then((res) => {
      setStory(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description);
    });
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axiosSecure.put(`/stories/edit/${id}`, { title, description });
    Swal.fire("Success", "Story updated", "success");
    navigate("/dashboard/manage-stories");
  };

  const removeImage = async (url: string) => {
    await axiosSecure.patch(`/stories/${id}/remove-image`, { url });
    setStory((prev: any) => ({
      ...prev,
      images: prev.images.filter((img: string) => img !== url),
    }));
  };

  const uploadImage = async () => {
    if (!newImage) return;
    const formData = new FormData();
    formData.append("file", newImage);
    formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

    try {
      setUploading(true);
      const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      await axiosSecure.patch(`/stories/${id}/add-image`, { url: data.secure_url });
      setStory((prev: any) => ({ ...prev, images: [...prev.images, data.secure_url] }));
      setNewImage(null);
    } finally {
      setUploading(false);
    }
  };

  if (!story) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 dark:bg-base-200 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Edit Story</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full" />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="textarea textarea-bordered w-full"></textarea>

        {/* Old Images */}
        <div>
          <label className="block font-semibold mb-1">Existing Images</label>
          <div className="grid grid-cols-3 gap-4">
            {story.images.map((img: string) => (
              <div key={img} className="relative group">
                <img src={img} className="h-24 w-full object-cover rounded" />
                <button type="button" onClick={() => removeImage(img)} className="absolute top-1 right-1 text-white bg-red-600 px-1 rounded">
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add New */}
        <div>
          <input type="file" onChange={(e) => setNewImage(e.target.files?.[0] || null)} className="file-input w-full" />
          <button type="button" onClick={uploadImage} className="btn btn-info mt-2" disabled={uploading}>
            {uploading ? "Uploading..." : "Add Image"}
          </button>
        </div>

        <button type="submit" className="btn btn-success w-full">Save Changes</button>
      </form>
    </div>
  );
};

export default EditStoryPage;
