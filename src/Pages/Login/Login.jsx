import React, { useState } from "react";
import Lottie from "lottie-react";
import loginData from "../../assets/login.json";

import useAuth from "../../components/hooks/useAuth";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const Login = () => {
  const { signInWithGoogle, setLoading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return Swal.fire("Error", "Please fill all fields!", "error");
    }

    try {
        setLoading(true)
        const user = await signIn(email, password)
        if(user){
            Swal.fire('login successful', '', 'success')
            navigate('/')
        }
        
    } catch (error) {
        console.log(error)
        Swal.fire(error.message)
        
    }finally{
        setLoading(false)
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      console.log(user, "in google login in login page");

      if (user) {
        Swal.fire({
          title: "Login successful!",
          icon: "success",
          draggable: true,
        });
      }
    } catch (error) {
      console.error("error in google login", error);
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

            <div className="form-control">
              <label className="label">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="input input-bordered"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="text-right mt-1">
                <Link to="/forgot-password" className="link link-hover text-sm text-blue-500">
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="form-control mt-6">
              <button type='button' className="btn btn-outline bg-transparent btn-block">Login</button>
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
