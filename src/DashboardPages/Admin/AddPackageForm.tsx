import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import UploadImage from "@/components/UploadImage";
import Swal from "sweetalert2";
import { useState } from "react";
import useAxiosSecure from "@/components/hooks/useAxiosSecure";
import { PackageFormData, packageSchema } from "@/Types/PackageSchema";
import { motion } from "framer-motion";

const AddPackageForm = () => {
  const axiosSecure = useAxiosSecure();
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PackageFormData>({
    resolver: yupResolver(packageSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      images: [],
      tourPlan: [{ day: 1, title: "", details: "" }],
    },
  });

  const handleImageUpload = (url: string) => {
    setUploadedImages((prev) => [...prev, url]);
    setValue("images", [...uploadedImages, url]);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tourPlan",
  });

  const onSubmit: SubmitHandler<PackageFormData> = async (data) => {
    try {
      await axiosSecure.post("/admin/packages", data);
      Swal.fire("Success", "Package added successfully", "success");
      reset();
      setUploadedImages([]);
    } catch (error) {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 p-6 md:p-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
        Add New Tour Package
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="label text-gray-700 dark:text-gray-200">Name</label>
          <input {...register("name")} className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-600" />
          {errors.name && <p className="text-red-500 mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="label text-gray-700 dark:text-gray-200">Price (USD)</label>
          <input type="number" {...register("price")} className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-600" />
          {errors.price && <p className="text-red-500 mt-1">{errors.price.message}</p>}
        </div>
      </div>

      <div>
        <label className="label text-gray-700 dark:text-gray-200">Description</label>
        <textarea {...register("description")} className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-600" rows={4} />
        {errors.description && <p className="text-red-500 mt-1">{errors.description.message}</p>}
      </div>

      <div>
        <label className="label text-gray-700 dark:text-gray-200">Upload Images</label>
        <UploadImage multiple={true} onUpload={handleImageUpload} />
        {errors.images && <p className="text-red-500 mt-1">{errors.images.message}</p>}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">Tour Plan</h3>
        {fields.map((field, index) => (
          <motion.div
            key={field.id}
            className="border rounded-lg p-4 space-y-3 bg-gray-50 dark:bg-gray-800 dark:border-gray-600 mt-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="label text-gray-700 dark:text-gray-200">Day</label>
                <input type="number" {...register(`tourPlan.${index}.day`)} className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-600" />
                {errors.tourPlan?.[index]?.day && <p className="text-red-500 text-sm">{errors.tourPlan[index].day?.message}</p>}
              </div>

              <div>
                <label className="label text-gray-700 dark:text-gray-200">Title</label>
                <input {...register(`tourPlan.${index}.title`)} className="input input-bordered w-full dark:bg-gray-800 dark:border-gray-600" />
                {errors.tourPlan?.[index]?.title && <p className="text-red-500 text-sm">{errors.tourPlan[index].title?.message}</p>}
              </div>

              <div>
                <label className="label text-gray-700 dark:text-gray-200">Details</label>
                <textarea {...register(`tourPlan.${index}.details`)} className="textarea textarea-bordered w-full dark:bg-gray-800 dark:border-gray-600" />
                {errors.tourPlan?.[index]?.details && <p className="text-red-500 text-sm">{errors.tourPlan[index].details?.message}</p>}
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => remove(index)}
                className="btn btn-error btn-sm mt-2"
              >
                Remove Day
              </button>
            </div>
          </motion.div>
        ))}

        <button
          type="button"
          onClick={() =>
            append({ day: fields.length + 1, title: "", details: "" })
          }
          className="btn btn-outline btn-sm mt-4 dark:border-gray-500"
        >
          + Add Another Day
        </button>
      </div>

      <motion.button
        type="submit"
        className="btn btn-primary w-full"
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
      >
        Submit Package
      </motion.button>
    </motion.form>
  );
};

export default AddPackageForm;
