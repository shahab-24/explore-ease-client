import React from "react";
import Lottie from "lottie-react";
import loginData from "../../assets/login.json";

import useAuth from "../../components/hooks/useAuth";
import Swal from "sweetalert2";

const Login = () => {
        const {signInWithGoogle, setLoading} = useAuth()


        const handleGoogleLogin = async () => {
                try {
                        setLoading(true)
                        const user = await signInWithGoogle()
                        console.log(user, 'in google login in login page')

                        if(user){
                                Swal.fire({
                                        title: "Login successful!",
                                        icon: "success",
                                        draggable: true
                                      });
                        }
                        
                } catch (error) {
                        console.error('error in google login', error)
                        Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Something went wrong!",
                                footer: '<a href="#">Why do I have this issue?</a>'
                              });
                        
                }finally{
                        setLoading(false)

                }
                
        }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="w-full md:w-1/2 flex justify-center ">
          {/* <h1 className="text-5xl font-bold">Login now!</h1> */}
          <Lottie
            animationData={loginData}
            className="w-3/4 md:w-full"
          ></Lottie>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input type="email" className="input" placeholder="Email" />
              <label className="label">Password</label>
              <input type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
            </fieldset>
          </div>
        </div>
        <div>
                <button onClick={handleGoogleLogin} className="btn btn-primary">Google</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
