import { useForm } from "react-hook-form";
import { useState } from "react";

import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "@/components/hooks/useAuth";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import UploadImage from "@/components/UploadImage";

type FormValues = {
  title: string;
  description: string;
};

const AddStoryForm = () => {
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const [images, setImages] = useState<string[]>([]);
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleUpload = (url: string) => {
    setImages((prev) => [...prev, url]);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await axiosSecure.post("/stories-add", {
        ...data,
        images,
        author: {
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        },
      });

      Swal.fire("Success!", "Story added", "success");
      reset();
      navigate("/dashboard/manage-stories");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-base-100 dark:bg-base-200 p-6 rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Add a Story</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input {...register("title", { required: true })} className="input input-bordered w-full" placeholder="Title" />
        <textarea {...register("description", { required: true })} className="textarea textarea-bordered w-full" placeholder="Your story..." />
        <UploadImage multiple onUpload={handleUpload} />
        <button className="btn btn-success w-full">Submit Story</button>
      </form>
    </div>
  );
};

export default AddStoryForm;
