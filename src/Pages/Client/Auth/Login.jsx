import React, { useState } from "react";
import google from "../../../assets/google.png";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../../../firebase.init";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  const googleSignIn = async () => {
    try {
      await signInWithGoogle();
      if (gUser) {
        await axios.post(
          "https://moom24-backend-production.up.railway.app/api/user",
          {
            name: gUser.user.displayName,
            email: gUser.user.email,
          },
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-green-500 to-emerald-700 px-4 py-12 relative overflow-hidden">
      
      {/* Animated Background - SAME AS SIGNUP */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 via-green-400/20 to-emerald-500/30 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-green-400/20 via-transparent to-emerald-400/20 animate-gradient-y"></div>
        
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-2 h-2 bg-emerald-300/50 rounded-full animate-float animate-pulse" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-green-300/60 rounded-full animate-float animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-emerald-400/70 rounded-full animate-float animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-green-400/50 rounded-full animate-float animate-pulse" style={{animationDelay: '3s'}}></div>
          <div className="absolute top-1/2 left-5 w-1 h-1 bg-emerald-300/60 rounded-full animate-float animate-pulse" style={{animationDelay: '4s'}}></div>
        </div>

        <div className="absolute inset-0 bg-grid-slate-700/10 animate-grid-move"></div>
      </div>

      <Helmet>
        <title>Moom24-Login</title>
      </Helmet>

      <div className="w-full max-w-sm mx-auto relative z-10 animate-fade-in">
        <div className="bg-white/15 backdrop-blur-xl border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-emerald-500/40 transition-all duration-700 hover:-translate-y-2 group/card">
          
          {/* Header - SAME DESIGN */}
          <div className="text-center mb-10 animate-slide-down">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-2xl mb-4 group-hover/card:scale-110 transition-transform duration-500">
              Moom24
            </h1>
            <div className="w-24 h-1 mx-auto bg-gradient-to-r from-emerald-400 to-green-400 rounded-full shadow-lg transform scale-x-0 group-hover/card:scale-x-100 transition-all duration-800 origin-center"></div>
            <p className="text-emerald-100/90 mt-4 text-lg font-semibold animate-pulse">
              Welcome Back ✨
            </p>
          </div>

          {/* Form - SAME DESIGN */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-7">
            
            {/* Email Field */}
            <div className="group/input relative animate-slide-up" style={{animationDelay: '0.1s'}}>
              <label className="block text-emerald-100/95 font-bold mb-3 text-sm tracking-wide uppercase">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-2xl text-lg font-semibold text-emerald-50 placeholder-emerald-200/80 
                  focus:outline-none focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/30 focus:ring-offset-0
                  transition-all duration-500 shadow-inner hover:shadow-emerald-500/25 peer
                  valid:text-emerald-50"
                  placeholder="your@email.com"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                    pattern: {
                      value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                      message: "Please provide a valid email address",
                    },
                  })}
                />
                <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 origin-left transform scale-x-0 group-hover/input:scale-x-100 peer-focus:scale-x-100 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 -inset-1 rounded-2xl blur opacity-0 group-hover/input:opacity-100 peer-focus:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
              {errors.email && (
                <span className="text-red-300/90 text-sm mt-2 block font-medium animate-pulse">
                  ⚠️ {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field WITH SHOW/HIDE */}
            <div className="group/input relative animate-slide-up" style={{animationDelay: '0.2s'}}>
              <label className="block text-emerald-100/95 font-bold mb-3 text-sm tracking-wide uppercase">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-5 py-4 bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-2xl text-lg font-semibold text-emerald-50 placeholder-emerald-200/80 pr-14
                  focus:outline-none focus:border-emerald-400/70 focus:ring-4 focus:ring-emerald-400/30 focus:ring-offset-0
                  transition-all duration-500 shadow-inner hover:shadow-emerald-500/25 peer
                  valid:text-emerald-50"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: {
                      value: true,
                      message: "Password is required",
                    },
                  })}
                />
                {/* Show/Hide Button */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-1/2 -translate-y-1/2 group-hover/input:bg-white/20 hover:bg-white/30 bg-white/10 border border-white/30 rounded-xl p-2 transition-all duration-300 hover:scale-110 active:scale-95 shadow-md hover:shadow-emerald-400/30"
                  title={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  )}
                </button>
                <div className="absolute -bottom-3 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 origin-left transform scale-x-0 group-hover/input:scale-x-100 peer-focus:scale-x-100 transition-transform duration-700"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 -inset-1 rounded-2xl blur opacity-0 group-hover/input:opacity-100 peer-focus:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              </div>
              {(errors.password || error) && (
                <span className="text-red-300/90 text-sm mt-2 block font-medium animate-pulse">
                  ⚠️ {errors.password?.message || error?.message}
                </span>
              )}
            </div>

            {/* Bottom Links & Button */}
            <div className="pt-4 space-y-5 animate-slide-up" style={{animationDelay: '0.3s'}}>
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-emerald-100/85 text-sm font-medium">
                    Don't have an account?{" "}
                    <Link 
                      to="/signup" 
                      className="text-emerald-200/95 font-bold hover:text-emerald-100 transition-all duration-300 hover:underline underline-offset-2 decoration-emerald-400 decoration-2 group/link inline-flex items-center gap-1"
                    >
                      Sign Up 
                      <span className="group-hover/link:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </p>
                </div>
                <Link 
                  to="/resetpass" 
                  className="block text-center text-emerald-200/90 font-semibold hover:text-emerald-100 transition-all duration-300 hover:underline underline-offset-2 decoration-emerald-400/70 decoration-1"
                >
                  Forgot Password?
                </Link>
              </div>

              <button 
                type="submit"
                disabled={loading}
                className="group/btn w-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-600 hover:via-green-600 hover:to-emerald-700 text-white font-bold py-5 px-8 rounded-2xl shadow-2xl hover:shadow-emerald-500/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-emerald-400/50 text-xl relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {loading ? (
                    <>
                      <span className="loading loading-bars loading-sm w-6 h-6"></span>
                      Signing In...
                    </>
                  ) : (
                    <>
                      🔑 Login
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-white/10 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700 -skew-x-12 absolute top-0 -left-full group-hover/btn:left-full group-hover/btn:delay-700"></div>
              </button>
            </div>
          </form>

          {/* Google Button - Enhanced */}
          <div className="animate-slide-up mt-5" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={googleSignIn}
              disabled={gLoading}
              className="group/btn-google w-full bg-white/10 hover:bg-white/20 border-2 border-white/30 hover:border-emerald-400/70 backdrop-blur-sm text-emerald-900/95 hover:text-emerald-800 font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-emerald-400/30 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.01] focus:outline-none focus:ring-4 focus:ring-emerald-400/40 flex items-center justify-center gap-3 text-lg relative overflow-hidden"
            >
              <img src={google} className="h-7 w-7 group-hover/btn-google:scale-110 transition-transform duration-300" alt="Google" />
              <span className="relative z-10">
                {gLoading ? (
                  <>
                    <span className="loading loading-bars loading-sm w-6 h-6 inline-block"></span>
                    Google Sign In...
                  </>
                ) : (
                  "Continue with Google"
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 opacity-0 group-hover/btn-google:opacity-100 transition-opacity duration-500 blur"></div>
            </button>
          </div>
        </div>

        {/* Floating Decorations - SAME */}
        <div className="absolute -top-6 -right-6 w-12 h-12 border-2 border-emerald-400/50 rounded-full animate-spin-slow opacity-40"></div>
        <div className="absolute -bottom-8 left-4 w-8 h-8 border-2 border-green-400/50 rounded-full animate-ping opacity-30" style={{animationDelay: '1s'}}></div>
      </div>

      <ToastContainer 
        theme="colored"
        position="top-right"
        className="!bg-gradient-to-r !from-emerald-600 !to-green-600 !text-white !border !border-emerald-400/50"
      />

      {/* SAME CSS ANIMATIONS */}
      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }
        @keyframes gradient-y {
          0%, 100% { transform: translateY(-100%); }
          50% { transform: translateY(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        @keyframes grid-move {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-5%) translateY(0); }
          50% { transform: translateX(-5%) translateY(-5%); }
          75% { transform: translateX(0) translateY(-5%); }
          100% { transform: translateX(0) translateY(0); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-gradient-x { animation: gradient-x 15s ease infinite; }
        .animate-gradient-y { animation: gradient-y 20s ease infinite; }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-slide-down { animation: slide-down 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out forwards; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default Login;