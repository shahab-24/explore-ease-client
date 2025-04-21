import React from "react";
import registerData from "../../assets/register.json";
import Lottie from "lottie-react";

const Register = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="w-full md:w-1/2 flex justify-center ">
          {/* <h1 className="text-5xl font-bold">Login now!</h1> */}
          <Lottie
            animationData={registerData}
            className="w-3/4 md:w-full"
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input type="text" className="input" placeholder="Name" />
              <label className="label">Upload Image</label>
              <input
                type="file"
                className="input"
                accept="image/*"
                placeholder="Photo URL"
              />
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              {/* <div>
                          <a className="link link-hover">Forgot password?</a>
                        </div> */}
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
