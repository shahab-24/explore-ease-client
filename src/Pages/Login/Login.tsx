import { useState, FormEvent } from "react";
import Lottie from "lottie-react";
import loginData from "../../assets/login.json";

import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UserCredential } from "firebase/auth";
import useAuth from "@/components/hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const { signInWithGoogle, setLoading, signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false) 
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return Swal.fire("Error", "Please fill all fields!", "error");
    }

    try {
      setLoading(true);
      const result: UserCredential = await signIn(email, password);
      if (result?.user) {
        Swal.fire("Login successful", "", "success");
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
      Swal.fire("Error", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      console.log(user, "in google login");

      if (user) {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
        });
        navigate("/");
      }
    } catch (error: any) {
      console.error("Google login error", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="#">Why do I have this issue?</a>',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
        setShowPassword((prev) => !prev);
      };
    

  return (
    <div className="hero min-h-screen bg-base-200 mt-16">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Animation */}
        <div className="w-full md:w-1/2">
          <Lottie animationData={loginData} className="w-3/4 mx-auto" />
        </div>

        {/* Login Form */}
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleLogin} className="card-body">
            <h1 className="text-2xl font-bold text-center">Login</h1>

            <div className="form-control">
              <label className="label">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="input input-bordered"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-control relative">
              <label className="label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered"
                required
                
              />
              <button
                type="button"
                onClick={handleShowPassword}
                className="absolute inset-y-0 right-9 top-5 flex items-center text-green-600"
                tabIndex={-1}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
              
            </div>

            <div className="form-control mt-6">
              <button type="submit" className="btn btn-outline bg-transparent btn-block">
                Login
              </button>
            </div>

            <div className="divider">OR</div>

            <button type="button" onClick={handleGoogleLogin} className="btn btn-primary btn-outline">
              Continue with Google
            </button>

            <p className="mt-4 text-center text-sm">
              New here?{" "}
              <Link to="/register" className="link link-primary">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
