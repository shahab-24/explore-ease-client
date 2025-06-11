import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import UploadImage from "../../components/UploadImage"; 
import Lottie from "lottie-react";
import registerData from "../../assets/register.json";
import useAuth from "../../components/hooks/useAuth";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {  updateProfile } from "firebase/auth";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, setLoading } = useAuth();
  const navigate = useNavigate();
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  // ✅ Yup Schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  
  const onSubmit = async (data) => {
//     console.log("Form data submitted:", data);
//     console.log("Uploaded image URL:", uploadedImageUrl);

    if (!uploadedImageUrl) {
      return Swal.fire("Error", "Please upload a profile image", "error");
    }

    try {
      setLoading(true);

      
      const userCredential = await createUser(data?.email, data?.password);
      const user = userCredential?.user;

      await updateProfile(user, {
        displayName: data?.name,
        photoURL: uploadedImageUrl
        
      })

     
      await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
        name: data?.name,
        email: data?.email,
        image: uploadedImageUrl,
      });

      Swal.fire("Registration Successful!", "Welcome!", "success");
      reset();
      setUploadedImageUrl(null);
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire("Error", error?.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);}

    return (
      <div className="hero min-h-screen bg-base-200 mt-16">
        <div className="hero-content flex-col lg:flex-row-reverse">
          {/* Animation */}
          <div className="w-full md:w-1/2">
            <Lottie animationData={registerData} className="w-3/4 mx-auto" />
          </div>

          {/* Form */}
          <div className="card w-full max-w-sm shadow-2xl bg-base-100">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="card-body space-y-4"
            >
              <h2 className="text-2xl font-bold text-center">Create Account</h2>

              {/* Name */}
              <div className="form-control">
                <label className="label">Name</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="form-control relative">
                <label className="label">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="input input-bordered"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={handleShowPassword}
                  className="absolute inset-y-0 right-9 top-5 flex items-center text-green-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Upload Image Component */}
              <div className="form-control">
                <label className="label">Upload Profile Image</label>
                <UploadImage onImageUploaded={setUploadedImageUrl} />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-success w-full mt-4">
                Register
              </button>

              {/* Link to Login */}
              <p className="text-center text-sm mt-3">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary">
                  Login
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  };


export default Register;
