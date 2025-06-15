import * as yup from "yup";

export const packageSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be positive"),
  images: yup
    .array()
    .of(yup.string().url("Invalid image URL"))
    .min(1, "At least one image is required")
    .required("Image is required"),
  tourPlan: yup
    .array()
    .of(
      yup.object({
        day: yup.number().required().min(1),
        title: yup.string().required("Title is required"),
        details: yup.string().required("Details are required")
        ,
      })
    )
    .min(1, "At least one day plan is required")
    .required("Tour plan is required"),
});

export type PackageFormData = yup.InferType<typeof packageSchema>;
